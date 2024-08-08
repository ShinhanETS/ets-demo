package com.pda.etsapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OfferRepository extends JpaRepository<Offer, String> {

    Optional<Offer> findByOfferNo(String offerNum);
}
