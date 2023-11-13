/* Import */
import Image from "next/image";
import ProfileBox from "@components/composite/profileBox";
import styled from "@emotion/styled";
import TextBox from "@components/common/textBox";

// ----------------------------------------------------------------------------------------------------

/* Style */
const ReviewContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;

    // Box Model Attribute
    width: 100%;
`;

const ReviewHeaderContainer = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: space-between;

    // Box Model Attribute
    width: 100%;
`;

const FundingBox = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: space-between;

    // Box Model Attribute
    width: 50%;
    box-sizing: border-box;
    padding: 0.5em 1em;

    // Style Attribute
    border: 1px solid ${(props) => props.theme.colors.gray3};
    border-radius: 20px;

    // Interaction Attribute
    cursor: pointer;
`;

const TextContainer = styled("div")``;

const TextWrapper = styled("div")``;

// ----------------------------------------------------------------------------------------------------

/* Review Box Component */
function ReviewBox() {
    return (
        <ReviewContainer>
            <ReviewHeaderContainer>
                <ProfileBox source="/assets/images/crying-cook-cow.png" nickname="닉네임" />
                <FundingBox>
                    <TextContainer>
                        <TextWrapper>
                            <b>[특가] Americano~ 좋아~ 좋아~ 좋아~</b>
                        </TextWrapper>
                        <TextWrapper>카페/디저트&nbsp;&nbsp; | &nbsp;&nbsp;아메리카노</TextWrapper>
                    </TextContainer>
                    <Image
                        src="/assets/icons/right-arrow-icon.svg"
                        width={30}
                        height={30}
                        alt="right-arrow-icon"
                    />
                </FundingBox>
            </ReviewHeaderContainer>
            <TextBox text="리뷰 내용입니다." />
        </ReviewContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default ReviewBox;
