import useUserState from "@hooks/useUserState";
import styled from "@emotion/styled";
import Image from "next/image";
import { TextButton } from "@components/common/button";

const NavigationBarContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 300px;
    height: 100%;

    left: 0;

    padding: 2em 0;

    border-right: 1px solid ${(props) => props.theme.colors.gray2};

    box-sizing: border-box;
`;

const ProfileBoxContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    padding: 1em 0;
`;

const ProfileImageWrapper = styled("div")`
    position: relative;
    width: 150px;
    height: 150px;

    border: 1px solid ${(props) => props.theme.colors.gray3};
    border-radius: 50%;
`;

const ProfileImage = styled(Image)`
    border-radius: 50%;
`;

const ProfileNickname = styled("span")`
    font-size: 22px;
    font-weight: 700;

    margin-top: 1em;
`;

const PointContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 1em 0;
`;

const PointHeader = styled("div")`
    text-align: center;

    width: 150px;

    padding: 0.2em;

    border-bottom: 1px solid ${(props) => props.theme.colors.gray3};
`;

const HoldingPointContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 150px;

    padding: 0.8em 0;
`;

const CashCowIcon = styled(Image)`
    padding-right: 0.5em;
`;

const HoldingPoint = styled("span")<{ fontSize: string }>`
    font-size: ${(props) => props.fontSize};
    font-weight: 700;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const MenuContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1em 0;
`;

const MenuWrapper = styled("div")`
    //
`;

function calculateFontSize(number: number) {
    if (number >= 1000000000) {
        return "12px";
    }
    if (number >= 1000000) {
        return "16px";
    }
    return "18px";
}

function NavigationBar() {
    const [user, setUser] = useUserState();

    const holdingPoint = 200000000;
    const pointFontSize = calculateFontSize(holdingPoint);
    const formattedHoldingPoint = holdingPoint.toLocaleString();

    return (
        <NavigationBarContainer>
            <ProfileBoxContainer>
                <ProfileImageWrapper>
                    <ProfileImage src="/assets/images/ad/dog.jpeg" alt="profile-img" fill />
                </ProfileImageWrapper>
                <ProfileNickname>펭귄전사</ProfileNickname>
            </ProfileBoxContainer>
            <PointContainer>
                <PointHeader>보유한 캐시카우</PointHeader>
                <HoldingPointContainer>
                    <CashCowIcon
                        src="/assets/images/cash-cow-coin.png"
                        alt="cash-cow"
                        width={40}
                        height={40}
                    />
                    <HoldingPoint fontSize={pointFontSize}>{formattedHoldingPoint}</HoldingPoint>
                </HoldingPointContainer>
                <TextButton
                    text="캐시카우 충전"
                    width="150px"
                    height="30px"
                    colorType="primary"
                    fontSize={14}
                />
            </PointContainer>
            <MenuContainer>얍얍</MenuContainer>
        </NavigationBarContainer>
    );
}

export default NavigationBar;
