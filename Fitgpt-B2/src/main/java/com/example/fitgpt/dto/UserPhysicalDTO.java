package com.example.fitgpt.dto;

import com.example.fitgpt.entity.UserPhysicalEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserPhysicalDTO {

    private Long id;
    private String userEmail;
    private String gender; //성별 
    private double height; // 키 (cm)
    private double weight; // 몸무게 (kg)
    private int age; // 나이
    private double bodyFat; // 체지방률 (%)
    private double muscleMass; // 골격근량 (kg)

    // UserPhysicalInfoEntity를 UserPhysicalInfoDTO로 변환하는 메서드
    public static UserPhysicalDTO toDTO(UserPhysicalEntity physicalInfoEntity) {
        UserPhysicalDTO dto = new UserPhysicalDTO();
        dto.setId(physicalInfoEntity.getId());
        dto.setGender(physicalInfoEntity.getGender());
        dto.setUserEmail(physicalInfoEntity.getUserEmail());
        dto.setHeight(physicalInfoEntity.getHeight());
        dto.setWeight(physicalInfoEntity.getWeight());
        dto.setAge(physicalInfoEntity.getAge());
        dto.setBodyFat(physicalInfoEntity.getBodyFat());
        dto.setMuscleMass(physicalInfoEntity.getMuscleMass());
        return dto;
    }

    // UserPhysicalInfoDTO를 UserPhysicalInfoEntity로 변환하는 메서드
    public static UserPhysicalEntity toEntity(UserPhysicalDTO dto) {
        UserPhysicalEntity entity = new UserPhysicalEntity();
        entity.setGender(dto.getGender());
        entity.setUserEmail(dto.getUserEmail());
        entity.setHeight(dto.getHeight());
        entity.setWeight(dto.getWeight());
        entity.setAge(dto.getAge());
        entity.setBodyFat(dto.getBodyFat());
        entity.setMuscleMass(dto.getMuscleMass());
        return entity;
    }
}

