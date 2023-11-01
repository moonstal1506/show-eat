/* Import */
import Image from "next/image";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userNicknameState, userImgUrlState } from "@/stores/users";
import ProfileBox from "@components/profileBox";

// ----------------------------------------------------------------------------------------------------

/* Style */
const HeaderContainer = styled("div")`
    position: sticky;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 5em;
    padding: 0 10%;
    box-sizing: border-box;

    border-bottom: 1px solid ${(props) => props.theme.colors.gray2};

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const LogoImageWrapper = styled("div")`
    cursor: pointer;
`;

const LogoImage = styled(Image)`
    object-fit: cover;
`;

const NavigationContainer = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5em;
`;

const ButtonWrapper = styled("div")`
    cursor: pointer;
    font-size: 18px;
    &:hover {
        font-weight: 700;
        color: ${(props) => props.theme.colors.primary3};
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Header Component */
function Header() {
    const router = useRouter();
    const nickname = useRecoilValue(userNicknameState);
    const imageUrl = useRecoilValue(userImgUrlState);

    return (
        <HeaderContainer>
            <LogoImageWrapper onClick={() => router.push("/")}>
                <LogoImage
                    src="/assets/images/service-logo.png"
                    width={120}
                    height={60}
                    alt="logo-icon"
                    priority
                />
            </LogoImageWrapper>
            <NavigationContainer>
                <ButtonWrapper onClick={() => router.push("/sign-in")}>로그인</ButtonWrapper>
                <ButtonWrapper onClick={() => router.push("/sign-in")}>회원가입</ButtonWrapper>
                <ProfileBox source={imageUrl} nickname={nickname} />
            </NavigationContainer>
        </HeaderContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Header;
