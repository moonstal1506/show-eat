/* Import */
import Table from "@components/common/table";
// import { CardCarousel } from "@components/composite/carousel";
import { BusinessType, FundingType } from "@customTypes/apiProps";
import TextBox from "@components/common/textBox";
import styled from "@emotion/styled";
import { useEffect } from "react";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface FundingStoreTabProps {
    businessData: BusinessType;
    fundingData: FundingType[];
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const StoreContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    // Box Model Attribute
    width: 100%;
`;

const TitleWrapper = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: center;

    // Box Model Attribute
    width: 100%;
    min-height: 170px;
    box-sizing: border-box;

    // Style Attribute
    background-image: url("/assets/images/business-title-bg.svg");
    background-size: 100%;
    background-repeat: no-repeat;

    // Text Attribute
    font-size: 30px;
    font-weight: 900;
`;

const SubTitleWrapper = styled("div")`
    // Box Model Attribute
    width: 100%;
    margin-top: 2em;
    margin-bottom: 1em;

    // Text Attribute
    font-size: 24px;
    font-weight: 700;
`;

const CarouselWrapper = styled("div")`
    // Layout Attribute
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InfoContainer = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: center;

    // Box Model Attribute
    width: 100%;
`;

const MapWrapper = styled("div")`
    // Box Model Attribute
    width: 100%;
    height: 420px;

    // Style Attribute
    border: 1px solid ${(props) => props.theme.colors.gray2};
    border-radius: 20px;
`;

// ----------------------------------------------------------------------------------------------------

/* Funding Store Tab Component */
function FundingStoreTab(props: FundingStoreTabProps) {
    // States and Variables
    const { kakao } = window;
    const { businessData, fundingData } = props;
    const {
        businessAddress,
        businessBio,
        businessCeo,
        businessClosedDays,
        businessEmail,
        businessName,
        businessNumber,
        businessOperatingTime,
        businessPhone,
    } = businessData;
    const businessInfoHeader: string[] = [
        "상호명",
        "운영시간",
        "휴무일",
        "연락처",
        "주소",
        "대표자명",
        "대표자 이메일",
        "사업자 등록번호",
    ];
    const businessInfoContent: string[] = [
        businessName,
        businessOperatingTime,
        businessClosedDays,
        `${businessPhone}`,
        businessAddress,
        businessCeo,
        businessEmail,
        `${businessNumber}`,
    ];

    console.log(fundingData);

    // Function for Loading Kakao Map API
    useEffect(() => {
        kakao.maps.load(() => {
            const geocoder = new kakao.maps.services.Geocoder();
            const mapContainer = document.getElementById("map");
            const options = {
                center: new kakao.maps.LatLng(37.5012, 127.0396),
            };
            const sellerMap = new kakao.maps.Map(mapContainer as HTMLElement, options);

            geocoder.addressSearch(businessAddress, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const newLocation = new kakao.maps.LatLng(+result[0].y, +result[0].x);
                    const marker = new kakao.maps.Marker({
                        map: sellerMap,
                        position: newLocation,
                    });
                    const infoWindow = new kakao.maps.InfoWindow({
                        content: `<div style="width: 150px; padding: 6px 0; text-align: center; font-weight: 700">${businessName}</div>`,
                    });
                    infoWindow.open(sellerMap, marker);
                    sellerMap.setCenter(newLocation);
                }
            });
        });
    }, []);

    return (
        <StoreContainer>
            <TitleWrapper>{businessName}</TitleWrapper>
            <CarouselWrapper>
                {/* <CardCarousel width={960} height={400} cardList={fundingData} /> */}
            </CarouselWrapper>
            <SubTitleWrapper>셀러의 다른 펀딩</SubTitleWrapper>
            <SubTitleWrapper>영업 정보</SubTitleWrapper>
            <InfoContainer>
                <Table
                    headerWidth="30%"
                    headers={businessInfoHeader}
                    contents={businessInfoContent}
                    gap="1em"
                />
                <MapWrapper id="map" />
            </InfoContainer>
            <SubTitleWrapper>영업 안내</SubTitleWrapper>
            <TextBox text={businessBio} />
        </StoreContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingStoreTab;
