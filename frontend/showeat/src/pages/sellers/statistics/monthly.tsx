import SellerLayout from "@layouts/SellerLayout";
import withAuth from "@libs/withAuth";
import { ReactNode, useState } from "react";
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

const TableWrapper = styled("div")`
    width: 440px;
    text-align: left;
    padding-bottom: 20px;
`;

const DateContainer = styled("div")`
    display: flex;
    align-items: center;
    color: #000;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    gap: 10px;
    padding-bottom: 100px;
`;

const DateButton = styled("button")`
    font-size: 40px;
    cursor: pointer;
    color: #000;
    background: none;
    border: none;
    outline: none;
`;

const DateLabel = styled("div")`
    font-size: 30px;
    margin: 0 10px;
`;

/* Monthly Statistics Page */
function MonthlyStats() {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // 현재 월을 기준으로 설정
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const headers = ["매출액", "성공 펀딩수", "성공 펀딩 참여자수", "실패 펀딩수"];

    const contents = ["123,456,000 원", "3 회", "323 명", "1 회"];

    const decreaseMonth = () => {
        setCurrentMonth((prevMonth) => {
            if (prevMonth === 1) {
                setCurrentYear((prevYear) => prevYear - 1);
                return 12;
            }
            return prevMonth - 1;
        });
    };

    const increaseMonth = () => {
        setCurrentMonth((prevMonth) => {
            if (prevMonth === 12) {
                setCurrentYear((prevYear) => prevYear + 1);
                return 1;
            }
            return prevMonth + 1;
        });
    };
    return (
        <TotalContainer>
            <DateContainer>
                <DateButton onClick={decreaseMonth}>{"<"}</DateButton>
                <DateLabel>
                    {currentYear}년 {currentMonth}월
                </DateLabel>
                <DateButton onClick={increaseMonth}>{">"}</DateButton>
            </DateContainer>
            <TableWrapper>
                <Table headerWidth="50%" gap="1.5em" headers={headers} contents={contents} />
            </TableWrapper>
        </TotalContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const MonthlyStatsWithAuth = withAuth({
    WrappedComponent: MonthlyStats,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
MonthlyStatsWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default MonthlyStatsWithAuth;
