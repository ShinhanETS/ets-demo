package com.pda.apiutil;

public class ApiUtil {
    public static <T> GlobalResponse<T> success(String message, T data) {
        return GlobalResponse.<T>builder()
            .success(true)
            .message(message)
            .data(data)
            .build();
    }

    public static GlobalResponse<Void> success(String message) {
        return GlobalResponse.<Void>builder()
            .success(true)
            .message(message)
            .build();
    }

    public static GlobalResponse<Void> exception(String message) {
        return GlobalResponse.<Void>builder()
            .success(false)
            .message(message)
            .build();
    }
}
