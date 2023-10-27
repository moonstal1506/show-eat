package com.ssafy.showeat.domain.funding.service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.ssafy.showeat.IntegrationTestSupport;
import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.funding.repository.FundingRepository;

class FundingServiceImplTest extends IntegrationTestSupport {

	@Autowired
	private FundingService fundingService;

	@Autowired
	private FundingRepository fundingRepository;

	@Test
	@DisplayName("설명")
	void 메서드명(){
	    // given
		CreateFundingRequestDto.builder()


	    // when

	    // then
	}

}