package com.pda.jwtutil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

import java.security.Key;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

public class JwtUtil {
    private static final Key key = Keys.hmacShaKeyFor("thiskeyisuselesskeybecauseitsdemoversionyouknow".getBytes());

    public static String generateToken(final TokenAuth tokenAuth) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiredTime = now.plusMonths(1);

        return Jwts.builder()
            .setSubject(tokenAuth.getId().toString())
            .claim("username", tokenAuth.getUsername())
            .setIssuedAt(Timestamp.valueOf(now))
            .setExpiration(Timestamp.valueOf(expiredTime))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
    }

    public static Optional<TokenAuth> parseToken(final String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

            return Optional.of(TokenAuth.builder()
                    .id(Long.valueOf(claims.getSubject()))
                    .username((String) claims.get("username"))
                .build());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public static String resolveToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer"+" "))
            return authorizationHeader.substring(7);

        return null;
    }
}
