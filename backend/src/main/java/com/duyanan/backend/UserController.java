package com.duyanan.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private static final int MAX_ATTEMPTS = 3;
    private static final long LOCKOUT_DURATION = 15 * 60; // 15 minutes in seconds

    // email -> number of failed attempts
    private final ConcurrentHashMap<String, Integer> failedAttempts = new ConcurrentHashMap<>();
    // email -> time when the lockout expires (epoch second)
    private final ConcurrentHashMap<String, Long> lockoutExpiry = new ConcurrentHashMap<>();

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ── Register ──────────────────────────────────────────
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String firstName = body.get("firstName");
        String lastName = body.get("lastName");

        // Validate names: letters, spaces, hyphens and apostrophes only
        String namePattern = "^[a-zA-ZÀ-ÖØ-öø-ÿ\\s'\\-]{2,}$";
        if (firstName == null || !firstName.trim().matches(namePattern)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "First name must contain only letters (no numbers or special characters)."));
        }
        if (lastName == null || !lastName.trim().matches(namePattern)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Last name must contain only letters (no numbers or special characters)."));
        }

        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already in use."));
        }

        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(body.get("password")); // plain-text for now

        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Registration successful!"));
    }

    // ── Login ─────────────────────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        // 1. Check if currently locked out
        Long expiry = lockoutExpiry.get(email);
        long now = Instant.now().getEpochSecond();
        if (expiry != null && now < expiry) {
            long secondsLeft = expiry - now;
            long minutes = secondsLeft / 60;
            long seconds = secondsLeft % 60;
            String timeMsg = minutes > 0
                    ? minutes + " minute" + (minutes > 1 ? "s" : "") + " and " + seconds + " second"
                            + (seconds != 1 ? "s" : "")
                    : seconds + " second" + (seconds != 1 ? "s" : "");
            return ResponseEntity.status(429).body(Map.of(
                    "error", "Account temporarily blocked. Please try again in " + timeMsg + ".",
                    "lockedOut", true,
                    "secondsLeft", secondsLeft));
        }

        // 2. Attempt authentication
        java.util.Optional<User> userOpt = userRepository.findByEmail(email);
        boolean success = userOpt.map(u -> u.getPassword().equals(password)).orElse(false);

        if (success) {
            // Clear any previous failure state
            failedAttempts.remove(email);
            lockoutExpiry.remove(email);

            User u = userOpt.get();
            return ResponseEntity.ok(Map.of(
                    "message", "Login successful!",
                    "firstName", u.getFirstName(),
                    "lastName", u.getLastName(),
                    "email", u.getEmail()));
        }

        // 3. Record failure
        int attempts = failedAttempts.merge(email, 1, (a, b) -> a + b);

        if (attempts >= MAX_ATTEMPTS) {
            lockoutExpiry.put(email, now + LOCKOUT_DURATION);
            failedAttempts.remove(email); // reset so counter starts fresh after lockout
            return ResponseEntity.status(429).body(Map.of(
                    "error", "Too many failed attempts. Account blocked for 15 minutes.",
                    "lockedOut", true,
                    "secondsLeft", LOCKOUT_DURATION));
        }

        int remaining = MAX_ATTEMPTS - attempts; // only computed when needed
        return ResponseEntity.status(401).body(Map.of(
                "error",
                "Invalid email or password. " + remaining + " attempt" + (remaining == 1 ? "" : "s") + " remaining.",
                "attemptsLeft", remaining));
    }
}
