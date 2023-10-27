import { ButtonProps } from "@/customTypes/commonProps";
import { useRef } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

interface FileInputProps {
    count: 1 | 2 | 3 | 4 | 5;
    color: "primary" | "secondary" | "gray" | "white";
    id: string;
    buttonWidth: string;
    buttonHeight: string;
    // eslint-disable-next-line react/require-default-props
    buttonFontSize?: string;
    // eslint-disable-next-line react/require-default-props
    buttonFontWeight?: string;
    // eslint-disable-next-line react/require-default-props
    labelName?: string;
}

interface FileInputButtonProps extends ButtonProps {
    fontSize: string;
    fontWeight: string;
    color: "primary" | "secondary" | "gray" | "white";
}

const clickAnimation = keyframes`
from {
  transform: scale(1)
}
to {
  transform: scale(1.04)
}
`;

const FileInputContainer = styled("div")`
    //
`;

const FileInputWrapper = styled("input")`
    display: none;
`;

const FileInputButtonWrapper = styled("button")<FileInputButtonProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    font-size: ${(props) => props.fontSize};
    font-weight: ${(props) => props.fontWeight};

    background-color: ${(props) => {
        let buttonColor = "";

        if (props.color === "gray") {
            buttonColor = `${props.color}1`;
        } else {
            buttonColor = `${props.color}3`;
        }

        if (props.color !== "white") {
            return props.theme.colors[buttonColor];
        }
        return "white";
    }};

    border: ${(props) => (props.color === "white" ? "1px solid black" : "none")};
    border-radius: 10px;
    cursor: pointer;

    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
        background-color: ${(props) => {
            let buttonColor = "";

            if (props.color === "gray") {
                buttonColor = `${props.color}2`;
            } else {
                buttonColor = `${props.color}4`;
            }

            if (props.color !== "white") {
                return props.theme.colors[buttonColor];
            }
            // colorNum에 따라 다른 배경색을 설정
            return "#d7d7d7";
        }};
        box-shadow: 0px 0px 5px 2px ${(props) => props.theme.colors.gray3};

        color: ${(props) => {
            if (props.color === "white" || props.color === "gray") {
                return "black";
            }
            return "white";
        }};
        cursor: pointer;
    }

    &:active {
        background-color: ${(props) => {
            let buttonColor = "";

            if (props.color === "gray") {
                buttonColor = `${props.color}3`;
            } else {
                buttonColor = `${props.color}5`;
            }

            if (props.color !== "white") {
                return props.theme.colors[buttonColor];
            }

            return "#a7a7a7";
        }};
        box-shadow: 0px 0px 5px 2px ${(props) => props.theme.colors.gray4};

        color: ${(props) => {
            if (props.color === "white" || props.color === "gray") {
                return "black";
            }
            return "white";
        }};

        cursor: pointer;
        animation: ${clickAnimation} 0.1s linear forwards;
    }
`;

const FileInputLabelWrapper = styled("label")`
    font-size: 20px;
`;

function FileInput({
    count,
    id,
    color = "white",
    buttonWidth,
    buttonHeight,
    buttonFontSize = "20px",
    buttonFontWeight = "Regular",
    labelName,
}: FileInputProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleInputButton = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <FileInputContainer>
            {labelName && <FileInputLabelWrapper htmlFor={id}>{labelName}</FileInputLabelWrapper>}
            <FileInputButtonWrapper
                width={buttonWidth}
                height={buttonHeight}
                fontSize={buttonFontSize}
                fontWeight={buttonFontWeight}
                onClick={handleInputButton}
                color={color}
            >
                안녕하세요
            </FileInputButtonWrapper>
            <FileInputWrapper
                ref={inputRef}
                id={id}
                name={id}
                type="file"
                accept="image/*"
                multiple={count !== 1}
            />
        </FileInputContainer>
    );
}

export default FileInput;
