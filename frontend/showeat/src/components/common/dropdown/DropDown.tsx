import styled from "@emotion/styled";
import { keyframes } from "@emotion/css";

interface DropDownProps {
    buttonComponent: React.ReactNode;
    dropDownComponent: React.ReactNode;
    isOpen: boolean;
}

const dropDownFadein = keyframes`

        from {
            opacity: 0;
            max-height: 0;
        }
        to {
            opacity: 1;
            max-height: 100%;
        }
`;

const dropDownFadeOut = keyframes`

        from {
            opacity: 1;
            max-height: 100%;
        }
        to {
            opacity: 0;
            max-height: 0;
        }
    
`;

const DropDownContainer = styled("div")`
    position: "relative";
`;

const DropDownButtonWrapper = styled("div")`
    position: "relative";

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const DropDownWrapper = styled("div")<{ isOpen: boolean }>`
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid ${(props) => props.theme.colors.gray2};
    border-radius: 10px;

    margin-top: 5px;
    padding: 20px;

    box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors.gray2};

    animation: ${(props) => (props.isOpen ? dropDownFadein : dropDownFadeOut)} 0.3s ease-in-out
        forwards;
`;

function DropDown({ buttonComponent, dropDownComponent, isOpen }: DropDownProps) {
    return (
        <DropDownContainer>
            <DropDownButtonWrapper>{buttonComponent}</DropDownButtonWrapper>
            <DropDownWrapper isOpen={isOpen}>{dropDownComponent}</DropDownWrapper>
        </DropDownContainer>
    );
}

export default DropDown;
