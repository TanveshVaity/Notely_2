package com.notely.notely.config;

import com.cloudinary.Cloudinary;

import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    private final String CLOUD_NAME = "dgwvmq4xx";
    private  final  String API_KEY = "145235968977559";
    private final  String API_SECRET = "0eYU3hbj0vAtKqvfPBxG0KnxG9Q";

    @Bean
    public Cloudinary cloudinary(){
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", CLOUD_NAME,
                "api_key", API_KEY,
                "api_secret", API_SECRET));
    }
}
