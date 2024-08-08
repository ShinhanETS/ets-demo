package com.pda.membershipapplication.controller;

import com.pda.apiutil.ApiUtil;
import com.pda.apiutil.GlobalResponse;
import com.pda.jwtutil.auth.AuthInfo;
import com.pda.jwtutil.auth.AuthUser;
import com.pda.jwtutil.auth.Authenticated;
import com.pda.membershipapplication.service.MembershipService;
import com.pda.membershipapplication.service.dto.res.MyMembershipServiceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MembershipController {
    private final MembershipService membershipService;

    @GetMapping("/my")
    @Authenticated
    public GlobalResponse<MyMembershipServiceResponse> myMembership(@AuthInfo AuthUser authUser) {
        return ApiUtil.success("멤버쉽 불러오기 성공",
            membershipService.getMembershipByMemberId(authUser.getUsername(), authUser.getId()));
    }
}
