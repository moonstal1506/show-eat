package com.ssafy.showeat.domain.payment.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.showeat.domain.payment.dto.request.PaymentRequestDto;
import com.ssafy.showeat.domain.payment.service.PaymentService;
import com.ssafy.showeat.global.response.ResponseResult;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/payment")
public class PaymentController {

	private final PaymentService paymentService;

	@ApiOperation(value = "펀딩 생성", notes = "업주가 펀딩을 생성합니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "펀딩 생성 성공"),
		@ApiResponse(code = 400, message = "펀딩 생성 실패"),
	})
	@PostMapping
	public ResponseResult requestPayment(@Valid @RequestBody PaymentRequestDto requestPaymentDto) {
		paymentService.createRequestPayment(requestPaymentDto);
		return ResponseResult.successResponse;
	}

}
