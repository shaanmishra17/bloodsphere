package com.theemcoe.hemolink;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * HEMO LINK - Digital Blood Donation & Emergency Response Platform
 * Department of Information Technology Engineering
 * H. J. Thim Trust's Theem College of Engineering, Boisar
 *
 * S.E. Semester-III Mini Project Main Application Entry Point
 * Project Team: Tanmay Parandwal, Shaan Mishra, Shubham Pradhan, Sumit Pathak
 */
@SpringBootApplication
public class HemolinkApplication {

    public static void main(String[] args) {
        SpringApplication.run(HemolinkApplication.class, args);
        System.out.println("==============================================================");
        System.out.println("🩸 HEMO LINK Backend Server Started Successfully on Port 8080");
        System.out.println("   Theem College of Engineering • IT Dept Mini Project");
        System.out.println("==============================================================");
    }

    /**
     * Cross-Origin Resource Sharing (CORS) Configuration
     * Connects frontend web UI seamlessly to Spring Boot REST endpoints
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
            }
        };
    }
}
