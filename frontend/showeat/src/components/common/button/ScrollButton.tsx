/* Import */
import { ButtonProps } from "@/types/commonProps";
import Image from "next/image";
import styled from "@emotion/styled";
import { useState } from "react";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface ScrollButtonProps extends ButtonProps {}

// ----------------------------------------------------------------------------------------------------

/* Style */
const ButtonContainer = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 0.5vh;
    position: fixed;
    right: 5%;
    bottom: 5%;
    margin: 1%;
    z-index: 1;
    align-items: center;
    cursor: pointer;
    user-select: none;
`;

const ImageWrapper = styled("div")`
    max-width: 50px;
    max-height: 50px;
    position: relative;
    img {
        filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.5));
    }
`;

const TextWrapper = styled("div")`
    font-weight: 700;
`;

// ----------------------------------------------------------------------------------------------------

/* Scroll Button Component */
function ScrollButton(props: ScrollButtonProps) {
    const { width, height = "auto", onClick } = props;
    const [showButton, setShowButton] = useState<boolean>(true);
    // const
    return (
        showButton && (
            <ButtonContainer onClick={onClick}>
                <ImageWrapper width={width} height={height}>
                    <Image
                        src="/assets/icons/scroll-to-up-icon.svg"
                        width={50}
                        height={50}
                        alt="scroll-to-up"
                        style={{
                            width: "100%",
                            height: "auto",
                        }}
                    />
                </ImageWrapper>
                <TextWrapper>맨 위로</TextWrapper>
            </ButtonContainer>
        )
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default ScrollButton;
