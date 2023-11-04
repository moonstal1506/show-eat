/* Import */
import { TextInputProps } from "@customTypes/commonProps";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Image from "next/image";
import { memo, useRef } from "react";

// ----------------------------------------------------------------------------------------------------

function TextInput({
    width,
    height,
    id,
    placeholder,
    setTextValue,
    defaultValue,
    labelName,
    iconUrl,
    error = false,
    labelFontSize = "20px",
    onClick,
}: TextInputProps) {
    const theme = useTheme();
    const textInputRef = useRef<HTMLInputElement | null>(null);

    const TextInputContainer = styled("div")<{ width: string; height: string | undefined }>`
        width: ${(props) => props.width};
        height: ${(props) => props.height};
    `;

    const TextInputWrapper = styled("input")`
        width: 100%;
        border: none;
        outline: none;
        font-size: 16px;
        z-index: 1000;
    `;

    const IconWrapper = styled(Image)`
        max-width: 30px;
        max-height: 30px;
        cursor: pointer;
        z-index: 1000;

        user-select: none;
    `;

    const TextIconContainer = styled("div")<{ error: boolean }>`
        width: 100%;
        box-shadow: ${(props) =>
            props.error
                ? `0px 0px 4px 2px ${props.theme.colors.normalRed}`
                : `0px 0px 4px 2px ${props.theme.colors.gray5}`};
        border-radius: 10px;
        padding: 10px 20px;
        margin-top: 5px;
        display: flex;
        gap: 10px;
        z-index: 900;
        &:focus-within {
            box-shadow: 0px 0px 4px 2px ${theme.colors.primary3};
        }
    `;

    const LabelWrapper = styled("label")<{ labelFontSize: string }>`
        width: 100%;
        font-weight: 700;
        font-size: ${(props) => props.labelFontSize};

        margin-left: 0.5em;
    `;

    const handleTextInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setTextValue(newValue);
    };

    const handleTextIconContainer = () => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    };

    return (
        <TextInputContainer width={width} height={height}>
            {labelName && (
                <LabelWrapper htmlFor={id} labelFontSize={labelFontSize}>
                    {labelName}
                </LabelWrapper>
            )}

            <TextIconContainer onClick={handleTextIconContainer} error={error}>
                <TextInputWrapper
                    ref={textInputRef}
                    type="text"
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={(e) => handleTextInputValue(e)}
                />
                {iconUrl && (
                    <IconWrapper
                        src={iconUrl}
                        alt="SVG Icon"
                        width={20}
                        height={20}
                        onClick={onClick}
                    />
                )}
            </TextIconContainer>
        </TextInputContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */

export default memo(TextInput);
