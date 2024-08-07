package com.pda.jwtutil.auth;

import com.pda.exceptionutil.exceptions.CommonException;
import com.pda.jwtutil.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
@Slf4j
public class AuthenticatedAspect {
    @Before("@annotation(com.pda.jwtutil.auth.Authenticated)")
    public void authenticated(JoinPoint joinPoint) {
        ServletRequestAttributes requestAttributes =
            (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request =requestAttributes.getRequest();

        String token = JwtUtil.resolveToken(request);

        if (token == null) throw CommonException.create("올바르지 않은 토큰");

        JwtUtil.parseToken(token).orElseThrow(() -> CommonException.create("올바르지 않은 토큰"));
    }
}
