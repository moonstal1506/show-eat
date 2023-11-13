/* Import */
import { fetchGet, fetchModify } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";
import addressList from "@/configs/addressList";

// ----------------------------------------------------------------------------------------------------

/* Function for Canceling Funding Join */
const deleteFundingJoin = async (fundingId: string) => {
    const props: FetchProps = {
        url: `funding/user/${fundingId}`,
        method: "DELETE",
        isAuth: true,
    };
    const result = await fetchModify(props);

    return result;
};

/* Function for Getting Funding Detail Data */
const getFundingDetail = async (id: string) => {
    const props: FetchProps = {
        url: `funding/${id}`,
        method: "GET",
        isAuth: false,
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Getting Funding Detail User Data */
const getFundingUserDetail = async (userId: number, fundingId: string) => {
    const props: FetchProps = {
        url: `funding/${fundingId}/user/${userId}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for get Funding datas */
const getMainPageList = async (type: string) => {
    const props: FetchProps = {
        url: "funding/home",
        method: "GET",
        isAuth: false,
        params: { type },
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Applying Funding Join */
const postFundingJoin = async (fundingId: string) => {
    const props: FetchProps = {
        url: `funding/user/${fundingId}`,
        method: "POST",
        isAuth: true,
    };
    const result = await fetchModify(props);

    return result;
};

/* Function for Create Funding */
interface CreateFundingProps {
    fundingType: string;
    category: string;
    description: string;
    endDate: string;
    maxLimit: number;
    minLimit: number;
    tags: string[];
    title: string;
    discountPrice: number;
    price?: number;
    menuId?: number;
    multipartFile?: File;
}

const createFunding = async ({
    fundingType,
    category,
    description,
    endDate,
    maxLimit,
    minLimit,
    tags,
    title,
    menuId,
    discountPrice,
    price,
    multipartFile,
}: CreateFundingProps) => {
    const props: FetchProps = {
        url: `funding`,
        method: "POST",
        data: {
            fundingType,
            category,
            description,
            endDate,
            tags,
            title,
            menuId,
            discountPrice,
            maxLimit,
            minLimit,
            price,
            multipartFile,
        },
        isAuth: true,
    };

    const result = await fetchModify(props);
    console.log(222, result);

    return result;
};

/* Function for active Funding */
const getActiveFunding = async (page: number, state: string) => {
    const props: FetchProps = {
        url: `funding/business/${page}/${state}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);
    return result;
};

/* Function for Inactive Funding */
const getInActiveFunding = async (page: number, state: string) => {
    const props: FetchProps = {
        url: `funding/business/${page}/${state}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);
    return result;
};

/* Function for user Fundings */
const getUserFundings = async (page: number) => {
    const props: FetchProps = {
        url: `funding/user/${page}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);
    return result;
};

/* Function for user favorite Fundings */
const getFavoriteFundings = async (page: number) => {
    const props: FetchProps = {
        url: `funding/user/bookmark/${page}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);
    return result;
};

/* Function for Search Fundings */
interface SearchFundingsProps {
    keyword?: string | undefined;
    category?: string[] | undefined;
    address?: string[] | undefined;
    min?: number | undefined;
    max?: number | undefined;
    searchType?: string[] | undefined;
    sortType?: string | undefined;
    page: number | undefined;
}

const searchFundings = async ({
    keyword,
    category = [
        "KOREAN",
        "CHINESE",
        "JAPANESE_SUSHI",
        "WESTERN",
        "CHICKEN_BURGER",
        "ASIAN",
        "SNACKS_LATE_NIGHT",
        "CAFE_DESSERT",
    ],
    address = addressList,
    min = 0,
    max = 100000000,
    searchType = ["BUSINESS_NAME", "FUNDING_MENU", "FUNDING_TAG"],
    sortType = "POPULARITY",
    page,
}: SearchFundingsProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = {
        keyword,
        category: category && category.length > 0 ? category : undefined,
        address: address && address.length > 0 ? address : undefined,
        min,
        max,
        searchType: searchType && searchType.length > 0 ? searchType : undefined,
        sortType,
        page,
    };

    Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);

    const props: FetchProps = {
        url: `funding`,
        method: "GET",
        isAuth: false,
        params,
    };

    const result = await fetchGet(props);
    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export {
    deleteFundingJoin,
    getFundingDetail,
    getFundingUserDetail,
    getMainPageList,
    postFundingJoin,
    getActiveFunding,
    getInActiveFunding,
    getUserFundings,
    getFavoriteFundings,
    createFunding,
    searchFundings,
};
