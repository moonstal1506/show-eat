package com.ssafy.showeat.domain.coupon.service;

import java.util.List;

import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponStatusRequestDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponDetailResponseDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponListResponseDto;

public interface CouponService {
	List<CouponListResponseDto> getActiveCouponListByUserId(Long userId);

	List<CouponListResponseDto> getUsedCouponListByUserId(Long userId);

	List<CouponListResponseDto> getExpiredCouponListByUserId(Long userId);

	CouponDetailResponseDto getCouponDetailByCouponId(Long couponId);

	void updateCouponStatus(UpdateCouponStatusRequestDto updateCouponStatusRequestDto);
}
