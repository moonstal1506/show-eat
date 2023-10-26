package com.ssafy.showeat.domain.coupon.service;

import java.util.List;

import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponStatusRequestDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponDetailResponseDto;

public interface CouponService {
	List<CouponDetailResponseDto> getActiveCouponListByUserId(Long userId);

	List<CouponDetailResponseDto> getUsedCouponListByUserId(Long userId);

	List<CouponDetailResponseDto> getExpiredCouponListByUserId(Long userId);

	CouponDetailResponseDto getCouponDetailByCouponId(Long couponId);

	void updateCouponStatus(UpdateCouponStatusRequestDto updateCouponStatusRequestDto);
}
