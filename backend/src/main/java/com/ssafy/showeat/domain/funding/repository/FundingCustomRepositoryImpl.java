package com.ssafy.showeat.domain.funding.repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.showeat.domain.business.dto.response.BusinessMonthlyStatResponseDto;
import com.ssafy.showeat.domain.funding.entity.FundingIsSuccess;
import com.ssafy.showeat.domain.funding.entity.QFunding;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Repository
public class FundingCustomRepositoryImpl implements FundingCustomRepository {

	private final JPAQueryFactory jpaQueryFactory;
	private final QFunding funding = QFunding.funding;

	@Override
	public List<BusinessMonthlyStatResponseDto> findMonthlyStatListById(Long businessId) {
		LocalDate currentDate = LocalDate.now();

		List<BusinessMonthlyStatResponseDto> monthlyStatResponseDtos = jpaQueryFactory
			.select(
				Projections.constructor(
					BusinessMonthlyStatResponseDto.class,
					funding.fundingEndDate.year().as("year"),
					funding.fundingEndDate.month().as("month"),
					ExpressionUtils.as(
						new CaseBuilder()
							.when(funding.fundingIsSuccess.eq(FundingIsSuccess.SUCCESS))
							.then(funding.fundingCurCount.multiply(funding.fundingDiscountPrice))
							.otherwise(0)
							.sum()
						, "revenue"
					),
					funding.fundingIsSuccess.eq(FundingIsSuccess.SUCCESS).count().as("successFundingCnt"),
					funding.fundingCurCount.sum().as("fundingParticipantsCnt"),
					funding.fundingIsSuccess.eq(FundingIsSuccess.FAIL).count().as("failFundingCnt")
				)
			)
			.from(funding)
			.where(
				funding.business.businessId.eq(businessId),
				funding.fundingEndDate.before(currentDate)
			)
			.groupBy(funding.fundingEndDate.year(), funding.fundingEndDate.month())
			.orderBy(funding.fundingEndDate.year().asc(), funding.fundingEndDate.month().asc())
			.fetch();

		return monthlyStatResponseDtos;
	}
}
