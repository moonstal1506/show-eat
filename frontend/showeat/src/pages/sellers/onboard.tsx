/* Import */
import SellerLayout from "@layouts/SellerLayout";
import Card from "@components/composite/card";
import withAuth from "@libs/withAuth";
import { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { TextButton, ScrollButton } from "@components/common/button";
import { getActiveFunding } from "@/apis/fundings";
// ----------------------------------------------------------------------------------------------------

/* Style */
const FavoritesContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-width: 478px;
    height: 100%;

    padding-bottom: 2em;
    margin: 0;
`;

const TitleWrapper = styled("span")`
    font-size: 40px;
    font-weight: 700;

    padding: 1em;
`;

const CardsContainer = styled("div")`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5em;

    @media (max-width: 1260px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 3em;
    }

    @media (max-width: 830px) {
        grid-template-columns: repeat(1, 1fr);
        gap: 2em;
    }
`;

const MoreButtonWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding-top: 3em;
`;

/* Seller On Boarding Fundings Page */
function OnBoardingFunding() {
    const [fundingData, setFundingData] = useState([]);
    const [page, setPage] = useState(0);
    const state = "ACTIVE";
    const [last, setLast] = useState(false);

    const handleLoadMore = () => {
        setPage(page + 1); // 더보기 : 페이지 + 1
    };

    const fetchFundingData = () => {
        getActiveFunding(page, state).then((data) => {
            console.log("data", data);
            console.log("data.content", data.data);
            console.log("data.data.content", data.data.content);

            if (data.data.content && data.data.content.length > 0) {
                if (page === 0) {
                    const modifiedData = data.data.content.map((funding) => ({
                        ...funding,
                        fundingImageResponseDtos: funding.fundingImageResponseDtos,
                    }));
                    setFundingData(modifiedData);
                    console.log("modifiedData", modifiedData);
                    setLast(data.data.last);
                } else {
                    const updatedData = data.data.content.map((funding) => ({
                        ...funding,
                        fundingImageResponseDtos: funding.fundingImageResponseDtos,
                    }));
                    setFundingData([...fundingData, ...updatedData]);
                    setLast(data.data.last);
                }
            } else {
                console.log("No funding data available.");
            }
        });
    };

    useEffect(() => {
        fetchFundingData();
    }, [page]);
    return (
        <FavoritesContainer>
            <TitleWrapper>진행중인 목록</TitleWrapper>
            {fundingData.length === 0 ? (
                <CardsContainer>진행중인 펀딩이 없습니다.</CardsContainer>
            ) : (
                <CardsContainer>
                    {fundingData.map((funding) => (
                        <Card key={funding.fundingId} fundingData={funding} />
                    ))}
                </CardsContainer>
            )}
            {!last ? (
                <MoreButtonWrapper>
                    <TextButton
                        text="더 보기"
                        width="400px"
                        height="50px"
                        colorType="secondary"
                        curve="round"
                        fontSize={20}
                        onClick={() => handleLoadMore()}
                    />
                </MoreButtonWrapper>
            ) : null}
            <ScrollButton width="40px" height="40px" />
        </FavoritesContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const OnBoardingFundingWithAuth = withAuth({
    WrappedComponent: OnBoardingFunding,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
OnBoardingFundingWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default OnBoardingFundingWithAuth;
