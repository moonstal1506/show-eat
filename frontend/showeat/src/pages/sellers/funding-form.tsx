/* Import */
import { TextArea, TextInput } from "@components/common/input";
import MainLayout from "@/layouts/MainLayout";
import styled from "@emotion/styled";
import withAuth from "@libs/withAuth";
import { ReactNode, useState } from "react";
import { InputDropdown } from "@/components/common/dropdown";
import { TagButton, TextButton } from "@/components/common/button";
import menuCategory from "@/configs/menuCategory";
import Image from "next/image";

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

    width: 700px;
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

    font-size: 18px;
    font-weight: 700;
    text-align: center;
`;

const MultiInputContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 500px;
`;

const TextAreaLabel = styled("label")`
    width: 150px;

    font-size: 18px;
    font-weight: 700;
    text-align: center;

    padding-top: 0.3em;
`;

const TextAreaContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: start;

    width: 100%;
    height: 150px;

    padding-top: 0.4em;
`;

const DateInput = styled("input")`
    width: 250px;

    box-sizing: border-box;
    padding: 0.45em 1em;

    border: 2px solid ${(props) => props.theme.colors.gray3};
    outline: none;
    border-radius: 15px;
    &:focus {
        border-color: transparent;
        box-shadow:
            0 0 5px 2px ${(props) => props.theme.colors.primary2},
            0 0 0 2px ${(props) => props.theme.colors.primary3};
    }

    ::-webkit-calendar-picker-indicator {
        width: 20px;
        height: 20px;
    }
`;

const DropDownWrapper = styled("div")`
    width: 370px;
`;

const CategoryDropDownWrapper = styled("div")`
    width: 500px;
`;

const TagsContainer = styled("div")`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 5px;

    justify-content: flex-start;
    align-items: center;

    width: 500px;
`;

const TagContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: end;

    width: 95px;
`;

const DeleteIconWrapper = styled(Image)`
    cursor: pointer;
`;

const ButtonContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 550px;
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
            unit: "",
        },
        { type: "maxLimit", text: "최대 참여 인원", data: "", dataType: "number", unit: "명" },
        { type: "minLimit", text: "최소 참여 인원", data: "", dataType: "number", unit: "명" },
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
    const [menuList, setMenuList] = useState([]); // API로 메뉴 목록 받아와야함
    const [menuData, setMenuData] = useState({
        type: "menuRequestDtos",
        text: "메뉴 정보",
        data: { menuId: 0, discountPrice: "" },
        menu: "",
    });
    const [tags, setTags] = useState<{ type: string; text: string; data: string[] }>({
        type: "tags",
        text: "검색용 태그",
        data: [],
    });
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState({
        type: "description",
        text: "소개 문구",
        data: "",
        dataType: "string",
    });

    function getToday() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
        const day = date.getDate().toString().padStart(2, "0"); // 일도 2자리로 포맷팅

        return `${year}-${month}-${day}`;
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
        if (newValue > today) {
            setEndDate((prev) => {
                return { ...prev, data: newValue };
            });
        }
    };

    const changeDiscountPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (
            /^\d+$/.test(newValue)
            // && newValue < originPrice
        ) {
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

    const changeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setCategory((prev) => {
            return { ...prev, data: newValue };
        });
    };

    const changeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setTag(newValue);
    };

    const addTag = () => {
        if (tag.trim() !== "") {
            if (tags.data.length < 5) {
                setTags((prev) => {
                    return { ...prev, data: [...prev.data, tag] };
                });
                setTag("");
            }
        }
    };

    const deleteTag = (one: string) => {
        const newTags = tags.data.filter((onetag) => {
            return onetag !== one;
        });

        setTags((prev) => {
            return { ...prev, data: newTags };
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
                            width="500px"
                            unit={form.unit}
                        />
                    </InputContainer>
                ))}
                <InputContainer>
                    <InputLabel htmlFor={endDate.dataType}>{endDate.text}</InputLabel>
                    <MultiInputContainer>
                        <DateInput
                            type="date"
                            id="date-input"
                            value={endDate.data}
                            min={today}
                            required
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
                                width="370px"
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
                            value={category.data}
                            width="500px"
                            required
                            itemList={menuCategory.map((one) => one.text)}
                            onChange={(e) => changeCategory(e)}
                        />
                    </CategoryDropDownWrapper>
                </InputContainer>
                <InputContainer>
                    <InputLabel htmlFor="originalPrice">메뉴 원가</InputLabel>
                    <TextInput id="originalPrice" value="5000" unit="원" disabled width="500px" />
                </InputContainer>
                <InputContainer>
                    <InputLabel htmlFor="discountPrice">메뉴 할인가</InputLabel>
                    <TextInput
                        id="discountPrice"
                        value={menuData.data.discountPrice.toString()}
                        onChange={(e) => changeDiscountPrice(e)}
                        width="500px"
                        unit="원"
                    />
                </InputContainer>
                <InputContainer>
                    <InputLabel htmlFor="tags">검색용 태그</InputLabel>
                    <MultiInputContainer>
                        <TextInput
                            id="tags"
                            value={tag}
                            onChange={(e) => changeTag(e)}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    addTag();
                                }
                            }}
                            width="370px"
                        />
                        <TextButton text="추가" width="120px" onClick={addTag} />
                    </MultiInputContainer>
                </InputContainer>
                {tags.data.length > 0 && (
                    <InputContainer>
                        <InputLabel> </InputLabel>
                        <TagsContainer>
                            {tags.data.map((one, idx) => (
                                <TagContainer key={`${one}-${idx}`}>
                                    <TagButton
                                        tagDescription={one}
                                        colorType="primary"
                                        width="80px"
                                    />
                                    <DeleteIconWrapper
                                        src="/assets/icons/delete-icon.svg"
                                        alt="delete-tag"
                                        width={15}
                                        height={15}
                                        onClick={() => deleteTag(one)}
                                    />
                                </TagContainer>
                            ))}
                        </TagsContainer>
                    </InputContainer>
                )}

                <TextAreaContainer>
                    <TextAreaLabel htmlFor="description">소개문</TextAreaLabel>
                    <TextArea
                        value={description.data}
                        onChange={(e) => changeDescription(e)}
                        width="500px"
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
    // guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
FundingFormWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingFormWithAuth;
