package com.ssafy.showeat.domain.auth.service;

import com.ssafy.showeat.domain.auth.dto.TokenDto;
import com.ssafy.showeat.domain.auth.dto.request.LogoutReqDto;
import com.ssafy.showeat.domain.auth.dto.request.UserDeleteReqDto;
import com.ssafy.showeat.domain.user.entity.Credential;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.CredentialRepository;
import com.ssafy.showeat.domain.user.repository.UserRepository;
import com.ssafy.showeat.global.exception.NotExistUserException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final CredentialRepository credentialRepository;
    private final RedisService redisService;

    @Transactional
    public void logout(LogoutReqDto logoutReqDto){
        User user = userRepository.findByUserId(
                logoutReqDto.getUserId()).orElseThrow(NotExistUserException::new);

        Credential credential = credentialRepository.findByCredentialId(
                user.getCredential().getCredentialId()).orElseThrow(NotExistUserException::new);// TODO : 예외처리

        credential.updateRefreshToken(null);

        //redis 에서 refreshToken 삭제
        redisService.delValues(user.getUserId());

        log.info("{} 님의 로그아웃 요청이 정상적으로 처리되었습니다.", user.getUserNickname());
    }

    @Transactional
    public void deleteUser(UserDeleteReqDto userDeleteReqDto){
        User user = userRepository.findByUserId(
                userDeleteReqDto.getUserId()).orElseThrow(NotExistUserException::new);

        Credential credential = credentialRepository.findByCredentialId(
                user.getCredential().getCredentialId()).orElseThrow(NotExistUserException::new);// TODO : 예외처리

        credentialRepository.deleteCredentialByCredentialId(user.getCredential().getCredentialId());
        userRepository.deleteUserByUserId(user.getUserId());
        log.info("{} 님의 회원 탈퇴가 완료되었습니다.", user.getUserNickname());
    }
}
