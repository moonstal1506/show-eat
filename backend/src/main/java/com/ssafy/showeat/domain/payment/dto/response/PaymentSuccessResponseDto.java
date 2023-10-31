package com.ssafy.showeat.domain.payment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentSuccessResponseDto {
	String mid;
	String version;
	String paymentKey;
	String orderId;
	String orderName;
	String currency;
	String method;
	String totalAmount;
	String balanceAmount;
	String suppliedAmount;
	String vat;
	String status;
	String requestedAt;
	String approvedAt;
	String useEscrow;
	String cultureExpense;
	PaymentSuccessCardDto card;
	String type;
}
