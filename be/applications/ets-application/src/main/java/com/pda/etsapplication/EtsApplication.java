package com.pda.etsapplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.pda"})
public class EtsApplication {

    public static void main(String[] args) {
        SpringApplication.run(EtsApplication.class, args);
    }

}
