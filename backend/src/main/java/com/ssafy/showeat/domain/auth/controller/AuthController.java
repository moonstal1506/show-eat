package com.ssafy.showeat.domain.auth.controller;


import com.ssafy.showeat.domain.auth.dto.request.LogoutReqDto;
import com.ssafy.showeat.domain.auth.dto.request.UserDeleteReqDto;
import com.ssafy.showeat.domain.auth.dto.response.LoginResponseDto;
import com.ssafy.showeat.domain.auth.service.AuthService;
import com.ssafy.showeat.domain.auth.service.KakaoAuthService;
import com.ssafy.showeat.domain.auth.util.HeaderUtil;
import com.ssafy.showeat.global.response.ResponseResult;
import com.ssafy.showeat.global.response.SingleResponseResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final KakaoAuthService kakaoAuthService;
    private final AuthService authService;
    private final HeaderUtil headerUtil;

    @GetMapping("/login/kakao")
    public ResponseEntity kakaoLogin(HttpServletRequest request) {
        log.info("kakaoLogin -> 카카오 로그인 !!!!!");
        String code = request.getParameter("code");
        LoginResponseDto loginResponseDto = kakaoAuthService.kakaoLogin(code);
        return ResponseEntity.ok().headers(headerUtil.setTokenHeaders(loginResponseDto.getTokenDto()))
                .body(new SingleResponseResult<>(loginResponseDto.getUserResDto()));
    }

    @PatchMapping("/logout")
    public ResponseResult logout(@RequestBody LogoutReqDto logoutReqDto) {
        System.out.println("로그아웃할래요ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ");
        authService.logout(logoutReqDto);
        return ResponseResult.successResponse;
    }

    @DeleteMapping("/delete")
    public ResponseResult deleteUser(@RequestBody UserDeleteReqDto userDeleteReqDto) {
        System.out.println("탈퇴할래요!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        authService.deleteUser(userDeleteReqDto);
        return ResponseResult.successResponse;
    }

}