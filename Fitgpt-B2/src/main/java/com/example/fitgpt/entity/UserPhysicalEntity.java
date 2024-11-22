package com.example.fitgpt.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "user_physical_info")
public class UserPhysicalEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;

    @Column
    private String userEmail;

    @Column
    private String gender;

    @Column
    private double height; // 키 (cm)

    @Column
    private double weight; // 몸무게 (kg)

    @Column
    private int age; // 나이

    @Column
    private double bodyFat; // 체지방률 (%)

    @Column
    private double muscleMass; // 골격근량 (kg)
}
