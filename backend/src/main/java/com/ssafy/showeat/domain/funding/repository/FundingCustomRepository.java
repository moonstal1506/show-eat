package com.ssafy.showeat.domain.funding.repository;

import java.util.List;

import com.ssafy.showeat.domain.business.dto.response.BusinessMonthlyStatResponseDto;
import com.ssafy.showeat.domain.business.dto.response.BusinessTotalStatResponseDto;

public interface FundingCustomRepository {
	List<BusinessMonthlyStatResponseDto> findMonthlyStatListById(Long businessId);

	BusinessTotalStatResponseDto findTotalStatById(Long businessId);
}
