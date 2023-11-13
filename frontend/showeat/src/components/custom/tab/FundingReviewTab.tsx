/* Import */
// import PaginationBar from "@components/composite/paginationBar";
import ReviewBox from "@components/composite/reviewBox";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Style */
const ReviewContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    // Box Model Attribute
    width: 100%;
`;

const ReviewList = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3em;

    // Box Model Attribute
    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

/* Funding Review Tab Component */
function FundingReviewTab() {
    return (
        <ReviewContainer>
            <ReviewList>
                <ReviewBox />
                <ReviewBox />
            </ReviewList>
            {/* <PaginationBar /> */}
        </ReviewContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingReviewTab;
