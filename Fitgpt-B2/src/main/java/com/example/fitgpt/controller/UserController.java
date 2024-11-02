package com.example.fitgpt.controller;

import com.example.fitgpt.dto.UserDTO;
import com.example.fitgpt.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/user/save")
    public String registerForm(){
        return "save";
    }

    @PostMapping("/user/save")
    public String registerUser(@ModelAttribute UserDTO userDTO){
        System.out.println("hello");
        System.out.println("memberDTO = " + userDTO);
        userService.save(userDTO);
        return "index";
    }

    @GetMapping("/user/login")
    public String loginForm(){
        return "login";
    }

    @PostMapping("/user/login")
    public String login(@ModelAttribute UserDTO userDTO, HttpSession session){
        UserDTO loginResult = userService.login(userDTO);
        if(loginResult != null){
            session.setAttribute("loginEmail", loginResult.getUserEmail());
            return "main";
        }else{
            return "login";
        }
    }

    @GetMapping("/user/")
    public String findAll(Model model){
        List<UserDTO> userDTOList = userService.findAll();
        model.addAttribute("userList", userDTOList);
        return "list";
    }

    @GetMapping("/user/{id}")
    public String findById(@PathVariable Long id, Model model){
        UserDTO userDTO = userService.findById(id);
        model.addAttribute("user", userDTO);
        return "detail";
    }

    @GetMapping("/user/update")
    public String updateForm(HttpSession httpSession, Model model){
        String myEmail = (String) httpSession.getAttribute("loginEmail");
        UserDTO userDTO = userService.updateForm(myEmail);
        model.addAttribute("updateUser", userDTO);
        return "update";
    }

    @PostMapping("/user/update")
    public String update(@ModelAttribute UserDTO userDTO){
        userService.update(userDTO);
        return "redirect:/user/" + userDTO.getId();
    }

    @GetMapping("/user/delete/{id}")
    public String deleteById(@PathVariable Long id){
        userService.deleteById(id);
        return "redirect:/user/";
    }

    @GetMapping("/user/logout")
    public String logout(HttpSession httpSession){
        httpSession.invalidate();
        return "index";
    }
}
