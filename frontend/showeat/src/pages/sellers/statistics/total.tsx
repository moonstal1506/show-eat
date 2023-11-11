/* Import */
import SellerLayout from "@layouts/SellerLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";
import Table from "@/components/common/table";
import styled from "@emotion/styled";
// ----------------------------------------------------------------------------------------------------
const TotalContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0 auto;
    padding-top: 100px;
`;

const BusinessName = styled("div")`
    color: #000;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-bottom: 100px;
`;

const TableWrapper = styled("div")`
    width: 440px;
    text-align: left;
    padding-bottom: 20px;
`;

/* Total Statistics Page */
function TotalStats() {
    const headers = [
        "누적 매출액",
        "누적 성공 펀딩수",
        "누적 성공 펀딩 참여자수",
        "누적 실패 펀딩수",
    ];

    const contents = ["123,456,000 원", "3 회", "323 명", "1 회"];
    return (
        <TotalContainer>
            <BusinessName>야미화니 커피</BusinessName>
            <TableWrapper>
                <Table headerWidth="50%" gap="1.5em" headers={headers} contents={contents} />
            </TableWrapper>
        </TotalContainer>
    );
}
// ----------------------------------------------------------------------------------------------------

/* Middleware */
const TotalStatsWithAuth = withAuth({
    WrappedComponent: TotalStats,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
TotalStatsWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TotalStatsWithAuth;
