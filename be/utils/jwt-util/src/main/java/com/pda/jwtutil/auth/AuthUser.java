package com.pda.jwtutil.auth;

import com.pda.jwtutil.TokenAuth;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AuthUser extends TokenAuth {
    private String token;

    AuthUser(Long id, String username, String token) {
        super(id, username);
        this.token = token;
    }
}
