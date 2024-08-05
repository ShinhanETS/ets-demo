package com.pda.authapplication.service;

import com.pda.authapplication.repository.AuthInfoEntity;
import com.pda.authapplication.repository.AuthInfoRepository;
import com.pda.authapplication.service.dto.req.SignInServiceRequest;
import com.pda.exceptionutil.exceptions.CommonException;
import com.pda.jwtutil.JwtUtil;
import com.pda.jwtutil.TokenAuth;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {
    private final AuthInfoRepository authInfoRepository;

    public String signIn(final SignInServiceRequest request) {
        AuthInfoEntity authInfo = authInfoRepository.findByUserId(request.getUserId())
            .orElseThrow(() -> CommonException.create("아이디 혹은 패스워드가 틀렸습니다."));

        if (!authInfo.getPassword().equals(request.getPassword()))
            throw CommonException.create("아이디 혹은 패스워드가 틀렸습니다.");

        return JwtUtil.generateToken(TokenAuth.builder()
                .id(authInfo.getId())
                .username(authInfo.getUsername())
            .build());
    }
}
