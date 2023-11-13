/* Import */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/css";
import MainLayout from "@layouts/MainLayout";
import { ReactNode, useState } from "react";
import withAuth from "@libs/withAuth";
import SearchBar from "@components/composite/searchBar/SearchBar";
import { TextButton, ScrollButton } from "@components/common/button";
import Card from "@components/composite/card";
import { useRouter } from "next/router";
import { CheckBox, TextInput } from "@components/common/input";
import { GetServerSideProps } from "next";
import addressList from "@configs/addressList";
import menuCategoryList from "@configs/menuCategoryList";
import { searchFundings } from "@apis/fundings";
import { FundingType } from "@customTypes/apiProps";
import postBookmark from "@/apis/bookmark";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface SearchParams {
    keyword?: string | undefined;
    category?: string[] | undefined;
    address?: string[] | undefined;
    searchType?: string[] | undefined;
    sortType?: string | undefined;
    min?: number | undefined;
    max?: number | undefined;
}

interface SearchResultDataProps {
    searchResultData: FundingType[];
    keyword?: string | undefined;
    category?: string[] | undefined;
    address?: string[] | undefined;
    min?: number | undefined;
    max?: number | undefined;
    searchType?: string[] | undefined;
    sortType?: string | undefined;
    isLast: boolean;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const slideIn = keyframes`
  from {
      max-height: 50%;
      opacity: 0;
  }
  to {
      max-height: 100%;
      opacity: 1;
  }
`;

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

const SearchResultHeaderContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
`;

const ResultTitleContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    padding-bottom: 0.5em;
`;

const ResultKeywordWrapper = styled("span")`
    font-size: 26px;
    font-weight: 700;
`;

const SearchResultWrapper = styled("span")`
    font-size: 22px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.gray4};
`;

const ResultDescriptionWrapper = styled("span")`
    font-size: 16px;
    color: ${(props) => props.theme.colors.gray4};
`;

const ResultCountWrapper = styled("span")`
    font-weight: 700;
    color: black;
`;

const FilterButtonContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FilterContainer = styled("div")`
    width: 100%;
    /* height: 800px; */
`;

const FilterSlideInContainer = styled("div")<{ isFilterd: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding: 1em 0;

    border-bottom: 1px solid ${(props) => props.theme.colors.gray3};

    overflow: hidden;

    animation: ${slideIn} 0.3s ease-in-out;
`;

const FilterOneContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    width: 100%;

    padding: 1em 0;
`;

const FilterTitleWrapper = styled("span")`
    padding-bottom: 0.5em;

    font-size: 20px;
    font-weight: 700;
`;

const PriceRangeContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding: 2em 2em;
    box-sizing: border-box;

    border: 1px solid ${(props) => props.theme.colors.gray3};
    border-radius: 10px;
`;

const PriceRangeInputWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PriceInputContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const PriceLabeltWrapper = styled("label")`
    font-weight: 700;
`;

const PriceInputWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1em 2em;

    border: 1px solid ${(props) => props.theme.colors.gray3};
    border-radius: 10px;
`;

const PriceSpaceWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100px;

    font-size: 50px;
    font-weight: 300;
`;

const FilterBodyContainer = styled("div")`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1em;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding: 2em 2em;
    box-sizing: border-box;

    border: 1px solid ${(props) => props.theme.colors.gray3};
    border-radius: 10px;
`;

const SortContainer = styled("div")`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 100%;

    padding: 1em 0;
`;

const SortButtonWrapper = styled("div")<{ isSelected: boolean }>`
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
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    max-width: 1080px;

    padding: 1em 0;
`;

const SearchCardWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NoSearchResultWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    width: 100%;
    min-height: 300px;

    font-size: 30px;
    font-weight: 700;
`;

const MoreButtonWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding-top: 2em;
`;

// ----------------------------------------------------------------------------------------------------

/* Server Side Rendering */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // States and Variables
    const { keyword, category, address, min, max, searchType, sortType } =
        context.query as SearchParams;

    const result = await searchFundings({
        keyword,
        category,
        address,
        min,
        max,
        searchType,
        sortType,
        page: 0,
    });
    const searchResultData = result.data.content || [];
    const isLast = result.data.last;

    return {
        props: {
            searchResultData,
            keyword,
            category,
            address,
            min,
            max,
            searchType,
            sortType,
            isLast,
        },
    };
};

// ----------------------------------------------------------------------------------------------------

/* Search Component */
function Search({
    searchResultData,
    keyword,
    category,
    address,
    min,
    max,
    searchType,
    sortType,
    isLast,
}: SearchResultDataProps) {
    const router = useRouter();
    const sortList = [
        { type: "POPULARITY", text: "👍 인기 대박" },
        { type: "CLOSING_SOON", text: "⏰ 마감 임박" },
        { type: "LOW_PRICE", text: "💸 저렴한 가격" },
        { type: "HIGH_DISCOUNT_RATE", text: "📈 높은 할인율" },
    ];

    const [filterTypes, setFilterTypes] = useState(
        [
            { value: "BUSINESS_NAME", text: "상호명", isChecked: false },
            { value: "FUNDING_MENU", text: "펀딩 메뉴", isChecked: false },
            { value: "FUNDING_TAG", text: "검색용 태그", isChecked: false },
        ].map((one) => ({
            ...one,
            isChecked: (searchType && searchType.includes(one.value)) || false,
        })),
    );

    const [filterCategory, setFilterCategory] = useState(
        menuCategoryList.map((one) => ({
            ...one,
            isChecked: (category && category.includes(one.value)) || false,
        })),
    );

    const [filterAddress, setFilterAddress] = useState(
        addressList.map((one) => ({
            address: one,
            isChecked: (address && address.includes(one)) || false,
        })),
    );

    const [fundingDatas, setFundingDatas] = useState<FundingType[]>(searchResultData);
    const [isFilterd, setIsFiltered] = useState<boolean>(false);
    const [isSelectedSort, setIsSelectedSort] = useState<string>(sortType || "POPULARITY");
    const [pageNum, setPageNum] = useState(1);
    const [isLastPage, setIsLastPage] = useState(isLast);
    const [minMoney, setMinMoney] = useState(min);
    const [maxMoney, setMaxMoney] = useState(max);

    const handleSort = (type: string) => {
        searchFundings({
            keyword,
            category,
            address,
            min,
            max,
            searchType,
            sortType: type,
            page: 0,
        }).then((res) => {
            if (res.statusCode === 200) {
                setFundingDatas(res.data.content);
                setIsSelectedSort(type);
                setPageNum(1);
            }
        });
    };

    const handleCard = (fundingId: number) => {
        router.push(`/fundings/${fundingId}`);
    };

    const handleBookmark = (fundingId: number) => {
        postBookmark(fundingId.toString()).then((res) => {
            if (res.statusCode === 200) {
                const updatedFundingDatas = fundingDatas.map((data) => {
                    if (data.fundingId === fundingId) {
                        return { ...data, fundingIsBookmark: !data.fundingIsBookmark };
                    }
                    return data;
                });
                setFundingDatas(updatedFundingDatas);
            }
        });
    };

    const handleMoreButton = () => {
        if (!isLastPage) {
            searchFundings({
                keyword,
                category,
                address,
                min,
                max,
                searchType,
                sortType,
                page: pageNum,
            }).then((res) => {
                if (res.data.last) {
                    setIsLastPage(true);
                }
                setFundingDatas((prev) => {
                    return [...prev, res.data.content];
                });
                setPageNum((prev) => prev + 1);
            });
        }
    };

    const changeMinMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d+$/.test(newValue) || newValue === "") {
            setMinMoney(parseFloat(newValue));
        }
    };

    const changeMaxMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d+$/.test(newValue) || newValue === "") {
            setMaxMoney(parseFloat(newValue));
        }
    };

    const handleFilteredSearch = () => {
        router.push(`/search`);
        searchFundings({
            keyword,
            category: filterCategory.filter((one) => one.isChecked).map((one) => one.value),
            address: filterAddress.filter((one) => one.isChecked).map((one) => one.address),
            min: minMoney,
            max: maxMoney,
            searchType: filterTypes.filter((one) => one.isChecked).map((one) => one.value),
            sortType: isSelectedSort,
            page: 0,
        }).then((res) => {
            if (res.statusCode === 200) {
                if (res.data.last) {
                    setIsLastPage(true);
                }
                setFundingDatas(res.data.content);
                setPageNum(1);
            }
        });
    };

    return (
        <SearchPageWrapper>
            <MainContentsContainer>
                <SearchBar />
                <SearchResultContainer>
                    <SearchHeaderContainer>
                        <SearchResultHeaderContainer>
                            <ResultTitleContainer>
                                <ResultKeywordWrapper>커피</ResultKeywordWrapper>
                                <SearchResultWrapper>&nbsp; 검색 결과</SearchResultWrapper>
                            </ResultTitleContainer>
                            <ResultDescriptionWrapper>
                                총 <ResultCountWrapper>125건</ResultCountWrapper>의 결과가
                                검색되었어요!
                            </ResultDescriptionWrapper>
                        </SearchResultHeaderContainer>
                        <FilterButtonContainer>
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
                        </FilterButtonContainer>
                    </SearchHeaderContainer>
                    {isFilterd && (
                        <FilterContainer>
                            <FilterSlideInContainer isFilterd={isFilterd}>
                                <FilterOneContainer>
                                    <FilterTitleWrapper>검색 조건</FilterTitleWrapper>
                                    <FilterBodyContainer>
                                        {filterTypes.map((filter) => (
                                            <CheckBox
                                                key={`${filter.text}`}
                                                text={filter.text}
                                                width="100%"
                                                fontSize="14px"
                                                id={`${filter.text}`}
                                                isChecked={filter.isChecked}
                                                onToggle={() => {
                                                    const filterIdx = filterTypes.findIndex(
                                                        (item) => item.value === filter.value,
                                                    );
                                                    const updatedTypess = [...filterTypes];
                                                    updatedTypess[filterIdx].isChecked =
                                                        !filterTypes[filterIdx].isChecked;
                                                    setFilterTypes(updatedTypess);
                                                }}
                                            />
                                        ))}
                                    </FilterBodyContainer>
                                </FilterOneContainer>
                                <FilterOneContainer>
                                    <FilterTitleWrapper>메뉴 카테고리</FilterTitleWrapper>
                                    <FilterBodyContainer>
                                        {filterCategory.map((filter) => (
                                            <CheckBox
                                                key={`${filter.value}`}
                                                text={filter.value}
                                                width="100%"
                                                fontSize="14px"
                                                id={`${filter.value}`}
                                                isChecked={filter.isChecked}
                                                onToggle={() => {
                                                    const filterIdx = filterCategory.findIndex(
                                                        (item) => item.value === filter.value,
                                                    );
                                                    const updatedCategorys = [...filterCategory];
                                                    updatedCategorys[filterIdx].isChecked =
                                                        !filterCategory[filterIdx].isChecked;
                                                    setFilterCategory(updatedCategorys);
                                                }}
                                            />
                                        ))}
                                    </FilterBodyContainer>
                                </FilterOneContainer>
                                <FilterOneContainer>
                                    <FilterTitleWrapper>펀딩 지역</FilterTitleWrapper>
                                    <FilterBodyContainer>
                                        {filterAddress.map((filter) => (
                                            <CheckBox
                                                key={`${filter.address}`}
                                                text={filter.address}
                                                width="100%"
                                                fontSize="14px"
                                                id={`${filter.address}`}
                                                isChecked={filter.isChecked}
                                                onToggle={() => {
                                                    const filterIdx = filterAddress.findIndex(
                                                        (item) => item.address === filter.address,
                                                    );
                                                    const updatedAddresss = [...filterAddress];
                                                    updatedAddresss[filterIdx].isChecked =
                                                        !filterAddress[filterIdx].isChecked;
                                                    setFilterAddress(updatedAddresss);
                                                }}
                                            />
                                        ))}
                                    </FilterBodyContainer>
                                </FilterOneContainer>
                                <FilterOneContainer>
                                    <FilterTitleWrapper>펀딩 가격</FilterTitleWrapper>

                                    <PriceRangeContainer>
                                        <PriceRangeInputWrapper>
                                            <PriceInputContainer>
                                                <PriceLabeltWrapper htmlFor="min-money">
                                                    최저가
                                                </PriceLabeltWrapper>
                                                <PriceInputWrapper>
                                                    <TextInput
                                                        value={minMoney?.toString() || ""}
                                                        width="150px"
                                                        height="40px"
                                                        id="min-money"
                                                        onChange={(e) => changeMinMoney(e)}
                                                    />
                                                </PriceInputWrapper>
                                            </PriceInputContainer>
                                            <PriceSpaceWrapper>∼</PriceSpaceWrapper>
                                            <PriceInputContainer>
                                                <PriceLabeltWrapper htmlFor="max-money">
                                                    최고가
                                                </PriceLabeltWrapper>
                                                <PriceInputWrapper>
                                                    <TextInput
                                                        value={maxMoney?.toString() || ""}
                                                        width="150px"
                                                        height="40px"
                                                        id="max-money"
                                                        onChange={(e) => changeMaxMoney(e)}
                                                    />
                                                </PriceInputWrapper>
                                            </PriceInputContainer>
                                        </PriceRangeInputWrapper>
                                    </PriceRangeContainer>
                                </FilterOneContainer>
                                <TextButton
                                    colorType="secondary"
                                    text="상세 검색"
                                    width="300px"
                                    onClick={handleFilteredSearch}
                                />
                            </FilterSlideInContainer>
                        </FilterContainer>
                    )}
                    <SortContainer>
                        {sortList.map((sort) => (
                            <SortButtonWrapper
                                key={`sort-${sort.type}`}
                                isSelected={isSelectedSort === sort.type}
                                onClick={() => handleSort(sort.type)}
                            >
                                {sort.text}
                            </SortButtonWrapper>
                        ))}
                    </SortContainer>
                    {fundingDatas && fundingDatas.length > 0 ? (
                        <>
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
                            </SearchBodyContainer>
                            {!isLastPage && (
                                <MoreButtonWrapper>
                                    <TextButton
                                        text="더 보기"
                                        width="400px"
                                        height="50px"
                                        colorType="secondary"
                                        curve="round"
                                        fontSize={20}
                                        onClick={handleMoreButton}
                                    />
                                </MoreButtonWrapper>
                            )}
                        </>
                    ) : (
                        <NoSearchResultWrapper>검색 결과가 없습니다.</NoSearchResultWrapper>
                    )}
                </SearchResultContainer>
            </MainContentsContainer>
            <ScrollButton width="40px" />
        </SearchPageWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const SignInWithAuth = withAuth({ WrappedComponent: Search });

// ----------------------------------------------------------------------------------------------------

/* Layout */

SignInWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SignInWithAuth;
