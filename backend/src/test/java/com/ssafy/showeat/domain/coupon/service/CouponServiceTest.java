package com.ssafy.showeat.domain.coupon.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ssafy.showeat.domain.coupon.dto.response.CouponResponseDto;
import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.coupon.entity.CouponState;
import com.ssafy.showeat.domain.coupon.repository.CouponRepository;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class CouponServiceTest {
	@InjectMocks
	private CouponServiceImpl couponService;

	@Mock
	private CouponRepository couponRepository;

	@Mock
	private UserRepository userRepository;

	@Test
	public void testGetCouponListByUserId() {
		// Mock 데이터 생성
		Long userId = 1L;
		User user = new User(); // 유저 객체 생성
		List<Coupon> mockCouponList = new ArrayList<>();
		Coupon coupon1 = new Coupon(1L, 10, CouponState.ACTIVE, user, new Funding());
		Coupon coupon2 = new Coupon(2L, 20, CouponState.EXPIRED, user, new Funding());
		mockCouponList.add(coupon1);
		mockCouponList.add(coupon2);

		// UserRepository findById 메서드 Mock 설정
		when(userRepository.findById(userId)).thenReturn(Optional.of(user));

		// CouponRepository findByUser 메서드 Mock 설정
		when(couponRepository.findByUser(user)).thenReturn(mockCouponList);

		// 테스트 대상 메서드 호출
		List<CouponResponseDto> couponList = couponService.getCouponListByUserId(userId);

		// 결과 검증
		assertNotNull(couponList);
		assertEquals(2, couponList.size());

		CouponResponseDto firstCoupon = couponList.get(0);
		assertEquals(1L, firstCoupon.getCouponId());
		assertEquals(10, firstCoupon.getCouponPrice());
		assertEquals(CouponState.ACTIVE, firstCoupon.getCouponState());

		CouponResponseDto secondCoupon = couponList.get(1);
		assertEquals(2L, secondCoupon.getCouponId());
		assertEquals(20, secondCoupon.getCouponPrice());
		assertEquals(CouponState.EXPIRED, secondCoupon.getCouponState());
	}
}