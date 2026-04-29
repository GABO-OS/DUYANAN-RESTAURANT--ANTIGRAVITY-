package com.duyanan.backend;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserIdOrderByReservationDateDesc(Long userId);
    List<Reservation> findAllByOrderByReservationDateDesc();
    List<Reservation> findByStatus(String status);
    List<Reservation> findByReservationDate(LocalDate date);
}
