package com.arogya.flow.configs;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI(){
        return new OpenAPI()
                .info(new Info()
                        .title("Arogya Flow Backend")
                        .description("APIs for Arogya Flow Backend")
                        .version("1.0")
                        .contact(new Contact()
                                .name("Arogya Flow Team")
                                .email("support@arogyaflow.com")
                        )
                );
    }
}
