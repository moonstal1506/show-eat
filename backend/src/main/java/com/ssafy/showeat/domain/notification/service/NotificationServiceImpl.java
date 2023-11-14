package com.ssafy.showeat.domain.notification.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.showeat.domain.notification.dto.response.NotificationListResponseDto;
import com.ssafy.showeat.domain.notification.repository.NotificationRepository;
import com.ssafy.showeat.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class NotificationServiceImpl implements NotificationService {

	private final NotificationRepository notificationRepository;

	@Override
	@Transactional
	public List<NotificationListResponseDto> getNotificationListByIsChecked(User user) {
		log.info("NotificationService_getNotificationListByIsChecked || 유저가 읽지 않은 알림 조회");

		// 읽지 않은 알람 조회
		List<NotificationListResponseDto> notificationListResponseDtos = notificationRepository
			.findNotificationWithFundingByUserAndNotificationIsChecked(user, false)
			.stream()
			.map(notification -> notification.toNotificationListResponseDto())
			.collect(Collectors.toList());

		System.out.println("notificationListResponseDtos = " + notificationListResponseDtos);


		// 읽지 않은 알람 읽음 처리
		notificationRepository.updateCheckedState(user);
		return notificationListResponseDtos;
	}

}
