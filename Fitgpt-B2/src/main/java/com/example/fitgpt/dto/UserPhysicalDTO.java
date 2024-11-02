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
    private double height; // 키 (cm)
    private double weight; // 몸무게 (kg)
    private int age; // 나이
    private double bodyFatPercentage; // 체지방률 (%)
    private double skeletalMuscleMass; // 골격근량 (kg)

    // UserPhysicalInfoEntity를 UserPhysicalInfoDTO로 변환하는 메서드
    public static UserPhysicalDTO toDTO(UserPhysicalEntity physicalInfoEntity) {
        UserPhysicalDTO dto = new UserPhysicalDTO();
        dto.setId(physicalInfoEntity.getId());
        dto.setHeight(physicalInfoEntity.getHeight());
        dto.setWeight(physicalInfoEntity.getWeight());
        dto.setAge(physicalInfoEntity.getAge());
        dto.setBodyFatPercentage(physicalInfoEntity.getBodyFatPercentage());
        dto.setSkeletalMuscleMass(physicalInfoEntity.getSkeletalMuscleMass());
        return dto;
    }

    // UserPhysicalInfoDTO를 UserPhysicalInfoEntity로 변환하는 메서드
    public static UserPhysicalEntity toEntity(UserPhysicalDTO dto) {
        UserPhysicalEntity entity = new UserPhysicalEntity();
        entity.setHeight(dto.getHeight());
        entity.setWeight(dto.getWeight());
        entity.setAge(dto.getAge());
        entity.setBodyFatPercentage(dto.getBodyFatPercentage());
        entity.setSkeletalMuscleMass(dto.getSkeletalMuscleMass());
        return entity;
    }
}

