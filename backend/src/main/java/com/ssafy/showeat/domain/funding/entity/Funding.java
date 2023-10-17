package com.ssafy.showeat.domain.funding.entity;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.notification.entity.NotificationType;
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
public class Funding extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long fundingId;

	@Column(nullable = false)
	private int fundingMaxLimit;

	@Column(nullable = false)
	private int fundingMinLimit;

	@Column(nullable = false)
	private int fundingCurCount;

	@Column(nullable = false)
	private int fundingPrice;

	@Column(nullable = false)
	private int fundingDiscountPrice;

	@Column(nullable = false)
	private int fundingDiscountRate;

	@Column(nullable = false, length = 100)
	private String fundingMenu;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private FundingIsActive fundingIsActive;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private FundingIsSuccess fundingIsSuccess;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "business_id", nullable = false)
	private Business business;

}
