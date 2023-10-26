/* Import */
import styled from "@emotion/styled";
import Image from "next/image";
import { ButtonProps } from "@/types/commonProps";
import { keyframes, useTheme } from "@emotion/react";

// ----------------------------------------------------------------------------------------------------

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
    const theme = useTheme();

    const clickAnimation = keyframes`
      from {
        transform: scale(1)
      }
      to {
        transform: scale(1.02)
      }
    `;

    const ImageWrapper = styled("div")<ButtonProps>`
        width: ${(props) => props.width};
        height: ${(props) => props.height};
        min-width: 80px;
        min-height: 80px;
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        & > img {
            border-radius: 20px;
        }
    `;

    const TextWrapper = styled("span")`
        padding-top: 10px;
        font-size: 16px;
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        cursor: pointer;
    `;

    const MenuButtonContainer = styled("div")<ButtonProps>`
        width: ${(props) => props.width};
        display: flex;
        flex-direction: column;
        justify-content: "center";
        align-items: center;
        text-align: center;

        &:hover {
            > div > img {
                filter: brightness(0.8) saturate(1.5);
                box-shadow: 0px 0px 4px 2px ${theme.colors.gray4};
                cursor: pointer;
            }
            > span {
                font-weight: 700;
            }
        }
        &:active {
            > div > img {
                filter: brightness(0.5) saturate(2);
                box-shadow: 0px 0px 4px 2px ${theme.colors.gray5};
                cursor: pointer;
                animation: ${clickAnimation} 0.1s linear forwards;
            }
        }
    `;

    return (
        <MenuButtonContainer width={width} onClick={onClick}>
            <ImageWrapper width={width} height={height} draggable="false">
                <Image
                    src="/assets/images/핥짝.jpg"
                    // src={imageURL}
                    alt="Menu Button Image"
                    fill
                    draggable="false"
                />
            </ImageWrapper>
            <TextWrapper>{menuName}</TextWrapper>
        </MenuButtonContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default MenuButton;
