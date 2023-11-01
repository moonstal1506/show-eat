package com.ssafy.showeat.domain.coupon.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.ssafy.showeat.domain.coupon.entity.CouponStatus;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCouponStatusRequestDto {

	@ApiModelProperty(value = "쿠폰ID", example = "1")
	private Long couponId;

	@ApiModelProperty(value = "쿠폰 상태", example = "ACTIVE")
	private CouponStatus couponStatus;
}
