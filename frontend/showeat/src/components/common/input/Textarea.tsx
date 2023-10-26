import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";

function Textarea({ width, height, mexLength, textareaName }) {
    const theme = useTheme();

    const TextareaContainer = styled("div")`
        background-color: ${theme.colors.primary3};
    `;

    const TextareaWrapper = styled("textarea")`
        background-color: ${theme.colors.secondary3};
        border-radius: 20px;
        padding: 20px 30px;
        resize: none;
    `;

    const TextareaLabelWrapper = styled("label")`
        font-size: 20px;
        font-weight: 700;
    `;

    return (
        <TextareaContainer>
            <TextareaLabelWrapper>{textareaName}</TextareaLabelWrapper>
            <TextareaWrapper
                id={id}
                name={id}
                width={width}
                height={height}
                maxLength={maxLength}
            />
        </TextareaContainer>
    );
}

export default Textarea;
