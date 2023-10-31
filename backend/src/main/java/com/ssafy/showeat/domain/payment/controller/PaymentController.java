package com.ssafy.showeat.domain.payment.controller;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.showeat.domain.payment.dto.request.PaymentRequestDto;
import com.ssafy.showeat.domain.payment.dto.response.PaymentSuccessResponseDto;
import com.ssafy.showeat.domain.payment.dto.response.PaymentResponseDto;
import com.ssafy.showeat.domain.payment.service.PaymentService;
import com.ssafy.showeat.global.response.ResponseResult;
import com.ssafy.showeat.global.response.SingleResponseResult;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/payments")
public class PaymentController {

	private final PaymentService paymentService;

	@ApiOperation(value = "결제 요청", notes = "결제 요청에 필요한 값들을 반환합니다")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "결제 요청 정보 DB 저장 성공"),
		@ApiResponse(code = 400, message = "결제 요청 정보 DB 저장 실패"),
	})
	@PostMapping
	public ResponseResult requestPayment(
		@ApiParam(value = "요청 객체", required = true) @Valid @RequestBody PaymentRequestDto paymentRequestDto) {
		PaymentResponseDto paymentResponseDto = paymentService.requestPayment(paymentRequestDto);
		return new SingleResponseResult<>(paymentResponseDto);
	}

	@ApiOperation(value = "결제 승인 요청", notes = "결제 성공 시 결제 승인 요청을 보냅니다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "결제 승인 요청 성공"),
		@ApiResponse(code = 400, message = "결제 승인 요청 실패"),
	})
	@GetMapping
	public ResponseResult requestPaymentApproval(
		@ApiParam(value = "토스 측 결제 고유 번호", required = true) @RequestParam String paymentKey,
		@ApiParam(value = "우리 측 주문 고유 번호", required = true) @RequestParam String orderId,
		@ApiParam(value = "실제 결제 금액", required = true) @RequestParam Long amount) {
		paymentService.verifyPayment(paymentKey, orderId, amount);
		PaymentSuccessResponseDto paymentApprovalResponseDto = paymentService.requestPaymentApproval(paymentKey, orderId, amount);
		return new SingleResponseResult<>(paymentApprovalResponseDto);
	}

}
