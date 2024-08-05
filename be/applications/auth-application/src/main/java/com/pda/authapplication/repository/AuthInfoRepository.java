package com.pda.authapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthInfoRepository extends JpaRepository<AuthInfoEntity, Long> {
    Optional<AuthInfoEntity> findByUserId(String userId);
}
