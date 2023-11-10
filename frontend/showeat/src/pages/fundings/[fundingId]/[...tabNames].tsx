/* Import */
import { fundingTabMenuConfig } from "@configs/tabMenuConfig";
import { getFundingDetail } from "@apis/fundings";
import { GetServerSideProps } from "next";
import { ReactNode, useState } from "react";
import MainLayout from "@layouts/MainLayout";
import styled from "@emotion/styled";
import { Tab, TabBar } from "@components/composite/tabBar";
import { TagButton, TextButton } from "@components/common/button";
import TextBox from "@components/common/textBox";
import { useRouter } from "next/router";
import withAuth from "@libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface FundingParams {
    fundingId?: string;
    tabNames?: string[];
}

interface FundingTabProps {
    fundingId: string;
    tabName: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const FundingContainer = styled("div")`
    width: 100vw;
    box-sizing: border-box;
    padding: 5em 10em;
`;

const DetailContainer = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2em;

    // Box Model Attribute
    margin-bottom: 5em;
`;

const ImageContainer = styled("div")`
    // Box Model Attribute
    width: 50%;
`;

const DetailBox = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;

    // Box Model Attribute
    width: 50%;
`;

const InfoHeaderContainer = styled("div")``;

const CategoryWrapper = styled("div")``;

const TitleWrapper = styled("div")``;

const TagContainer = styled("div")``;

const InfoContentContainer = styled("div")``;

const PriceContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    gap: 1em;

    // Box Model Attribute
    width: 100%;
`;

const OriginalPriceWrapper = styled("div")`
    // Box Model Attribute
    width: 100%;

    // Text Attribute
    font-size: 20px;
    color: ${(props) => props.theme.colors.gray4};
    text-decoration: line-through;
    text-align: right;
`;

const FundingPriceBox = styled("div")`
    // Layout Attribute
    display: flex;
    justify-content: space-between;

    // Box Model Attribute
    width: 100%;
`;

const FundingPriceWrapper = styled("div")`
    // Text Attribute
    font-size: 30px;
    font-weight: 900;
`;

const ButtonContainer = styled("div")`
    // Layout Attribute
    display: flex;
    justify-content: space-between;

    // Box Model Attribute
    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

/* Server Side Rendering */
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // States and Variables
    const { fundingId, tabNames } = params as FundingParams;
    const allowedTabNames = fundingTabMenuConfig.map((tab) => tab.id);

    if (!fundingId || !tabNames || !allowedTabNames.includes(tabNames[0])) {
        return {
            redirect: {
                destination: "/error/not-found",
                permanent: false,
            },
        };
    }

    getFundingDetail(fundingId).then((result) => {
        console.log(result);
        console.log("대체 왜?");
    });

    return {
        props: {
            fundingId,
            tabName: tabNames?.[0],
        },
    };
};

// ----------------------------------------------------------------------------------------------------

/* Funding Tab Page */
function FundingTab(props: FundingTabProps) {
    // States and Variables
    const router = useRouter();
    const { fundingId, tabName } = props;
    const [activeTab, setActiveTab] = useState<string>(tabName || "store");

    // Function for Handling Tab Click
    const handleTabClick = (id: string, redirectUrl: string) => {
        const newRedirectUrl = redirectUrl.replace("[fundingId]", `${fundingId}`);
        setActiveTab(id);
        router.push(newRedirectUrl, undefined, { shallow: true });
    };

    return (
        <FundingContainer>
            <DetailContainer>
                <ImageContainer>이미지</ImageContainer>
                <DetailBox>
                    <InfoHeaderContainer>
                        <CategoryWrapper>카페/디저트 | 카페라떼</CategoryWrapper>
                        <TitleWrapper>타이틀임다</TitleWrapper>
                        <TagContainer>태그들</TagContainer>
                    </InfoHeaderContainer>
                    <InfoContentContainer>내용</InfoContentContainer>
                    <TextBox text="fuck" />
                    <PriceContainer>
                        <OriginalPriceWrapper>원래 가격</OriginalPriceWrapper>
                        <FundingPriceBox>
                            <TagButton width="10%" tagDescription="20% 할인" />
                            <FundingPriceWrapper>펀딩 가격</FundingPriceWrapper>
                        </FundingPriceBox>
                    </PriceContainer>
                    <ButtonContainer>
                        <TextButton width="45%" text="펀딩 참여" />
                        <TextButton width="25%" text="좋아요 수" fill="negative" />
                        <TextButton width="25%" text="공유" fill="negative" />
                    </ButtonContainer>
                </DetailBox>
            </DetailContainer>
            <TabBar>
                {fundingTabMenuConfig.map((tab) => (
                    <Tab
                        key={tab.id}
                        width="30%"
                        labelText={tab.labelText}
                        isActive={activeTab === tab.id}
                        onClick={() => handleTabClick(tab.id, tab.redirectUrl)}
                    />
                ))}
            </TabBar>
            <div>{activeTab === "store" ? <div>상점</div> : <div>리뷰</div>}</div>
        </FundingContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const FundingTabWithAuth = withAuth({ WrappedComponent: FundingTab });

// ----------------------------------------------------------------------------------------------------

/* Layout */
FundingTabWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingTabWithAuth;
