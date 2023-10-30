import styled from "@emotion/styled";
import { keyframes } from "@emotion/css";
import { useEffect, useState } from "react";

interface DropDownProps {
    buttonComponent: React.ReactNode;
    dropDownList: string[];
    isOpen: boolean;
    color: "primary" | "secondary" | "gray";
    maxWidth?: string;
    maxHeight?: string;
    fontSize?: string;
    onClick?: (content: string) => void;
}

interface DropDownLiTypes {
    idx: number;
    listLength: number;
    fontSize: string;
    color: "primary" | "secondary" | "gray";
}

const dropDownFadein = keyframes`
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
`;

const dropDownFadeOut = keyframes`
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
`;

const DropDownContainer = styled("div")`
    position: "relative";

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const DropDownButtonWrapper = styled("div")`
    position: "relative";
`;

const DropDownInnerWrapper = styled("div")<Partial<DropDownProps>>`
    min-width: 100px;
    min-height: 100px;
    max-width: ${(props) => props.maxWidth};
    max-height: ${(props) => props.maxHeight};

    overflow-y: ${(props) => (props.maxHeight ? "scroll" : "visible")};
`;

const DropDownOuterWrapper = styled("div")<Partial<DropDownProps>>`
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid ${(props) => props.theme.colors[`${props.color}3`]};
    border-radius: 10px;
    box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors[`${props.color}2`]};

    margin-top: 5px;

    animation: ${(props) => (props.isOpen ? dropDownFadein : dropDownFadeOut)} 0.3s ease-in-out
        forwards;
`;

const DropDownLiContainer = styled("ul")`
    list-style: none;
`;

const DropDownLiWrapper = styled("li")<DropDownLiTypes>`
    padding: 5px 10px;

    font-size: ${(props) => props.fontSize};

    cursor: pointer;

    border-radius: ${(props) => {
        if (props.idx === 0) {
            return "10px 10px 0px 0px";
        }
        if (props.idx === props.listLength - 1) {
            return "0px 0px 10px 10px";
        }
        return "none";
    }};

    &:hover {
        background-color: ${(props) => props.theme.colors[`${props.color}3`]};
        color: white;
        text-shadow: 0px 0px 5px 5px black;
    }

    &:active {
        background-color: ${(props) => props.theme.colors[`${props.color}4`]};
        color: white;
        text-shadow: 0px 0px 5px 5px black;
    }
`;

function DropDown({
    buttonComponent,
    dropDownList,
    isOpen,
    color,
    maxWidth,
    maxHeight,
    fontSize = "14px",
    onClick,
}: DropDownProps) {
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            const hideTimeOut = setTimeout(() => {
                setIsHidden(true);
            }, 300);
            return () => {
                clearTimeout(hideTimeOut);
            };
        }
        if (isOpen) {
            setIsHidden(false);
        }
        return undefined;
    }, [isOpen]);

    return (
        <DropDownContainer>
            <DropDownButtonWrapper>{buttonComponent}</DropDownButtonWrapper>
            {!isHidden && (
                <DropDownOuterWrapper isOpen={isOpen} color={color}>
                    <DropDownInnerWrapper maxWidth={maxWidth} maxHeight={maxHeight}>
                        <DropDownLiContainer>
                            {dropDownList.map((content, idx) => (
                                <DropDownLiWrapper
                                    key={`dropdown-li-${content}-${idx + 1}`}
                                    idx={idx}
                                    listLength={dropDownList.length}
                                    fontSize={fontSize}
                                    color={color}
                                    onClick={() => onClick && onClick(content)}
                                >
                                    {content}
                                </DropDownLiWrapper>
                            ))}
                        </DropDownLiContainer>
                    </DropDownInnerWrapper>
                </DropDownOuterWrapper>
            )}
        </DropDownContainer>
    );
}

export default DropDown;
