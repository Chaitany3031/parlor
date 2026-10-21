package com.angel.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverterAdapter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import reactor.core.publisher.Mono;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {
    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity httpSecurity){
        httpSecurity.authorizeExchange(
                exchanges -> exchanges
                        .pathMatchers("/auth/**").permitAll()
                        .pathMatchers("/api/notifications/ws/**").permitAll()
                        .pathMatchers(HttpMethod.GET, "/api/salons/**", "/salons/**").permitAll()
                        .pathMatchers("/api/categories/salon-owner/**",
                                "/api/notifications/salon-owner/**",
                                "/api/service-offering/salon-owner/**")
                        .hasAnyRole("SALON_OWNER")
                        .pathMatchers("/api/salons/**",
                                    "/salons/**",
                                    "/api/categories/**",
                                    "/api/notifications/**",
                                    "/api/bookings/**",
                                    "/api/payments/**",
                                    "/api/service-offering/**",
                                    "/api/users/**",
                                    "/api/reviews/**")
                        .hasAnyRole("CUSTOMER","SALON_OWNER","ADMIN")

        ).oauth2ResourceServer(oAuth2ResourceServerSpec -> oAuth2ResourceServerSpec
                .jwt(jwtSpec -> jwtSpec.jwtAuthenticationConverter(grantAuthoritiesExtractor())));
        httpSecurity.csrf(ServerHttpSecurity.CsrfSpec::disable);
        return httpSecurity.build();
    }

    private Converter<Jwt,? extends Mono<? extends AbstractAuthenticationToken>> grantAuthoritiesExtractor(){
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(
                new KeyCloakConverter()
        );
        return new ReactiveJwtAuthenticationConverterAdapter(jwtAuthenticationConverter);
    }
}
