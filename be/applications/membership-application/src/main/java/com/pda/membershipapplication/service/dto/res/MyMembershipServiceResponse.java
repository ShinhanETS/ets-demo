package com.pda.membershipapplication.service.dto.res;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class MyMembershipServiceResponse {
    private String grade;
    private String gradeImage;
    private Long point;
    private Long minPoint;
    private Long maxPoint;
    private List<BrandBenefit> benefits;

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BrandBenefit {
        private Long brandId;
        private String brand;
        private String brandImage;
        private String benefit;
    }
}
