package com.ssafy.showeat.domain.coupon.dto.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCouponPriceRequestDto {

	@ApiModelProperty(value = "쿠폰ID", example = "1")
	private Long couponId;

	@ApiModelProperty(value = "차감 금액", example = "ACTIVE")
	private int couponAmount;
}
