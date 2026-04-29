package com.duyanan.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public ReservationController(ReservationRepository reservationRepository,
                                  UserRepository userRepository,
                                  JwtUtil jwtUtil) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // ── Create a new reservation ─────────────────────────────
    @PostMapping
    public ResponseEntity<?> createReservation(@RequestHeader("Authorization") String authHeader,
                                                @RequestBody Map<String, String> body) {
        try {
            String token = authHeader.replace("Bearer ", "");
            var claims = jwtUtil.validateToken(token);
            String email = claims.getSubject();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Reservation reservation = new Reservation();
            reservation.setUser(user);
            reservation.setGuestName(body.get("guestName"));
            reservation.setContactNumber(body.get("contactNumber"));
            reservation.setReservationDate(LocalDate.parse(body.get("reservationDate")));
            reservation.setReservationTime(LocalTime.parse(body.get("reservationTime")));
            reservation.setNumberOfGuests(Integer.valueOf(body.get("numberOfGuests")));
            reservation.setSpecialRequests(body.get("specialRequests"));
            reservation.setStatus("PENDING");
            reservation.setCreatedAt(LocalDateTime.now());

            Reservation saved = reservationRepository.save(reservation);

            return ResponseEntity.ok(Map.of(
                    "message", "Reservation created successfully!",
                    "reservationId", saved.getId(),
                    "status", saved.getStatus()
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ── Get current user's reservations ──────────────────────
    @GetMapping("/my-reservations")
    public ResponseEntity<?> getMyReservations(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            var claims = jwtUtil.validateToken(token);
            String email = claims.getSubject();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<Reservation> reservations = reservationRepository.findByUserIdOrderByReservationDateDesc(user.getId());
            return ResponseEntity.ok(reservations);

        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid token"));
        }
    }

    // ── Get reservation by ID ────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<?> getReservationById(@PathVariable Long id) {
        return reservationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
