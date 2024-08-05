package com.pda.exceptionutil.exceptions;

public class CommonException extends RuntimeException {
    private CommonException(String message) {
        super(message);
    }

    public static CommonException create() {
        return new CommonException("Exception occurred");
    }

    public static CommonException create(String message) {
        return new CommonException(message);
    }
}
