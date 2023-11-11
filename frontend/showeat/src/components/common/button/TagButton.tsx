/* Import */
import { ButtonProps } from "@customTypes/commonProps";
import { changeFontWeight } from "@utils/format";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TagButtonProps extends ButtonProps {
    text: string;
    colorType?: "primary" | "secondary" | "gray";
    textColor?: string;
    fontSize?: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const TagButtonWrapper = styled("div")<ButtonProps & { colorType: string }>`
    display: inline-block;

    width: ${(props) => props.width};
    height: ${(props) => props.height};
    box-sizing: border-box;
    padding: 0.5em 1em;

    border-radius: 10px;
    border: ${(props) =>
        props.colorType && props.colorType !== "white"
            ? "none"
            : `1px solid ${props.theme.colors.gray2}`};
    background-color: ${(props) =>
        props.colorType ? props.theme.colors[`${props.colorType}3`] : "none"};

    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TagText = styled("span")<Partial<TagButtonProps>>`
    max-width: 100%;

    font-size: ${(props) => props.fontSize};

    color: ${(props) => props.textColor};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

// ----------------------------------------------------------------------------------------------------

/* Tag Button Component */
function TagButton(props: TagButtonProps) {
    // States and Variables
    const {
        width,
        height = "auto",
        text,
        colorType = "primary",
        textColor = "black",
        fontSize = "14px",
    } = props;
    const formattedText = changeFontWeight(text);

    return (
        <TagButtonWrapper width={width} height={height} colorType={colorType}>
            <TagText
                dangerouslySetInnerHTML={{ __html: formattedText }}
                textColor={textColor}
                fontSize={fontSize}
            />
        </TagButtonWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TagButton;
