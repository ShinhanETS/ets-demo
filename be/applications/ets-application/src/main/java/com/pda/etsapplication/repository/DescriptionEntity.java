package com.pda.etsapplication.repository;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Description")
public class DescriptionEntity {
    @Id
    @Column(name = "stock_code", nullable = false, unique = true)
    private String stockCode;

    @Column(name = "content")
    private String content;

    @Column(name = "image")
    private String image;
}
