package com.ssafy.showeat.domain.payment.service;

import com.ssafy.showeat.domain.payment.dto.request.PaymentRequestDto;

public interface PaymentService {
	void createRequestPayment(PaymentRequestDto requestPaymentDto);
}
