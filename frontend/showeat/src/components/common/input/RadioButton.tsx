/* Import */
import styled from "@emotion/styled";
import Image from "next/image";
import { RadioButtonProps } from "@/types/commonProps";
import { useTheme } from "@emotion/react";

// ----------------------------------------------------------------------------------------------------

function RadioButton({ width, height, id, name, value, radioName, iconURL }: RadioButtonProps) {
    const theme = useTheme();

    const RadioButtonContainer = styled("div")<{ width: string; height: string | undefined }>`
        width: ${(props) => props.width};
        height: ${(props) => (props.height ? props.height : "auto")};
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        white-space: nowrap;
    `;
    const RadioButtonWrapper = styled("input")`
        appearance: none;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        border: 2px solid ${theme.colors.gray3};
        transition: 0.15s all linear;
        margin: 0px;
        margin-right: 10px;
        position: relative;

        &:checked {
            transform: scale(1.2);
            border: 5px solid ${theme.colors.primary3};
            box-shadow: 0px 0px 5px 2px ${theme.colors.gray2};
        }
    `;

    const RadioButtonLabelContainer = styled("div")`
        display: inline-flex;
        justify-content: center;
        align-items: center;
    `;
    const RadioButtonLabelWrapper = styled("label")`
        font-size: 14px;
        text-align: end;
    `;

    const RadioButtonIconWrapper = styled(Image)`
        margin-left: 5px;
    `;

    return (
        <RadioButtonContainer width={width} height={height}>
            <RadioButtonWrapper type="radio" id={id} name={name} value={value} />
            <RadioButtonLabelContainer>
                <RadioButtonLabelWrapper htmlFor={id}>{radioName}</RadioButtonLabelWrapper>
                {iconURL && (
                    <RadioButtonIconWrapper src={iconURL} alt="Radio Icon" width={16} height={16} />
                )}
            </RadioButtonLabelContainer>
        </RadioButtonContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default RadioButton;
