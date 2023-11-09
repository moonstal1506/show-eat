/* Import */
import { TextArea, TextInput } from "@components/common/input";
import MainLayout from "@/layouts/MainLayout";
import styled from "@emotion/styled";
import withAuth from "@libs/withAuth";
import { ReactNode, useState } from "react";
import { InputDropdown } from "@/components/common/dropdown";
import { TextButton } from "@/components/common/button";
import menuCategory from "@/configs/menuCategory";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TextFormDataType {
    type: string;
    text: string;
    data: string;
    dataType: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const FundingFormContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-width: 920px;
`;

const TitleWrapper = styled("div")`
    font-size: 30px;
    font-weight: 700;

    padding: 1em 0;
`;

const FormContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 800px;
`;

const InputContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 50px;
`;

const InputLabel = styled("label")`
    width: 150px;

    font-size: 20px;
    font-weight: 700;
    text-align: center;
`;

const MultiInputContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 600px;
`;

const TextAreaLabel = styled("label")`
    width: 150px;

    font-size: 20px;
    font-weight: 700;
    text-align: center;

    padding-top: 0.2em;
`;

const TextAreaContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: start;

    width: 100%;
    height: 150px;

    padding: 0.5em 0;
`;

const DateInput = styled("input")`
    width: 600px;

    box-sizing: border-box;
    padding: 0.5em 1em;

    border: 2px solid ${(props) => props.theme.colors.gray3};
    outline: none;
    border-radius: 15px;
    &:focus {
        border-color: transparent;
        box-shadow:
            0 0 5px 2px ${(props) => props.theme.colors.primary2},
            0 0 0 2px ${(props) => props.theme.colors.primary3};
    }
`;

const DropDownWrapper = styled("div")`
    width: 470px;
`;

const CategoryDropDownWrapper = styled("div")`
    width: 600px;
`;

const ButtonContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 600px;
`;

// ----------------------------------------------------------------------------------------------------

/* Seller Funding Form Page */
function FundingForm() {
    const [textFormData, setTextFormData] = useState([
        {
            type: "title",
            text: "펀딩 제목",
            data: "",
            dataType: "string",
        },
        { type: "maxLimit", text: "최대 참여 인원", data: "", dataType: "number" },
        { type: "minLimit", text: "최소 참여 인원", data: "", dataType: "number" },
    ]);
    const [category, setCategory] = useState({
        type: "category",
        text: "펀딩 분류",
        data: "",
    });
    const [endDate, setEndDate] = useState({
        type: "endDate",
        text: "펀딩 종료일",
        data: "",
        dataType: "string",
    });
    const [menuList, setMenuList] = useState([]);
    const [menuData, setMenuData] = useState({
        type: "menuRequestDtos",
        text: "메뉴 정보",
        data: { menuId: 0, discountPrice: "" },
        menu: "",
    });
    const [tags, setTags] = useState({ type: "tags", text: "검색용 태그", data: [] });
    const [description, setDescription] = useState({
        type: "description",
        text: "소개 문구",
        data: "",
        dataType: "string",
    });

    function getToday() {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = date.getMonth().toString();
        const day = date.getDate().toString();

        return year + month + day;
    }

    const today = getToday();

    const changeFormData = (e: React.ChangeEvent<HTMLInputElement>, form: TextFormDataType) => {
        const newValue = e.target.value;
        if (form.dataType === "number" && /^\d+$/.test(newValue)) {
            setTextFormData((prev) => {
                const update = prev.map((one) => {
                    if (one.type === form.type) {
                        return { ...one, data: newValue };
                    }
                    return one;
                });
                return update;
            });
        }
        if (form.dataType === "string") {
            setTextFormData((prev) => {
                const update = prev.map((one) => {
                    if (one.type === form.type) {
                        return { ...one, data: newValue };
                    }
                    return one;
                });
                return update;
            });
        }
    };

    const changeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        setEndDate((prev) => {
            return { ...prev, data: newValue };
        });
    };

    const changeDiscountPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d+$/.test(newValue)) {
            setMenuData((prev) => {
                return { ...prev, data: { menuId: prev.data.menuId, discountPrice: newValue } };
            });
        }
    };

    const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setDescription((prev) => {
            return { ...prev, data: newValue };
        });
    };

    return (
        <FundingFormContainer>
            <TitleWrapper>펀딩 생성</TitleWrapper>
            <FormContainer>
                {textFormData.map((form, idx) => (
                    <InputContainer key={`${form.type}-${idx}`}>
                        <InputLabel htmlFor={form.type}>{form.text}</InputLabel>
                        <TextInput
                            id={form.type}
                            value={form.data}
                            onChange={(e) => changeFormData(e, form)}
                            width="600px"
                        />
                    </InputContainer>
                ))}
                <InputContainer>
                    <InputLabel htmlFor={endDate.dataType}>{endDate.text}</InputLabel>
                    <MultiInputContainer>
                        <DateInput
                            type="date"
                            defaultValue={today}
                            onChange={(e) => changeEndDate(e)}
                        />
                    </MultiInputContainer>
                </InputContainer>
                <InputContainer>
                    <InputLabel htmlFor="menu">펀딩 메뉴</InputLabel>
                    <MultiInputContainer>
                        <DropDownWrapper>
                            <InputDropdown
                                id="menu"
                                value={menuData.menu}
                                width="470px"
                                required
                                itemList={menuList}
                            />
                        </DropDownWrapper>
                        <TextButton text="새 메뉴" width="120px" />
                    </MultiInputContainer>
                </InputContainer>
                <InputContainer>
                    <InputLabel htmlFor="category">펀딩 분류</InputLabel>
                    <CategoryDropDownWrapper>
                        <InputDropdown
                            id="category"
                            value={category.text}
                            width="600px"
                            required
                            itemList={menuCategory.map((one) => one.text)}
                        />
                    </CategoryDropDownWrapper>
                </InputContainer>
                <InputContainer>
                    <InputLabel htmlFor="originalPrice">메뉴 원가</InputLabel>
                    <TextInput
                        id="originalPrice"
                        value="5000"
                        onChange={
                            // (e) => changeFormData(e, form)
                            console.log("여기 수정해야됨!")
                        }
                        width="600px"
                    />
                </InputContainer>
                <InputContainer>
                    <InputLabel htmlFor="discountPrice">메뉴 할인가</InputLabel>
                    <TextInput
                        id="discountPrice"
                        value={menuData.data.discountPrice.toString()}
                        onChange={() => changeDiscountPrice}
                        width="600px"
                    />
                </InputContainer>
                <TextAreaContainer>
                    <TextAreaLabel htmlFor="description">소개문</TextAreaLabel>
                    <TextArea
                        onChange={() => changeDescription}
                        width="600px"
                        height="120px"
                        maxLength={200}
                        id="description"
                        name="description"
                        focusColor="primary"
                    />
                </TextAreaContainer>
            </FormContainer>
            <ButtonContainer>
                <TextButton text="펀딩 생성" width="250px" height="50px" fontSize={24} />
                <TextButton text="취소" fill="negative" width="250px" height="50px" fontSize={24} />
            </ButtonContainer>
        </FundingFormContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const FundingFormWithAuth = withAuth({
    WrappedComponent: FundingForm,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
FundingFormWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingFormWithAuth;
