import styled from "@emotion/styled";
import { TextInputProps } from "@customTypes/commonProps";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TextareaProps extends TextInputProps {
    maxLength: number;
    textareaName: string;
}

const TextareaContainer = styled("div")`
    background-color: ${(props) => props.theme.colors.primary3};
`;

const TextareaWrapper = styled("div")<{ width: string; height: string | undefined }>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    background-color: ${(props) => props.theme.colors.secondary3};

    padding: 20px 30px;
    border-radius: 20px;
`;

const TextareaBox = styled("textarea")<{ width: string; height: string | undefined }>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    border: none;

    resize: none;

    &:focus,
    &:active {
        outline: none;
    }
`;

const TextareaLabelWrapper = styled("label")`
    font-size: 20px;
    font-weight: 700;
`;

function Textarea({ width, height, maxLength, id, textareaName, setTextValue }: TextareaProps) {
    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setTextValue(newValue);
    };

    return (
        <TextareaContainer>
            <TextareaLabelWrapper>{textareaName}</TextareaLabelWrapper>
            <TextareaWrapper width={width} height={height}>
                <TextareaBox
                    id={id}
                    name={id}
                    width={width}
                    height={height}
                    maxLength={maxLength}
                    onChange={(e) => handleChangeText(e)}
                />
            </TextareaWrapper>
        </TextareaContainer>
    );
}

export default Textarea;
