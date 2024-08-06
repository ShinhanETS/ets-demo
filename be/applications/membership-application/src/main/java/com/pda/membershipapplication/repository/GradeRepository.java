package com.pda.membershipapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
    @Query("select g from Grade g where g.minPoint <= :point and g.maxPoint >= :point")
    Grade findByPoint(@Param("point") Long point);
}
