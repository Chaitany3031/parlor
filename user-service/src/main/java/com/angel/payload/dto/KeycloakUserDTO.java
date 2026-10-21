package com.angel.payload.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class KeycloakUserDTO {
    @JsonAlias({"id", "sub"})
    private String id;

    @JsonAlias({"firstName", "given_name"})
    private String firstName;

    @JsonAlias({"lastName", "family_name"})
    private String lastName;

    private String email;

    @JsonAlias({"username", "preferred_username"})
    private String username;
}
