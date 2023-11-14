package com.ssafy.showeat.domain.notification.service;

import java.util.List;

import com.ssafy.showeat.domain.notification.dto.response.NotificationListResponseDto;
import com.ssafy.showeat.domain.user.entity.User;

public interface NotificationService {
	List<NotificationListResponseDto> getNotificationListByIsChecked(User user);
}
