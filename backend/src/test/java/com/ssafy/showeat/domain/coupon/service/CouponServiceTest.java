package com.ssafy.showeat.domain.coupon.service;

import static com.ssafy.showeat.domain.coupon.entity.CouponStatus.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponStatusRequestDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponListResponseDto;
import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.coupon.entity.CouponStatus;
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
	public void testGetActiveCouponListByUserId() {
		// 1. given
		// Mock 데이터 생성
		Long userId = 1L;
		User user = new User(); // 유저 객체 생성
		List<Coupon> mockCouponList = new ArrayList<>();
		Coupon coupon1 = new Coupon(1L, 10, ACTIVE, LocalDate.now(), user, new Funding());
		Coupon coupon2 = new Coupon(2L, 20, EXPIRED, LocalDate.now(), user, new Funding());
		Coupon coupon3 = new Coupon(3L, 30, USED, LocalDate.now(), user, new Funding());
		Coupon coupon4 = new Coupon(4L, 40, ACTIVE, LocalDate.now(), user, new Funding());
		mockCouponList.add(coupon1);
		mockCouponList.add(coupon2);
		mockCouponList.add(coupon3);
		mockCouponList.add(coupon4);

		// 2. when
		// UserRepository findById 메서드 Mock 설정
		when(userRepository.findById(userId)).thenReturn(Optional.of(user));

		// CouponRepository findByUser 메서드 Mock 설정
		when(couponRepository.findActiveCouponByUser(user)).thenReturn(mockCouponList);

		// 3. then
		// getActiveCouponListByUserId 메서드 호출
		List<CouponListResponseDto> couponList = couponService.getActiveCouponListByUserId(userId);

		// 4. assert
		assertNotNull(couponList);
		assertEquals(2, couponList.size());

		CouponListResponseDto firstCoupon = couponList.get(0);
		assertEquals(1L, firstCoupon.getCouponId());
		assertEquals(CouponStatus.ACTIVE, firstCoupon.getCouponStatus());

		CouponListResponseDto secondCoupon = couponList.get(1);
		assertEquals(4L, secondCoupon.getCouponId());
		assertEquals(CouponStatus.ACTIVE, secondCoupon.getCouponStatus());
	}

	@Test
	public void testUpdateCouponStatus() {
		// 1. given
		// Mock 데이터 생성
		Long couponId = 1L;
		CouponStatus newState = USED;
		Coupon coupon = new Coupon(1L, 10, ACTIVE, LocalDate.now(), new User(), new Funding());
		UpdateCouponStatusRequestDto updateCouponStatusRequestDto = new UpdateCouponStatusRequestDto();
		updateCouponStatusRequestDto.setCouponId(couponId);
		updateCouponStatusRequestDto.setCouponStatus(newState);

		// 2. when
		// CouponRepository findById 메서드 Mock 설정
		when(couponRepository.findById(couponId)).thenReturn(Optional.of(coupon));

		// 3. then
		// updateCouponStatus 메서드 호출
		couponService.updateCouponStatus(updateCouponStatusRequestDto);

		// 4. assert
		assertEquals(newState, coupon.getCouponStatus());
	}
}