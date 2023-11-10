/* Import */
import withAuth from "@libs/withAuth";
import styled from "@emotion/styled";
import SingleLayout from "@layouts/SingleLayout";
import { ReactNode } from "react";
import TextButton from "@components/common/button/TextButton";
import { useRouter } from "next/router";
import OwnerInfo from "./owner-info";
import SellerInfo from "./seller-info";

const HeaderContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin: 100px;
`;

const HeaderWrapper = styled("div")`
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    width: 800px;
    height: 60px;
`;

const ProgressBox = styled("div")`
    display: flex;
    width: 400px;
    justify-content: space-between;
    align-items: center;
`;

const StepBox = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${(props) => props.backgroundColor};
`;

const StepLine = styled.div`
    width: 100px;
    height: 1px;
    flex-shrink: 0;

    border-radius: 2px;
    background-color: black;
`;

const ResultBox = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 80px;
`;

const ButtonWrapper = styled("div")`
    display: flex;
    justify-content: center;
`;

function Registration() {
    const router = useRouter();
    const handleButtonClick = () => {
        router.replace("/sellers/profile/seller-info");
    };

    return (
        <>
            <HeaderContainer>
                <HeaderWrapper>셀러 계정 신청</HeaderWrapper>
                <ProgressBox>
                    <StepBox backgroundColor="#fdb757" />
                    <StepLine />
                    <StepBox backgroundColor="black" />
                    <StepLine />
                    <StepBox backgroundColor="black" />
                </ProgressBox>
            </HeaderContainer>
            <ResultBox>
                <OwnerInfo />
                <SellerInfo />
                <ButtonWrapper>
                    <TextButton
                        type="submit"
                        width="200px"
                        text="다음"
                        onClick={handleButtonClick}
                    />
                </ButtonWrapper>
            </ResultBox>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const RegistrationWithAuth = withAuth({ WrappedComponent: Registration, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
RegistrationWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default RegistrationWithAuth;
