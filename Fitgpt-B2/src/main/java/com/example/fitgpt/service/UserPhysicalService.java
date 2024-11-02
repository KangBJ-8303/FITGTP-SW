package com.example.fitgpt.service;

import com.example.fitgpt.dto.UserPhysicalDTO;
import com.example.fitgpt.entity.UserPhysicalEntity;
import com.example.fitgpt.repository.UserPhysicalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserPhysicalService {

    @Autowired
    private UserPhysicalRepository userPhysicalRepository;

    // 특정 userId로 신체 정보 조회
    public UserPhysicalDTO getUserPhysicalInfo(Long userId) {
        Optional<UserPhysicalEntity> physicalInfoEntity = userPhysicalRepository.findByUserId(userId);
        return physicalInfoEntity.map(UserPhysicalDTO::toDTO).orElse(null); // 존재할 경우 DTO로 변환하여 반환
    }

    // 신체 정보 저장 또는 업데이트
    public UserPhysicalDTO saveOrUpdateUserPhysicalInfo(UserPhysicalDTO userPhysicalDTO) {
        UserPhysicalEntity entity = UserPhysicalDTO.toEntity(userPhysicalDTO);
        UserPhysicalEntity savedEntity = userPhysicalRepository.save(entity);
        return UserPhysicalDTO.toDTO(savedEntity); // 저장된 엔티티를 DTO로 변환하여 반환
    }
}
