package com.ssafy.showeat.domain.funding.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.showeat.IntegrationTestSupport;
import com.ssafy.showeat.domain.business.entity.Business;
import com.ssafy.showeat.domain.business.entity.BusinessMenu;
import com.ssafy.showeat.domain.business.entity.BusinessMenuImage;
import com.ssafy.showeat.domain.business.repository.BusinessMenuRepository;
import com.ssafy.showeat.domain.business.repository.BusinessRepository;
import com.ssafy.showeat.domain.funding.dto.request.CreateFundingRequestDto;
import com.ssafy.showeat.domain.funding.dto.request.MenuRequestDto;
import com.ssafy.showeat.domain.funding.entity.Funding;
import com.ssafy.showeat.domain.funding.repository.FundingRepository;
import com.ssafy.showeat.domain.user.entity.Credential;
import com.ssafy.showeat.domain.user.entity.CredentialRole;
import com.ssafy.showeat.domain.user.entity.User;
import com.ssafy.showeat.domain.user.repository.CredentialRepository;

class FundingServiceImplTest extends IntegrationTestSupport {

	@Autowired
	private FundingService fundingService;

	@Autowired
	private FundingRepository fundingRepository;

	@Autowired
	private BusinessRepository businessRepository;

	@Autowired
	private CredentialRepository credentialRepository;

	@Autowired
	private BusinessMenuRepository businessMenuRepository;

	@Test
	@Transactional
	@DisplayName("펀딩을 생성합니다.")
	void 펀딩생성(){
	    // given
		MenuRequestDto menuDto1 = MenuRequestDto.builder()
			.menuId(1L)
			.discountPrice(2000)
			.build();

		MenuRequestDto menuDto2 = MenuRequestDto.builder()
			.menuId(2L)
			.discountPrice(1000)
			.build();

		CreateFundingRequestDto dto = CreateFundingRequestDto
			.builder()
			.title("테스트")
			.description("테스트입니다.")
			.category("한식")
			.maxLimit(10)
			.minLimit(5)
			.tags(List.of("tag1","tag2"))
			.endDate(LocalDate.now())
			.menuRequestDtos(List.of(menuDto1,menuDto2))
			.build();

		Business business = SaveBusinessMenu();
		BusinessMenu businessMenu = businessMenuRepository.findById(1L).get();

		// when
		Funding save = fundingRepository.save(dto.createFunding(business, businessMenu, menuDto1.getDiscountPrice()));

		// then
		assertThat(save.getFundingTitle()).isEqualTo("테스트");
		assertThat(save.getFundingCategory()).isEqualTo("한식");
		assertThat(save.getFundingMenu()).isEqualTo("메뉴1");
		assertThat(save.getFundingDiscountPrice()).isEqualTo(2000);
		assertThat(save.getFundingTags()).hasSize(2)
			.extracting("fundingTag")
			.containsExactlyInAnyOrder("tag1","tag2");
		assertThat(save.getFundingImages()).hasSize(2)
			.extracting("fundingImgUrl")
			.containsExactlyInAnyOrder("img1","img2");
	}

	private Business SaveBusinessMenu(){
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

		credentialRepository.save(credential1);
		return businessRepository.save(business);
	}

}