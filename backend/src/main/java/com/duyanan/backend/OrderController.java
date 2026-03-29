package com.duyanan.backend;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @PostMapping
    public Map<String, String> createOrder(@RequestBody Map<String, Object> orderData) {
        // Mock order processing
        System.out.println("Order received: " + orderData);
        return Map.of("status", "success", "message", "Order placed successfully");
    }
}
