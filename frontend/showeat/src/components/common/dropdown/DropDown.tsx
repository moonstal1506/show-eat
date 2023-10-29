import styled from "@emotion/styled";

interface DropDownProps {
    buttonComponent: React.ReactNode;
    childComponent: React.ReactNode;
    isOpen: boolean;
}

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
const DropDownChildWrapper = styled("div")`
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid ${(props) => props.theme.colors.gray2};
    border-radius: 10px;

    margin-top: 5px;
    padding: 20px;

    box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors.gray2};
`;

function DropDown({ buttonComponent, childComponent, isOpen }: DropDownProps) {
    return (
        <DropDownContainer>
            <DropDownButtonWrapper>{buttonComponent}</DropDownButtonWrapper>
            {isOpen && <DropDownChildWrapper>{childComponent}</DropDownChildWrapper>}
        </DropDownContainer>
    );
}

export default DropDown;
