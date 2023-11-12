/* Import */
import Table from "@/components/common/table";
import TextBox from "@components/common/textBox";
import styled from "@emotion/styled";
import { useEffect } from "react";

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
    height: 285px;

    // Style Attribute
    border: 1px solid ${(props) => props.theme.colors.gray2};
    border-radius: 20px;
`;

// ----------------------------------------------------------------------------------------------------

/* Funding Store Tab Component */
function FundingStoreTab() {
    const { kakao } = window;
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
        "야미화니 커피",
        "야미화니 커피",
        "야미화니 커피",
        "야미화니 커피",
        "야미화니 커피",
        "야미화니 커피",
        "야미화니 커피",
        "야미화니 커피",
    ];

    const latitude = 33.450701;
    const longitude = 126.570667;
    useEffect(() => {
        kakao.maps.load(() => {
            const container = document.getElementById("map");
            const options = {
                center: new kakao.maps.LatLng(37.5012767241426, 127.039600248343),
            };
            const map = new kakao.maps.Map(container as HTMLElement, options);
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch("서울특별시 강남구 역삼동 테헤란로 212", (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(+result[0].y, +result[0].x);

                    const marker = new kakao.maps.Marker({
                        map,
                        position: coords,
                    });

                    const infowindow = new kakao.maps.InfoWindow({
                        content:
                            '<div style="width: 150px; padding: 6px 0; text-align: center; font-weight: 700">야미화니 커피</div>',
                    });
                    infowindow.open(map, marker);
                    map.setCenter(coords);
                }
            });
        });
    }, [latitude, longitude]);

    return (
        <StoreContainer>
            <TitleWrapper>야미화니 커피</TitleWrapper>
            <SubTitleWrapper>셀러의 다른 펀딩</SubTitleWrapper>
            <SubTitleWrapper>영업 정보</SubTitleWrapper>
            <InfoContainer>
                <Table
                    headerWidth="30%"
                    headers={businessInfoHeader}
                    contents={businessInfoContent}
                />
                <MapWrapper id="map" />
            </InfoContainer>
            <SubTitleWrapper>영업 안내</SubTitleWrapper>
            <TextBox text="야미화니 커피입니다. 만나서 반가워요! 저희는 280년 전통의 커피집이에요." />
        </StoreContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingStoreTab;
