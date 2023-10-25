package com.ssafy.showeat.domain.coupon.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.showeat.domain.coupon.dto.request.UpdateCouponStatusRequestDto;
import com.ssafy.showeat.domain.coupon.dto.response.CouponResponseDto;
import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.coupon.repository.CouponRepository;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.UserRepository;
import com.ssafy.showeat.global.exception.NotExistCouponException;
import com.ssafy.showeat.global.exception.NotExistUserException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class CouponServiceImpl implements CouponService {
	private final CouponRepository couponRepository;
	private final UserRepository userRepository;

	@Override
	public List<CouponResponseDto> getActiveCouponListByUserId(Long userId) {
		log.info("CouponService_getCouponLIstByUserid || 유저의 사용가능 쿠폰 조회");
		User user = userRepository.findById(userId).orElseThrow(NotExistUserException::new);
		List<Coupon> couponList = couponRepository.findCouponByUserAndActive(user);
		return couponList.stream().map(Coupon::toCouponResponseDto).collect(Collectors.toList());
	}

	@Override
	public List<CouponResponseDto> getUsedCouponListByUserId(Long userId) {
		log.info("CouponService_getCouponLIstByUserid || 유저의 사용완료 쿠폰 조회");
		User user = userRepository.findById(userId).orElseThrow(NotExistUserException::new);
		List<Coupon> couponList = couponRepository.findCouponByUserAndUsed(user);
		return couponList.stream().map(Coupon::toCouponResponseDto).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public void updateCouponStatus(UpdateCouponStatusRequestDto updateCouponStatusRequestDto) {
		log.info("CouponService_updateCouponStatus || 해당 쿠폰 사용 처리");
		Coupon coupon = couponRepository.findById(updateCouponStatusRequestDto.getCouponId()).orElseThrow(
			NotExistCouponException::new);
		coupon.updateStatus(updateCouponStatusRequestDto.getCouponStatus());
	}
}
