import styled from "@emotion/styled";
import { keyframes } from "@emotion/css";
import { useEffect, useState } from "react";

interface AlarmDropDownProps {
    buttonComponent: React.ReactNode;
    dropDownComponent: React.ReactNode;
    isOpen: boolean;
    color: "primary" | "secondary" | "gray";
    maxWidth?: string;
    maxHeight?: string;
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

const AlarmDropDownContainer = styled("div")`
    position: "relative";
`;

const AlarmDropDownButtonWrapper = styled("div")`
    position: "relative";

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const AlarmDropDownInnerWrapper = styled("div")<Partial<AlarmDropDownProps>>`
    /* min-width: 100px;
    min-height: 100px; */
    max-width: ${(props) => props.maxWidth};
    max-height: ${(props) => props.maxHeight};

    overflow-y: ${(props) => (props.maxHeight ? "scroll" : "visible")};

    padding: 10px 20px;

    border-left: 2px solid ${(props) => props.theme.colors.gray1};
    border-right: 2px solid ${(props) => props.theme.colors.gray1};
`;

const AlarmDropDownOuterWrapper = styled("div")<Partial<AlarmDropDownProps>>`
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid ${(props) => props.theme.colors[`${props.color}2`]};
    border-radius: 10px;
    box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors[`${props.color}2`]};

    margin-top: 5px;
    padding: 20px;

    animation: ${(props) => (props.isOpen ? dropDownFadein : dropDownFadeOut)} 0.3s ease-in-out
        forwards;
`;

function AlarmDropDown({
    buttonComponent,
    dropDownComponent,
    isOpen,
    color,
    maxWidth,
    maxHeight,
}: AlarmDropDownProps) {
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
        <AlarmDropDownContainer>
            <AlarmDropDownButtonWrapper>{buttonComponent}</AlarmDropDownButtonWrapper>
            {!isHidden && (
                <AlarmDropDownOuterWrapper isOpen={isOpen} color={color}>
                    <AlarmDropDownInnerWrapper maxWidth={maxWidth} maxHeight={maxHeight}>
                        {dropDownComponent}
                    </AlarmDropDownInnerWrapper>
                </AlarmDropDownOuterWrapper>
            )}
        </AlarmDropDownContainer>
    );
}

export default AlarmDropDown;
