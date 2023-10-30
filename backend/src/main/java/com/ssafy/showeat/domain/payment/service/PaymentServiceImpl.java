package com.ssafy.showeat.domain.payment.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.showeat.domain.business.entity.BusinessMenu;
import com.ssafy.showeat.domain.payment.dto.request.PaymentRequestDto;
import com.ssafy.showeat.domain.payment.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class PaymentServiceImpl implements PaymentService {

	private final PaymentRepository paymentRepository;

	@Override
	@Transactional
	public void createRequestPayment(PaymentRequestDto paymentRequestDto) {
		log.info("PaymentServiceImpl_createRequestPayment || 결제 요청 정보를 임시저장");
		// paymentRepository.save(paymentRequestDto.createPayment())

		// paymentRepository.save()
	}
}
