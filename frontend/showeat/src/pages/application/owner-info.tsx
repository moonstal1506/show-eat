/* Import */
import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
import { TextInput } from "@components/common/input";

const InputContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const OwnerInfoWrapper = styled("div")`
    display: flex;
    width: 165px;
    height: 34px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
`;

const LabelWrapper = styled("div")`
    display: flex;
    width: 114px;
    height: 40px;
    flex-direction: column;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    margin-top: 0.5em;
`;

const InputBox = styled("div")`
    display: flex;
    align-items: flex-start;
    gap: 54px;
`;

function OwnerInfo() {
    // States and Variables
    const [ceo, setCeo] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleCeoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCeo(event.target.value.trim());
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value.trim());
    };

    return (
        <InputContainer>
            <OwnerInfoWrapper>대표자 정보</OwnerInfoWrapper>
            <InputBox>
                <LabelWrapper>대표자명</LabelWrapper>
                <TextInput
                    width="727px"
                    height="40px"
                    id="ceo"
                    value={ceo}
                    placeholder="쑈잇"
                    onChange={handleCeoChange}
                />
            </InputBox>
            <InputBox>
                <LabelWrapper>대표자 이메일</LabelWrapper>
                <TextInput
                    width="727px"
                    height="40px"
                    id="email"
                    value={email}
                    placeholder="showeat@gmail.com"
                    onChange={handleEmailChange}
                />
            </InputBox>
        </InputContainer>
    );
}

/* Export */
export default OwnerInfo;
