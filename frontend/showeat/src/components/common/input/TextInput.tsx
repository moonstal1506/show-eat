/* Import */
import { InputProps } from "@customTypes/commonProps";
import styled from "@emotion/styled";
import Image from "next/image";
import { ChangeEvent, memo, MouseEvent, useRef, useState } from "react";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TextInputProps extends InputProps {
    defaultValue?: string;
    placeholder?: string;
    labelText?: string;
    source?: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const InputContainer = styled("div")<{ width: string; height: string }>`
    // Box Model Attribute
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    min-width: 150px;
`;

const LabelWrapper = styled("label")`
    // Box Model Attribute
    width: 100%;

    // Text Attribute
    font-size: 18px;
    font-weight: 700;
`;

const InputBox = styled("div")`
    // Box Model Attribute
    width: 100%;
    box-sizing: border-box;
    margin-top: 0.5em;
    padding: 0.5em 1em;

    // Style Attribute
    border: 1px solid ${(props) => props.theme.colors.gray3};
    border-radius: 15px;
    &:focus-within {
        border-color: transparent;
        box-shadow:
            0 0 5px 2px ${(props) => props.theme.colors.primary2},
            0 0 0 2px ${(props) => props.theme.colors.primary3};
    }
`;

const InputWrapper = styled("input")`
    // Box Model Attribute
    width: 100%;

    // Style Attribute
    border: none;
    outline: none;
`;

const IconWrapper = styled(Image)`
    // Box Model Attribute
    max-width: 30px;
    max-height: 30px;

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

// ----------------------------------------------------------------------------------------------------

/* Text Input Component */
function TextInput(props: TextInputProps) {
    const {
        width,
        height = "auto",
        id,
        name = id,
        defaultValue = "",
        placeholder = "",
        labelText = "",
        source = "",
        onClick = () => {},
    } = props;
    const [text, setText] = useState<string>(defaultValue);
    const textInputRef = useRef<HTMLInputElement | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value.trim());
    };

    return (
        <InputContainer width={width} height={height}>
            {labelText && <LabelWrapper htmlFor={id}>{labelText}</LabelWrapper>}

            <InputBox onClick={() => textInputRef.current?.focus()}>
                <InputWrapper
                    type="text"
                    ref={textInputRef}
                    id={id}
                    name={name}
                    value={text}
                    placeholder={placeholder}
                    onChange={handleInputChange}
                />
                {source && (
                    <IconWrapper
                        src={source}
                        width={20}
                        height={20}
                        alt="input-icon"
                        onClick={onClick}
                    />
                )}
            </InputBox>
        </InputContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default memo(TextInput);
