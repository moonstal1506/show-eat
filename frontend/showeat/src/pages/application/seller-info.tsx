/* Import */
import withAuth from "@libs/withAuth";
import styled from "@emotion/styled";
import SingleLayout from "@layouts/SingleLayout";
import { ReactNode, ChangeEvent, useState, useRef, useEffect } from "react";
import { TextInput } from "@components/common/input";
import TextButton from "@components/common/button/TextButton";

const InputContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const SellerInfoWrapper = styled("div")`
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
    width: 120px;
    height: 40px;
    flex-direction: column;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    margin-top: 0.5em;
`;

const ButtonWrapper = styled("div")`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 0.5em;
`;

const BusinessRegistrationWrapper = styled("div")`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 0.5em;
    width: 727px;
`;

const InputBox = styled("div")`
    display: flex;
    align-items: flex-start;
    gap: 54px;
`;

declare global {
    interface Window {
        daum: any;
    }
}

interface IAddr {
    address: string;
    zonecode: string;
}

function SellerInfo() {
    const [businessName, setBusinessName] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [businessNumber, setBusinessNumber] = useState<string>("");
    const [businessAddress, setBusinessAddress] = useState<string>("");
    const [zonecode, setZonecode] = useState<string>("");
    const [businessAddressDetail, setBusinessAddressDetail] = useState<string>("");
    const [businessPhone, setBusinessPhone] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");

    const handleBusinessNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBusinessName(event.target.value.trim());
    };

    const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value.trim());
    };

    const handleBusinessNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBusinessNumber(event.target.value.trim());
    };

    const handleZonecodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setZonecode(event.target.value.trim());
    };

    const handleBusinessAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBusinessAddress(event.target.value.trim());
    };

    const handleBusinessAddressDetailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBusinessAddressDetail(event.target.value.trim());
    };

    const handleBusinessPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBusinessPhone(event.target.value.trim());
    };

    const businessRegistrationInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (businessRegistrationInputRef.current) {
            businessRegistrationInputRef.current.click();
        }
    };

    const handleBusinessRegistrationChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            setFileName(selectedFile.name);
        }
    };

    return (
        <InputContainer>
            <SellerInfoWrapper>사업자 정보</SellerInfoWrapper>
            <InputBox>
                <LabelWrapper>상호 또는 법인명</LabelWrapper>
                <TextInput
                    width="727px"
                    height="40px"
                    id="businessName"
                    value={businessName}
                    placeholder="쑈잇"
                    onChange={handleBusinessNameChange}
                />
            </InputBox>
            <InputBox>
                <LabelWrapper>사업 시작일</LabelWrapper>
                <TextInput
                    width="727px"
                    height="40px"
                    id="startDate"
                    value={startDate}
                    placeholder="20231111"
                    onChange={handleStartDateChange}
                />
            </InputBox>
            <InputBox>
                <LabelWrapper>사업자등록번호</LabelWrapper>
                <TextInput
                    width="727px"
                    height="40px"
                    id="businessNumber"
                    value={businessNumber}
                    placeholder="1098177256"
                    onChange={handleBusinessNumberChange}
                />
            </InputBox>
            <InputBox>
                <LabelWrapper>주소</LabelWrapper>
                <TextInput
                    width="575px"
                    height="40px"
                    id="zonecode"
                    value={zonecode}
                    placeholder="우편번호"
                    onChange={handleZonecodeChange}
                />
                <ButtonWrapper>
                    <TextButton width="100px" text="검색" onClick={onClickAddress} />
                </ButtonWrapper>
            </InputBox>
            <InputBox>
                <LabelWrapper />
                <TextInput
                    width="727px"
                    height="40px"
                    id="businessAddress"
                    value={businessAddress}
                    placeholder="도로명주소"
                    onChange={handleBusinessAddressChange}
                />
            </InputBox>
            <InputBox>
                <LabelWrapper />
                <TextInput
                    width="727px"
                    height="40px"
                    id="businessAddressDetail"
                    value={businessAddressDetail}
                    placeholder="상세주소"
                    onChange={handleBusinessAddressDetailChange}
                />
            </InputBox>
            <InputBox>
                <LabelWrapper>연락처</LabelWrapper>
                <TextInput
                    width="727px"
                    height="40px"
                    id="businessPhone"
                    value={businessPhone}
                    placeholder="01012341234"
                    onChange={handleBusinessPhoneChange}
                />
            </InputBox>
            <InputBox>
                <LabelWrapper>사업자등록증</LabelWrapper>
                <input
                    type="file"
                    ref={businessRegistrationInputRef}
                    style={{ display: "none" }}
                    onChange={handleBusinessRegistrationChange}
                />
                <BusinessRegistrationWrapper>
                    <TextButton width="100px" text="업로드" onClick={handleButtonClick} />
                    {fileName}
                </BusinessRegistrationWrapper>
            </InputBox>
        </InputContainer>
    );
}

/* Middleware */
const SellerInfoWithAuth = withAuth({
    WrappedComponent: SellerInfo,
    guardType: "USER_ONLY",
});

/* Layout */
SellerInfoWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

/* Export */
export default SellerInfoWithAuth;
