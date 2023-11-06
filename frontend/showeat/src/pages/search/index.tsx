/* Import */
// import Head from "next/head";
import styled from "@emotion/styled";
import MainLayout from "@layouts/MainLayout";
import {
    ReactNode,
    useState,
    //  useEffect,
} from "react";
import SearchBar from "@/components/searchBar/SearchBar";
import { TextButton } from "@/components/common/button";
import Card from "@/components/card";
import { useRouter } from "next/router";
// import useUserState from "@hooks/useUserState";

// ----------------------------------------------------------------------------------------------------

const fundingDatas = [
    {
        fundingId: 1,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1324,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 1,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1324,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 1,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1324,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 1,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1324,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
];

// ----------------------------------------------------------------------------------------------------

const SearchPageWrapper = styled("div")`
    display: flex;
    justify-content: center;
`;

const MainContentsContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 1080px;

    padding: 4em 0em;
`;

const SearchResultContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-top: 4em;
`;

const SearchHeaderContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;

    padding-bottom: 0.5em;

    border-bottom: 1px solid ${(props) => props.theme.colors.gray3};
`;

const SearchHeaderResultContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
`;

const SearchResultTitleContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    padding-bottom: 0.5em;
`;

const SearchResultKeywordWrapper = styled("span")`
    font-size: 26px;
    font-weight: 700;
`;

const SearchResultWrapper = styled("span")`
    font-size: 22px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.gray4};
`;

const SearchResultDescriptionWrapper = styled("span")`
    font-size: 16px;
    color: ${(props) => props.theme.colors.gray4};
`;

const SearchResultCountWrapper = styled("span")`
    font-weight: 700;
    color: black;
`;

const SearchFilterButtonContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SearchFilterConatiner = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding: 2em 0;

    border-bottom: 1px solid ${(props) => props.theme.colors.gray3};
`;

const SearchSortContainer = styled("div")`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 100%;

    padding: 1em 0;
`;

const SearchSortButtonWrapper = styled("div")<{ isSelected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0 1em;

    font-size: 16px;
    font-weight: ${(props) => props.isSelected && 700};
    color: ${(props) => !props.isSelected && props.theme.colors.gray4};

    cursor: pointer;
`;

const SearchBodyContainer = styled("div")`
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 한 줄에 4개의 컨텐츠 열을 만듭니다 */
    gap: 20px; /* 컨텐츠 사이의 간격 설정 (예: 16px) */

    max-width: 1080px;

    padding: 1em 0;
`;

const SearchCardWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Search() {
    const sortList = [
        { type: "POPULARITY", text: "👍 인기 대박" },
        { type: "CLOSING_SOON", text: "⏰ 마감 임박" },
        { type: "LOW_PRICE", text: "💸 저렴한 가격" },
        { type: "HIGH_DISCOUNT_RATE", text: "📈 높은 할인율" },
        // { text: "😍 높은 재방문율" },
    ];

    const router = useRouter();

    const [isFilterd, setIsFiltered] = useState(false);
    const [isSelectedSort, setIsSelectedSort] = useState<string>("POPULARITY");

    const handleSort = (type: string) => {
        setIsSelectedSort(type);
    };

    const handleCard = (fundingId: number) => {
        router.push(`/fundings/${fundingId}`);
    };

    const handleBookmark = (fundingId: number) => {
        // postBookmark(fundingId);
        console.log(fundingId);
    };

    return (
        <SearchPageWrapper>
            <MainContentsContainer>
                <SearchBar />
                <SearchResultContainer>
                    <SearchHeaderContainer>
                        <SearchHeaderResultContainer>
                            <SearchResultTitleContainer>
                                <SearchResultKeywordWrapper>커피</SearchResultKeywordWrapper>
                                <SearchResultWrapper>&nbsp; 검색 결과</SearchResultWrapper>
                            </SearchResultTitleContainer>
                            <SearchResultDescriptionWrapper>
                                총 <SearchResultCountWrapper>125건</SearchResultCountWrapper>의
                                결과가 검색되었어요!
                            </SearchResultDescriptionWrapper>
                        </SearchHeaderResultContainer>
                        <SearchFilterButtonContainer>
                            {!isFilterd ? (
                                <TextButton
                                    text="필터링"
                                    width="150px"
                                    fill="negative"
                                    colorType="secondary"
                                    onClick={() => setIsFiltered(true)}
                                />
                            ) : (
                                <TextButton
                                    text="필터링"
                                    width="150px"
                                    fill="positive"
                                    colorType="secondary"
                                    onClick={() => setIsFiltered(false)}
                                />
                            )}
                        </SearchFilterButtonContainer>
                    </SearchHeaderContainer>
                    {isFilterd && <SearchFilterConatiner>필터링</SearchFilterConatiner>}
                    <SearchSortContainer>
                        {sortList.map((sort) => (
                            <SearchSortButtonWrapper
                                key={`sort-${sort.type}`}
                                isSelected={isSelectedSort === sort.type}
                                onClick={() => handleSort(sort.type)}
                            >
                                {sort.text}
                            </SearchSortButtonWrapper>
                        ))}
                    </SearchSortContainer>
                    <SearchBodyContainer>
                        {fundingDatas.map((data, idx) => (
                            <SearchCardWrapper key={`${data.title}-${idx}`}>
                                <Card
                                    fundingData={data}
                                    onFundingClick={() => handleCard(data.fundingId)}
                                    onBookmark={() => handleBookmark(data.fundingId)}
                                />
                            </SearchCardWrapper>
                        ))}
                        <div>무한 스크롤 용 버튼</div>
                    </SearchBodyContainer>
                </SearchResultContainer>
            </MainContentsContainer>
        </SearchPageWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Layout */
Search.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Search;
