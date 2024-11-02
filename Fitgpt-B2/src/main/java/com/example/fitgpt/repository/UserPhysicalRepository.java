package com.example.fitgpt.repository;

import com.example.fitgpt.entity.UserPhysicalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserPhysicalRepository extends JpaRepository<UserPhysicalEntity, Long> {
    Optional<UserPhysicalEntity> findByUserId(Long userId);
}
