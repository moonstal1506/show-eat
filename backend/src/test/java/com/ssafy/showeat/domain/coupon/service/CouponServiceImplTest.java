package com.ssafy.showeat.domain.coupon.service;

import java.time.LocalDate;
import java.util.ArrayList;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.showeat.IntegrationTestSupport;
import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.business.entity.BusinessMenu;
import com.ssafy.showeat.domain.business.entity.BusinessMenuImage;
import com.ssafy.showeat.domain.business.repository.BusinessRepository;
import com.ssafy.showeat.domain.coupon.repository.CouponRepository;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.funding.entity.FundingCategory;
import com.ssafy.showeat.domain.funding.entity.FundingIsActive;
import com.ssafy.showeat.domain.funding.entity.FundingIsSuccess;
import com.ssafy.showeat.domain.funding.repository.FundingRepository;
import com.ssafy.showeat.domain.user.entity.Credential;
import com.ssafy.showeat.domain.user.entity.CredentialRole;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.CredentialRepository;
import com.ssafy.showeat.domain.user.repository.UserRepository;

public class CouponServiceImplTest extends IntegrationTestSupport {

	@Autowired
	private CouponService couponService;

	@Autowired
	private CouponRepository couponRepository;

	@Autowired
	private FundingRepository fundingRepository;

	@Autowired
	private BusinessRepository businessRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CredentialRepository credentialRepository;

	@Test
	@Transactional
	@DisplayName("쿠폰ID를 이용해 쿠폰의 상세 정보를 조회합니다")
	void testGetCouponDetailByCouponId() {

	    // given

	    // when

	    // then

	}



	private Funding createFunding(FundingIsActive fundingIsActive){
		Business business = SaveBusinessMenu();
		return Funding.builder()
			.fundingTitle("맛있는 과자에요")
			.fundingMaxLimit(100)
			.fundingMinLimit(10)
			.fundingCurCount(0)
			.userFundings(new ArrayList<>())
			.fundingDiscountPrice(3000)
			.fundingDiscountRate(10)
			.fundingMenu("과자")
			.fundingPrice(10000)
			.fundingTotalAmount(0)
			.fundingCategory(FundingCategory.KOREAN)
			.fundingDescription("설명")
			.fundingEndDate(LocalDate.now())
			.fundingIsActive(fundingIsActive)
			.fundingIsSuccess(FundingIsSuccess.SUCCESS)
			.business(business)
			.build();
	}


	private User createUser(){
		Credential credential1 =
			Credential.builder()
				.credentialId("qqq")
				.email("qwe@qwe.com")
				.credentialRole(CredentialRole.USER)
				.credentialSocialPlatform("kakao")
				.build();

		User user1 = User.builder()
			.userNickname("테스트1")
			.userImgUrl("profileimg")
			.userAddress("addr")
			.userBusiness(true)
			.userMoney(10000)
			.credential(credential1)
			.build();

		credentialRepository.save(credential1);
		return userRepository.save(user1);
	}

	private Business SaveBusinessMenu(){
		User user1 = createUser();

		BusinessMenuImage businessMenuImage1 = BusinessMenuImage.builder()
			.businessMenuImageUrl("img1")
			.build();

		BusinessMenuImage businessMenuImage2 = BusinessMenuImage.builder()
			.businessMenuImageUrl("img2")
			.build();

		BusinessMenuImage businessMenuImage3 = BusinessMenuImage.builder()
			.businessMenuImageUrl("img3")
			.build();
		BusinessMenuImage businessMenuImage4 = BusinessMenuImage.builder()
			.businessMenuImageUrl("img4")
			.build();

		// 업체 메뉴
		BusinessMenu businessMenu1 = BusinessMenu.builder()
			.businessMenuName("메뉴1")
			.businessMenuPrice(5000)
			.businessMenuImages(new ArrayList<>())
			.build();

		BusinessMenu businessMenu2 = BusinessMenu.builder()
			.businessMenuName("메뉴2")
			.businessMenuPrice(6000)
			.businessMenuImages(new ArrayList<>())
			.build();

		businessMenu1.addBusinessMenuImage(businessMenuImage1);
		businessMenu1.addBusinessMenuImage(businessMenuImage2);
		businessMenu2.addBusinessMenuImage(businessMenuImage3);
		businessMenu2.addBusinessMenuImage(businessMenuImage4);

		// 업체
		Business business = Business.builder()
			.businessName("카우카우")
			.businessBio("bio")
			.businessImgUrl("imgurl")
			.businessPhone("01012341234")
			.businessCeo("테스트1")
			.businessEmail("qwe@qwe.com")
			.businessMoney(10000)
			.businessFundingCount(10)
			.businessSupporterCount(10)
			.businessAddress("주소")
			.bankBookUrl("aaa")
			.businessAccount("zzz")
			.businessRegistrationUrl("zbcb")
			.businessSupporterCount(5)
			.businessAccountHolder("zxczxc")
			.businessMenus(new ArrayList<>())
			.user(user1)
			.build();

		business.addBusinessMenu(businessMenu1);
		business.addBusinessMenu(businessMenu2);

		return businessRepository.save(business);
	}
}
