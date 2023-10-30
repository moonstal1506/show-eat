package com.ssafy.showeat.domain.payment.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.showeat.domain.payment.dto.response.PaymentResponseDto;
import com.ssafy.showeat.global.entity.BaseTimeEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Payment extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "payment_id", nullable = false, unique = true)
	private Long paymentId;

	@Column
	private String paymentKey;

	@Column(nullable = false, name = "pay_type")
	@Enumerated(EnumType.STRING)
	private PayType payType;

	@Column(nullable = false, name = "pay_amount")
	private Long amount;

	@Column(nullable = false, name = "order_id")
	private String orderId;

	@Column(nullable = false, name = "order_name")
	private String orderName;

	public PaymentResponseDto toPaymentResponseDto() {
		return PaymentResponseDto.builder()
			.payType(payType.getDescription())
			.amount(amount)
			.orderName(orderName)
			.orderId(orderId)
			.build();
	}

}
