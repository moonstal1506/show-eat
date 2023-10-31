/* Import */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/css";
import Overlay from "../common/overlay";
import { TextButton } from "../common/button";
// import { useEffect, useState } from "react";

interface ModalProps {
    childComponent: React.ReactNode;
    width: string;
    height: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    buttonType: "confirm" | "close" | "submit";
}

interface ModalOuterContainerType {
    width: string;
    height: string;
    isOpen: boolean;
}

const modalFadein = keyframes`
        from {
            opacity: 0;
            /* transform: translateY(-10px); */
        }
        to {
            opacity: 1;
            /* transform: translateY(0px); */
        }
`;

const ModalOuterContainer = styled("div")<ModalOuterContainerType>`
    position: fixed;

    display: flex;
    justify-content: center;
    align-items: center;

    width: ${(props) => props.width};
    height: ${(props) => props.height};

    border-radius: 20px;

    padding: 2em 2em;

    background-color: white;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;

    overflow: hidden;

    animation: ${(props) => props.isOpen && modalFadein} 0.2s ease-in-out forwards;
`;

const ModalInnerContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 100%;
`;

const ModalChildWrapper = styled("div")`
    //
`;

const ButtonContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Modal({ childComponent, width, height, isOpen, setIsOpen, buttonType }: ModalProps) {
    return (
        <>
            {isOpen && (
                <Overlay zIndex={100}>
                    <ModalOuterContainer width={width} height={height} isOpen={isOpen}>
                        <ModalInnerContainer>
                            <ModalChildWrapper>{childComponent}</ModalChildWrapper>
                            <ButtonContainer>
                                {buttonType === "confirm" && (
                                    <TextButton
                                        text="확인"
                                        width="100px"
                                        colorType="secondary"
                                        onClick={() => setIsOpen(!isOpen)}
                                    />
                                )}
                            </ButtonContainer>
                        </ModalInnerContainer>
                    </ModalOuterContainer>
                </Overlay>
            )}
            ;
        </>
    );
}

export default Modal;
