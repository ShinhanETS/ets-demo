package com.pda.jwtutil.auth;

import com.pda.jwtutil.JwtUtil;
import com.pda.jwtutil.TokenAuth;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthUserArgumentResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterAnnotation(AuthInfo.class) != null;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest httpServletRequest = (HttpServletRequest)webRequest.getNativeRequest();

        String token = JwtUtil.resolveToken(httpServletRequest);

        if (token != null) {
            Optional<TokenAuth> tokenAuth = JwtUtil.parseToken(token);

            if (tokenAuth.isEmpty())
                return null;

            return new AuthUser(tokenAuth.get().getId(), tokenAuth.get().getUsername(), token);
        }

        return null;
    }
}
