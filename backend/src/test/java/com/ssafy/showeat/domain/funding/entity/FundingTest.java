package com.ssafy.showeat.domain.funding.entity;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class FundingTest {

	@Test
	@DisplayName("펀딩 참여자가 늘어날시 펀딩 참여금액이 discountPrice만큼 증가한다.")
	void 펀딩참여시_펀딩참여금액증가() {
	    // given
		Funding funding = createFunding();

	    // when
		funding.addMoneyForApply();

	    // then
		assertThat(funding.getFundingTotalAmount()).isEqualTo(7000);
	}

	private Funding createFunding(){
		return Funding.builder()
			.fundingId(1L)
			.fundingTitle("맛있는 과자에요")
			.fundingMaxLimit(150)
			.fundingMinLimit(50)
			.fundingCurCount(100)
			.fundingDiscountPrice(7000)
			.fundingDiscountRate(10)
			.fundingMenu("과자")
			.fundingPrice(10000)
			.fundingTotalAmount(0)
			.fundingEndDate(LocalDate.now())
			.fundingIsActive(FundingIsActive.ACTIVE)
			.fundingIsSuccess(FundingIsSuccess.SUCCESS)
			.business(null)
			.build();
	}
}