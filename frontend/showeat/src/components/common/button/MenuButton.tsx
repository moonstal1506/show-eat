import styled from "@emotion/styled";
import Image from "next/image";
import { ButtonProps } from "@/types/commonProps";

const MenuButtonContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: "center";
    align-items: center;
    text-align: center;
`;

const ImageWrapper = styled("div")<ButtonProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    min-width: 80px;
    min-height: 80px;
    position: relative;
`;

const TextWrapper = styled("span")`
    padding-top: 10px;
    font-size: 16px;
    font-weight: 700;
`;

function MenuButton({
    width,
    height,
    onClick,
    // imageURL,
    menuName,
}: ButtonProps & {
    // imageURL: string;
    menuName: string;
}) {
    return (
        <MenuButtonContainer onClick={onClick}>
            <ImageWrapper width={width} height={height}>
                <Image
                    src="/assets/images/핥짝.jpg"
                    // src={imageURL}
                    alt="Menu Button Image"
                    fill
                    style={{
                        borderRadius: "20px",
                    }}
                />
            </ImageWrapper>
            <TextWrapper>{menuName}</TextWrapper>
        </MenuButtonContainer>
    );
}

export default MenuButton;
