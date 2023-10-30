package com.ssafy.showeat.domain.payment.dto.request;

import java.util.UUID;

import com.ssafy.showeat.domain.payment.entity.PayType;
import com.ssafy.showeat.domain.payment.entity.Payment;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDto {

	@ApiModelProperty(value = "결제 타입 정보", example = "일반결제")
	private PayType payType;

	@ApiModelProperty(value = "결제 타입 정보", example = "일반결제")
	private Long amount;

	@ApiModelProperty(value = "결제 타입 정보", example = "일반결제")
	private String orderName;

	private String yourSuccessUrl;
	private String yourFailUrl;


	public Payment toEntity() {
		return Payment.builder()
			.payType(payType)
			.amount(amount)
			.orderName(orderName)
			.orderId(UUID.randomUUID().toString())
			.paySuccessYN(false)
			.build();
	}

}
