package com.example.fitgpt.dto;

import com.example.fitgpt.entity.UserEntity;
import com.example.fitgpt.entity.UserPhysicalEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserDTOAPhysicalDTO {
    private UserDTO basicInfo;
    private UserPhysicalDTO bodyInfo;
}