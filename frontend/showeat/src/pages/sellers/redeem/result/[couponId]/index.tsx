/* Import */
import SingleLayout from "@layouts/SingleLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";
import styled from "@emotion/styled";
import Table from "@components/common/table";
import { GetServerSideProps } from "next";
import { getCouponDetails } from "@apis/coupons";
import { CouponType } from "@customTypes/apiProps";
import { TextButton } from "@components/common/button";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------------------------------------

/* Style */
const RedeemResultContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-width: 800px;
    height: 100%;
`;

const TitleContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2em;
`;

const TitleWrapper = styled("span")`
    font-size: 30px;
    font-weight: 700;

    padding: 0.2em;
`;

const DescriptionWrapper = styled("span")`
    font-size: 16px;
    color: ${(props) => props.theme.colors.gray4};
`;

const ContentContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 500px;
    height: 350px;

    border: 1px solid ${(props) => props.theme.colors.gray3};
    border-radius: 20px;
`;

const SellerInfoContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 1em 0;
`;

const SellerNameContainer = styled("span")`
    font-size: 16px;
    color: ${(props) => props.theme.colors.gray4};
`;

const MenuNameContainer = styled("span")`
    font-size: 22px;
    font-weight: 700;
`;

const TableContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 80%;
    height: 300px;
`;

const ButtonContainer = styled("div")`
    display: flex;
    justify-content: space-around;
    align-items: center;

    width: 500px;

    padding: 2em;
`;

// ----------------------------------------------------------------------------------------------------

// 서버 사이드 프롭스 쓸 것
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { couponId } = context.params || { couponId: undefined };

    console.log(couponId);

    if (typeof couponId === "string") {
        let couponData = {};

        getCouponDetails(parseInt(couponId, 10)).then((res) => {
            console.log(res);
            couponData = res.data;
        });

        return {
            props: { couponData, couponId },
        };
    }

    return {
        props: { couponId },
    };
};

/* Seller Redeem Result Page */
function RedeemResult({ couponData, couponId }: { couponData: CouponType; couponId: string }) {
    const router = useRouter();
    const tableHeaders =
        couponData.couponType === "SINGLE"
            ? ["펀딩명", "유효 기간", "메뉴 가격", "구입 가격"]
            : ["펀딩명", "유효 기간", "금액권 가격", "구입 가격"];
    const tableContents =
        couponData.couponType === "SINGLE"
            ? [
                  couponData.fundingTitle,
                  couponData.expirationDate,
                  couponData.fundingPrice,
                  couponData.fundingDiscountPrice,
              ]
            : [
                  couponData.fundingTitle,
                  couponData.expirationDate,
                  couponData.fundingPrice,
                  couponData.couponPrice,
              ];

    return (
        <RedeemResultContainer>
            <TitleContainer>
                <TitleWrapper>발급한 쿠폰으로 결제하기</TitleWrapper>
                <DescriptionWrapper>발급한 쿠폰 정보가 맞는지 확인해주세요.</DescriptionWrapper>
            </TitleContainer>
            <ContentContainer>
                <SellerInfoContainer>
                    <SellerNameContainer>야미화니 커피</SellerNameContainer>
                    <MenuNameContainer>카페라떼</MenuNameContainer>
                </SellerInfoContainer>
                <TableContainer>
                    <Table
                        headers={tableHeaders}
                        contents={tableContents}
                        headerWidth="30%"
                        gap="1em"
                    />
                </TableContainer>
            </ContentContainer>
            <ButtonContainer>
                <TextButton
                    text="쿠폰 결제"
                    width="200px"
                    height="50px"
                    fontSize={20}
                    // onClick={capture}
                />
                <TextButton
                    text="취소"
                    width="200px"
                    height="50px"
                    fill="negative"
                    fontSize={20}
                    onClick={() => router.back()}
                />
            </ButtonContainer>
        </RedeemResultContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const RedeemResultWithAuth = withAuth({
    WrappedComponent: RedeemResult,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
RedeemResultWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default RedeemResultWithAuth;
