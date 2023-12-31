package com.ssafy.showeat.domain.funding.entity;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
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
import javax.persistence.OneToMany;

import com.ssafy.showeat.domain.bookmark.entity.Bookmark;
import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.coupon.entity.Coupon;
import com.ssafy.showeat.domain.funding.dto.response.FundingListResponseDto;
import com.ssafy.showeat.domain.funding.dto.response.FundingResponseDto;
import com.ssafy.showeat.domain.user.entity.User;
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

	@Column(nullable = false, length = 100)
	private String fundingTitle;

	@Column(nullable = false)
	private String fundingBusinessName;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 100)
	private FundingType fundingType;

	@Enumerated(EnumType.STRING)
	@Column(length = 100)
	private FundingCategory fundingCategory;

	private int fundingMaxLimit;

	@Column(nullable = false)
	private int fundingMinLimit;

	@Column(nullable = false)
	private int fundingCurCount;

	@Column(nullable = true)
	private int participationRate;

	@Column(nullable = false)
	private int fundingTotalAmount;

	@Column(nullable = false)
	private int fundingDiscountPrice;

	@Column(nullable = false)
	private int fundingDiscountRate;

	@Column(length = 100)
	private String fundingMenu;

	private int fundingPrice;

	@Column(nullable = false)
	private String fundingDescription;

	@Column(nullable = false)
	private LocalDate fundingEndDate;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private FundingIsActive fundingIsActive;

	@Enumerated(EnumType.STRING)
	private FundingIsSuccess fundingIsSuccess;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "business_id", nullable = false)
	private Business business;

	@OneToMany(mappedBy = "funding", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<FundingTag> fundingTags;

	@OneToMany(mappedBy = "funding", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<FundingImage> fundingImages;

	@OneToMany(mappedBy = "funding", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<UserFunding> userFundings;

	@OneToMany(mappedBy = "funding", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Bookmark> bookmarks;

	@OneToMany(mappedBy = "funding", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Coupon> coupons;

	public void addFundingImage(FundingImage fundingImage){
		this.fundingImages.add(fundingImage);
		fundingImage.setFunding(this);
	}

	public void addFundingTag(FundingTag fundingTag){
		this.fundingTags.add(fundingTag);
		fundingTag.setFunding(this);
	}

	public void addUserFunding(Funding funding , User user){
		UserFunding userFunding = UserFunding.builder()
			.user(user)
			.funding(funding)
			.build();

		this.userFundings.add(userFunding);
		userFunding.setFunding(funding);
	}

	public boolean isApply(){
		if(this.fundingCurCount + 1 > this.fundingMaxLimit) return false;
		return true;
	}

	public boolean isMaxLimit(){
		if(this.fundingCurCount == this.fundingMaxLimit) return true;
		return false;
	}

	public void addMoneyForApply(){
		this.fundingTotalAmount += this.fundingDiscountPrice;
	}

	public void addCountForApply() {
		this.fundingCurCount += 1;
	}

	public void cancelFunding(){
		this.fundingTotalAmount -= this.fundingDiscountPrice;
		this.fundingCurCount -= 1;
	}

	public void changeFundingStatusByMaxApply(){
		this.fundingIsActive = FundingIsActive.INACTIVE;
		this.fundingIsSuccess = FundingIsSuccess.SUCCESS;
	}

	public void addFundingImage(String imageUrl){
		this.getFundingImages().add(
			FundingImage.builder()
				.funding(this)
				.fundingImgUrl(imageUrl)
				.build()
		);
	}

	public FundingResponseDto toFundingResponseDto(int bookemarkCount , Long businessId){
		return FundingResponseDto.builder()
			.title(fundingTitle)
			.businessId(businessId)
			.businessName(fundingBusinessName)
			.category(fundingCategory.name())
			.maxLimit(fundingMaxLimit)
			.minLimit(fundingMinLimit)
			.curCount(fundingCurCount)
			.menu(fundingMenu)
			.description(fundingDescription)
			.price(fundingPrice)
			.discountPrice(fundingDiscountPrice)
			.discountRate(fundingDiscountRate)
			.startDate(LocalDate.from(this.getCreatedDate()))
			.endDate(fundingEndDate)
			.fundingIsActive(fundingIsActive)
			.fundingIsSuccess(fundingIsSuccess)
			.bookmarkCount(bookemarkCount)
			.fundingTagResponseDtos(
					this.fundingTags
						.stream()
						.map(fundingTag -> fundingTag.toFundingTagResponseDto())
						.collect(Collectors.toList()))
			.fundingImageResponseDtos(
					this.fundingImages
						.stream()
						.map(fundingImage -> fundingImage.toFundingImageResponseDto())
						.collect(Collectors.toList())
			)
			.build();
	}

	public FundingListResponseDto toFundingListResponseDto() {
		return FundingListResponseDto.builder()
			.fundingId(fundingId)
			.title(fundingTitle)
			.businessName(fundingBusinessName)
			.category(fundingCategory.name())
			.maxLimit(fundingMaxLimit)
			.minLimit(fundingMinLimit)
			.curCount(fundingCurCount)
			.menu(fundingMenu)
			.price(fundingPrice)
			.discountPrice(fundingDiscountPrice)
			.discountRate(fundingDiscountRate)
			.startDate(LocalDate.from(this.getCreatedDate()))
			.endDate(fundingEndDate)
			.fundingIsActive(fundingIsActive)
			.fundingIsSuccess(fundingIsSuccess)
			.fundingImageResponseDtos(
				this.fundingImages
					.stream()
					.map(fundingImage -> fundingImage.toFundingImageResponseDto())
					.collect(Collectors.toList())
			)
			.build();
	}

	public FundingListResponseDto toFundingListResponseDtoForZzim(boolean isBookMark) {
		return FundingListResponseDto.builder()
			.fundingId(fundingId)
			.title(fundingTitle)
			.businessName(fundingBusinessName)
			.category(fundingCategory.name())
			.maxLimit(fundingMaxLimit)
			.minLimit(fundingMinLimit)
			.curCount(fundingCurCount)
			.menu(fundingMenu)
			.price(fundingPrice)
			.discountPrice(fundingDiscountPrice)
			.discountRate(fundingDiscountRate)
			.startDate(LocalDate.from(this.getCreatedDate()))
			.endDate(fundingEndDate)
			.fundingIsActive(fundingIsActive)
			.fundingIsSuccess(fundingIsSuccess)
			.fundingIsBookmark(isBookMark)
			.fundingImageResponseDtos(
				this.fundingImages
					.stream()
					.map(fundingImage -> fundingImage.toFundingImageResponseDto())
					.collect(Collectors.toList())
			)
			.build();
	}
}
