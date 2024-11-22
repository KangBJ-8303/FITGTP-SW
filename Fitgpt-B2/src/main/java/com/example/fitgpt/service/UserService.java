package com.example.fitgpt.service;

import com.example.fitgpt.dto.UserDTO;
import com.example.fitgpt.dto.UserDTOAPhysicalDTO;
import com.example.fitgpt.dto.UserPhysicalDTO;
import com.example.fitgpt.entity.UserEntity;
import com.example.fitgpt.entity.UserPhysicalEntity;
import com.example.fitgpt.repository.UserPhysicalRepository;
import com.example.fitgpt.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final UserPhysicalRepository userPhysicalRepository;

    // 회원가입 로직
    public boolean register(UserDTO userDTO, UserPhysicalDTO userPhysicalDTO) {
        // 이메일 중복 체크
        if (userRepository.findByUserEmail(userDTO.getUserEmail()).isPresent()) {
            return false; // 이메일 중복
        }

        // UserEntity 저장
        UserEntity userEntity = UserEntity.toUserEntity(userDTO);
        userEntity = userRepository.save(userEntity);

        // UserPhysicalEntity 저장
        UserPhysicalEntity physicalEntity = UserPhysicalDTO.toEntity(userPhysicalDTO);
        physicalEntity.setUser(userEntity); // UserEntity와 연관 설정
        userPhysicalRepository.save(physicalEntity);

        return true; // 성공
    }

    public UserDTO login(UserDTO userDTO){
        Optional<UserEntity> byMemberEmail = userRepository.findByUserEmail(userDTO.getUserEmail());

        if(byMemberEmail.isPresent()){
            UserEntity userEntity = byMemberEmail.get();
            if(userEntity.getUserPassword().equals(userDTO.getUserPassword())){
                UserDTO dto = UserDTO.toUserDTO(userEntity);
                return dto;
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

    @Transactional
    public boolean updateUser(String userEmail, String userName, int age, double weight, double height) {
        Optional<UserEntity> userEntityOpt = userRepository.findByUserEmail(userEmail);
        if (userEntityOpt.isPresent()) {
            UserEntity userEntity = userEntityOpt.get();
            userEntity.setUserName(userName);

            Optional<UserPhysicalEntity> physicalEntityOpt = userPhysicalRepository.findByUserEmail(userEmail);
            if (physicalEntityOpt.isPresent()) {
                UserPhysicalEntity physicalEntity = physicalEntityOpt.get();
                physicalEntity.setHeight(height);
                physicalEntity.setWeight(weight);
                physicalEntity.setAge(age);

                userPhysicalRepository.save(physicalEntity);
            }

            userRepository.save(userEntity);
            return true;
        }
        return false;
    }


    public Map<String, Object> getUserWithPhysicalInfoAsJson(String userEmail) {
        // UserEntity 조회
        UserEntity userEntity = userRepository.findByUserEmail(userEmail).orElse(null);
        if (userEntity == null) {
            return null; // 사용자 정보 없음
        }

        // UserPhysicalEntity 조회
        UserPhysicalEntity physicalEntity = userPhysicalRepository.findByUserEmail(userEmail).orElse(null);

        // JSON 데이터 조합
        Map<String, Object> result = new HashMap<>();
        result.put("user", UserDTO.toUserDTO(userEntity));
        result.put("physicalInfo", physicalEntity != null ? UserPhysicalDTO.toDTO(physicalEntity) : null);

        return result;
    }
}
