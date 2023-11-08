/* Import */
import withAuth from "@libs/withAuth";
import styled from "@emotion/styled";
import SingleLayout from "@layouts/SingleLayout";
import { ReactNode } from "react";
import TextButton from "@components/common/button/TextButton";
import { useRouter } from "next/router";

const ResultContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 80px;
`;

const ResulWrapper = styled("div")`
    font-size: 30px;
    font-weight: 700;
`;

const ButtonWrapper = styled("div")`
    display: flex;
    justify-content: center;
`;

function Result() {
    const router = useRouter();
    const handleButtonClick = () => {
        router.replace("/sellers/profile/seller-info");
    };

    return (
        <ResultContainer>
            <ResulWrapper>계정 신청이 성공적으로 완료되었습니다.</ResulWrapper>
            <ButtonWrapper>
                <TextButton
                    type="submit"
                    width="200px"
                    text="돌아가기"
                    onClick={handleButtonClick}
                />
            </ButtonWrapper>
        </ResultContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const ResultWithAuth = withAuth({ WrappedComponent: Result, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
ResultWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default ResultWithAuth;
