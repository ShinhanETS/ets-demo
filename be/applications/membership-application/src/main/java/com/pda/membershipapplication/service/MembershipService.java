package com.pda.membershipapplication.service;

import com.pda.membershipapplication.repository.Grade;
import com.pda.membershipapplication.repository.GradeRepository;
import com.pda.membershipapplication.repository.Member;
import com.pda.membershipapplication.repository.MemberRepository;
import com.pda.membershipapplication.repository.MembershipContentRepository;
import com.pda.membershipapplication.service.dto.res.MyMembershipServiceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MembershipService {
    private final MemberRepository memberRepository;
    private final MembershipContentRepository membershipContentRepository;
    private final GradeRepository gradeRepository;

    public MyMembershipServiceResponse getMembershipByMemberId(final Long memberId) {
        System.out.println(toSettlementYm(LocalDate.now()));

        Member member = memberRepository
            .findByMemberIdAndSettlementYm(memberId, toSettlementYm(LocalDate.now()))
            .orElse(null);

        if (member == null) {
            // TODO: 멤버가 해당 월의 포인트가 없을 때,
            return null;
        }

        Grade grade = gradeRepository.findByPoint(member.getPoint());
        return MyMembershipServiceResponse.builder()
            .point(member.getPoint())
            .grade(grade.getName())
            .gradeImage(grade.getImage())
            .maxPoint(grade.getMaxPoint())
            .minPoint(grade.getMinPoint())
            .benefits(membershipContentRepository.findByGrade(grade)
                .stream().map(m -> new MyMembershipServiceResponse.BrandBenefit(
                    m.getBrand().getId(), m.getBrand().getName(), m.getBrand().getImage(), m.getBenefit()))
                .toList())
            .build();
    }

    private String toSettlementYm(LocalDate date) {
        return date.format(DateTimeFormatter.ofPattern("yyMM"));
    }
}
