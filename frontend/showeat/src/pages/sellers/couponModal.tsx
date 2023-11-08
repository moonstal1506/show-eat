/* Import */
import withAuth from "@libs/withAuth";
import BuyerLayout from "@/layouts/BuyerLayout";
import styled from "@emotion/styled";
import Table from "@/components/common/table";
import Image from "next/image";
import TextButton from "@components/common/button/TextButton";

const CouponContainer = styled("div")`
    display: inline-flex;
    padding: 30px 40px;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
`;

const NoCouponWrapper = styled("div")`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
`;
const BusinessName = styled("div")`
    color: rgba(0, 0, 0, 0.5);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    width: 630px;
    height: 25px;
    flex-direction: column;
    justify-content: center;
`;

const CouponName = styled("div")`
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: flex;
    width: 630px;
    height: 25px;
    flex-direction: column;
    justify-content: center;
`;

const CouponDetails = styled("div")`
    width: 630px;
    height: 180px;
    display: flex;
`;
const TableWrapper = styled("div")`
    width: 480px;
`;
// const QrWrapper = styled("div")`
//     width: 200px;
//     height: 200px;
// `;
function Coupons() {
    const headers = ["펀딩명", "유효기간", "메뉴가격", "구입가격"];
    const contents = ["유정이", "2022", "10000", "1000"];

    return (
        <CouponContainer>
            <NoCouponWrapper>쿠폰 사용 정보</NoCouponWrapper>
            <BusinessName>야미화니 커피</BusinessName>
            <CouponName>카페라떼</CouponName>
            <CouponDetails>
                <TableWrapper>
                    <Table headerWidth="40%" headers={headers} contents={contents} />
                </TableWrapper>
                <Image alt="qrcode" src="/assets/images/qrlogo.png" height={150} width={150} />
            </CouponDetails>
            <TextButton width="150px" onClick={() => () => {}} text="확인" curve="round" />
        </CouponContainer>
    );
}

/* Middleware */
const CouponWithAuth = withAuth({ WrappedComponent: Coupons, guardType: "PUBLIC" });

/* Layout */
CouponWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

export default CouponWithAuth;
