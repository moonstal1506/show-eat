package com.ssafy.showeat.domain.coupon.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CouponStatus {

	ACTIVE("미사용"),
	USED("사용 완료"),
	EXPIRED("사용 불가");

	private final String description;
}