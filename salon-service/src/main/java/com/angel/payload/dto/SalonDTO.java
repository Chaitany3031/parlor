package com.angel.payload.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalTime;
import java.util.List;

@Data
public class SalonDTO {
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;
    private String name;
    private List<String> images;
    private String address;
    @JsonProperty("phoneNumber")
    @JsonAlias({"phoneNumber", "phone", "phoneNo"})
    private String phoneNo;
    private String email;
    private String city;
    private Long ownerId;
    private LocalTime openTime;
    private LocalTime closeTime;
}
