package com.ssafy.showeat.domain.funding.service;

import javax.servlet.http.HttpServletRequest;

import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingResponseDto;
import com.ssafy.showeat.domain.user.entity.User;

public interface FundingService {
	void createFunding(CreateFundingRequestDto createFundingRequestDto , User user);
	void applyFunding(Long fundingId , User user);
	void cancelFunding(Long fundingId , User user);
	FundingResponseDto getFunding(Long fundingId , User user);
}
