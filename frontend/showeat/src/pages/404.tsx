/* Import */
import MainLayout from "@layouts/MainLayout";
import Image from "next/image";
import { ReactNode } from "react";
import styled from "@emotion/styled";
import { TextButton } from "@components/common/button";
import { useRouter } from "next/router";
import withAuth from "@libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Style */
const ErrorContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;

    width: 100vw;
    height: calc(100vh - 310.2px);

    background-color: white;

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const ErrorBox = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3em;

    margin-top: 2em;
`;

const HeaderWrapper = styled("div")`
    font-weight: 900;
    font-size: 200px;
    color: ${(props) => props.theme.colors.primary3};
`;

const DescriptionWrapper = styled("div")`
    font-weight: 700;
    font-size: 30px;
`;

const ButtonWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

/* Not Found Error Page */
function NotFound() {
    const router = useRouter();
    return (
        <ErrorContainer>
            <ErrorBox>
                <HeaderWrapper>404</HeaderWrapper>
                <Image
                    src="/assets/images/crying-cook-cow.png"
                    width={200}
                    height={200}
                    alt="crying-cook-cow"
                    priority
                />
            </ErrorBox>
            <DescriptionWrapper>페이지가 없소!</DescriptionWrapper>
            <ButtonWrapper>
                <TextButton width="15%" onClick={router.back} text="이전으로 돌아가기" />
            </ButtonWrapper>
        </ErrorContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const NotFoundWithAuth = withAuth({ WrappedComponent: NotFound });

// ----------------------------------------------------------------------------------------------------

/* Layout */
NotFoundWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default NotFoundWithAuth;
