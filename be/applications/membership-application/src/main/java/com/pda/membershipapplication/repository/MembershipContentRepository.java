package com.pda.membershipapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MembershipContentRepository extends JpaRepository<MembershipContent, Long> {
    List<MembershipContent> findByGrade(Grade grade);
}
