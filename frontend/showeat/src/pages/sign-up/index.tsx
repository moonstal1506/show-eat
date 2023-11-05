/* Import */
import { ReactNode } from "react";
import SingleLayout from "@layouts/SingleLayout";
import styled from "@emotion/styled";
import { TextButton } from "@components/common/button";
import { TextInput } from "@components/common/input";
import useUserState from "@hooks/useUserState";

// ----------------------------------------------------------------------------------------------------

/* Style */
const SignUpContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;

    // Box Model Attribute
    width: 100vw;
    height: calc(100vh - 80px);
    min-height: 450px;

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const HeaderWrapper = styled("div")`
    // Text Attribute
    font-weight: 700;
    font-size: 40px;
`;

const DescriptionWrapper = styled("div")`
    // Text Attribute
    color: ${(props) => props.theme.colors.gray4};
    font-size: 20px;
    span {
        font-size: 20px;
        font-weight: 700;
        text-decoration: underline;
    }
`;

const InputContainer = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 1em;

    // Box Model Attribute
    width: 25%;
    margin: 2em 0;
`;

const ButtonWrapper = styled("div")`
    display: flex;
    justify-content: center;
`;

// ----------------------------------------------------------------------------------------------------

/* Sign Up Page */
function SignUp() {
    const [user, setUser] = useUserState();

    return (
        <SignUpContainer>
            <HeaderWrapper>개인정보 입력</HeaderWrapper>
            <DescriptionWrapper>
                서비스 이용을 위해 필요한 <span>필수 개인정보</span>를 입력해 주세요.
            </DescriptionWrapper>
            <InputContainer>
                <TextInput
                    width="100%"
                    id="nickname"
                    defaultValue={user.userNickname}
                    labelText="닉네임"
                />
                <TextInput
                    width="100%"
                    id="phone"
                    placeholder="010-1234-5678"
                    labelText="전화번호"
                />
                <TextInput width="100%" id="address" labelText="관심 지역" />
            </InputContainer>
            <ButtonWrapper>
                <TextButton width="200px" text="개인정보 저장" />
            </ButtonWrapper>
        </SignUpContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Layout */
SignUp.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SignUp;
