package com.example.fitgpt.service;

import com.example.fitgpt.dto.UserDTO;
import com.example.fitgpt.entity.UserEntity;
import com.example.fitgpt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void save(UserDTO userDTO){
        UserEntity userEntity = UserEntity.toUserEntity(userDTO);
        userRepository.save(userEntity);
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

    public List<UserDTO> findAll(){
        List<UserEntity> userEntityList = userRepository.findAll();
        List<UserDTO> userDTOList = new ArrayList<>();

        for(UserEntity userEntity : userEntityList){
            userDTOList.add(UserDTO.toUserDTO(userEntity));
            //MemberDTO memberDTO = MemberDTO.toMemberDTO(memberEntity);
            //memberDTOList.add(memberDTO);
        }
        return userDTOList;
    }

    public UserDTO findById(Long id) {
        Optional<UserEntity> optionalMemberEntity = userRepository.findById(id);
        if(optionalMemberEntity.isPresent()){
            UserEntity userEntity = optionalMemberEntity.get();
            UserDTO userDTO = UserDTO.toUserDTO(userEntity);
            return userDTO;
        }else{
            return null;
        }
    }

    public UserDTO updateForm(String myEmail) {
        Optional<UserEntity> optionalUserEntity = userRepository.findByUserEmail(myEmail);
        if(optionalUserEntity.isPresent()) {
            return UserDTO.toUserDTO(optionalUserEntity.get());
        } else{
            return null;
        }
    }

    public void update(UserDTO userDTO) {
        userRepository.save(UserEntity.toUpdateUserEntity(userDTO));
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
