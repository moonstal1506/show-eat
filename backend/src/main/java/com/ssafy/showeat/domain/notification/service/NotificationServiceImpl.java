package com.ssafy.showeat.domain.notification.service;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.notification.dto.response.NotificationListResponseDto;
import com.ssafy.showeat.domain.notification.dto.response.NotificationResponseDto;
import com.ssafy.showeat.domain.notification.entity.Notification;
import com.ssafy.showeat.domain.notification.entity.NotificationType;
import com.ssafy.showeat.domain.notification.repository.NotificationRepository;
import com.ssafy.showeat.domain.user.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class NotificationServiceImpl implements NotificationService {

	private final DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

	private final NotificationRepository notificationRepository;
	private final MessageService messageService;

	@Override
	@Transactional
	public NotificationListResponseDto getNotificationListByIsChecked(User user) {
		log.info("NotificationService_getNotificationListByIsChecked || 유저가 읽지 않은 알림 조회");
		List<NotificationResponseDto> participatingFunding = new ArrayList<>();
		List<NotificationResponseDto> bookmarkFunding = new ArrayList<>();

		// 읽지 않은 알람 조회
		for (Notification notification : notificationRepository
			.findNotificationWithFundingByUserAndNotificationIsChecked(user, false)) {
			if (notification.getNotificationType() == NotificationType.FUNDING_DEADLINE) {
				bookmarkFunding.add(notification.toNotificationListResponseDto());
			} else {
				participatingFunding.add(notification.toNotificationListResponseDto());
			}
		}

		// 읽지 않은 알람 읽음 처리
		notificationRepository.updateCheckedState(user);
		return NotificationListResponseDto.builder()
			.bookmarkFunding(bookmarkFunding)
			.participatingFunding(participatingFunding)
			.build();

	}

	@Override
	public boolean getNotificationExist(User user) {
		return notificationRepository.existsByUserAndNotificationIsChecked(user, false);
	}

	@Override
	@Transactional
	public void createNotification(List<Coupon> coupons) throws IOException {
		List<Notification> notifications = new ArrayList<>();
		for (Coupon coupon : coupons) {

			String message = coupon.getFunding().getFundingTitle() + NotificationType.COUPON_CREATE.getMessage()
				+ dateFormat.format(coupon.getCouponExpirationDate());

			Notification notification = Notification.createMms(coupon.getUser(), coupon.getFunding(), message,
				NotificationType.COUPON_CREATE, coupon);
			notifications.add(notification);

			messageService.sendMmsQR(notification);
		}
		notificationRepository.saveAll(notifications);
	}

}
