package com.pda.accountapplication.repository;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Table(name = "accounts")
public class Account {

    @Id
    @Column(name = "acct_no", nullable = false, length = 64)
    private String acctNo; // 계좌번호

    @Column(name = "id", nullable = false, unique = true)
    private Long id; // id

    @Column(name = "user_id", nullable = false, length = 64)
    private String userId; // 유저Id

    @Column(nullable = false, length = 64)
    private String password; // 계좌비밀번호

    @Column(nullable = false, length = 20)
    private String name; // 계좌명

    private Double won; // 원

    private Double euro; // 유로

    private Double yuan; // 위안

    private Double dollar; // 달러
}
