package com.example.fitgpt.entity;

import com.example.fitgpt.dto.UserDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "user_info_table")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String userEmail;

    @Column
    private String userName;

    @Column
    private String userPassword;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserPhysicalEntity physicalInfo;

    public static UserEntity toUserEntity(UserDTO userDTO){
        UserEntity userEntity = new UserEntity();
        userEntity.setId(userDTO.getId());
        userEntity.setUserEmail(userDTO.getUserEmail());
        userEntity.setUserName(userDTO.getUserName());
        userEntity.setUserPassword(userDTO.getUserPassword());
        return userEntity;
    }

    public static UserEntity toUpdateUserEntity(UserDTO userDTO){
        UserEntity userEntity = new UserEntity();
        userEntity.setId(userDTO.getId());
        userEntity.setUserEmail(userDTO.getUserEmail());
        userEntity.setUserName(userDTO.getUserName());
        userEntity.setUserPassword(userDTO.getUserPassword());
        return userEntity;
    }
}
