package com.example.fitgpt.controller;

import com.example.fitgpt.dto.UserDTO;
import com.example.fitgpt.dto.UserDTOAPhysicalDTO;
import com.example.fitgpt.dto.UserPhysicalDTO;
import com.example.fitgpt.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, Object> request) {
        String userName = request.get("userName").toString();
        String userPassword = request.get("userPassword").toString();
        String userEmail = request.get("userEmail").toString();
        UserDTO userDTO = new UserDTO();
        userDTO.setUserName(userName);
        userDTO.setUserPassword(userPassword);
        userDTO.setUserEmail(userEmail);

        String gender = request.get("gender").toString();
        double height = Double.parseDouble(request.get("height").toString());
        double weight = Double.parseDouble(request.get("weight").toString());
        int age = Integer.parseInt(request.get("age").toString());
        double bodyFat = Double.parseDouble(request.get("bodyFat").toString());
        double muscleMass = Double.parseDouble(request.get("muscleMass").toString());
        UserPhysicalDTO physicalDTO = new UserPhysicalDTO();
        physicalDTO.setGender(gender);
        physicalDTO.setHeight(height);
        physicalDTO.setWeight(weight);
        physicalDTO.setAge(age);
        physicalDTO.setUserEmail(userEmail);
        physicalDTO.setBodyFat(bodyFat);
        physicalDTO.setMuscleMass(muscleMass);

        boolean isRegistered = userService.register(userDTO, physicalDTO);
        if (isRegistered) {
            return ResponseEntity.ok().body("{\"success\": true}");
        } else {
            return ResponseEntity.badRequest().body("{\"success\": false}");
        }
    }

    /*
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO, @RequestBody UserPhysicalDTO userPhysicalDTO) {
        boolean isRegistered = userService.register(userDTO, userPhysicalDTO);
        if (isRegistered) {
            return ResponseEntity.ok().body("{\"success\": true}");
        } else {
            return ResponseEntity.badRequest().body("{\"success\": false}");
        }
    }
    */

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO, HttpSession session) {
        UserDTO loginResult = userService.login(userDTO);
        if (loginResult != null) {
            // 세션에 사용자 이메일 저장
            session.setAttribute("loginEmail", loginResult.getUserEmail());

            // 응답 데이터 생성
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("userId", loginResult.getId()); // 사용자 ID 추가

            return ResponseEntity.ok(response); // JSON 응답
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            return ResponseEntity.badRequest().body(response);
        }
    }



    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody Map<String, Object> request) {
        String userEmail = request.get("userEmail").toString();
        String userName = request.get("name").toString();

        double height = Double.parseDouble(request.get("height").toString());
        double weight = Double.parseDouble(request.get("weight").toString());
        int age = Integer.parseInt(request.get("age").toString());

        boolean isUpdated = userService.updateUser(userEmail, userName, age, weight, height);
        if (isUpdated) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "User update failed");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserWithPhysicalInfoAsJson(@PathVariable String userEmail) {
        Map<String, Object> userInfo = userService.getUserWithPhysicalInfoAsJson(userEmail);
        if (userInfo != null) {
            return ResponseEntity.ok(userInfo); // JSON 응답
        } else {
            return ResponseEntity.badRequest().body("{\"success\": false}");
        }
    }
}
