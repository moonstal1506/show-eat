package com.ssafy.showeat.domain.payment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponseDto {

	private String payType;
	private Long amount;
	private String orderName;
	private String orderId;
	private String successUrl;
	private String failUrl;

}
