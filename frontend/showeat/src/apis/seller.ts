/* Import */
import { fetchGet, fetchModify } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

/* Function for Getting User Information */
const getSellerInfo = async (sellerId: number) => {
    const props: FetchProps = {
        url: `business/seller/${sellerId}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

const getBusinessRegiInfo = async (sellerId: number) => {
    const props: FetchProps = {
        url: `business/registration/${sellerId}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Setting Information at First */
const patchSettingInfo = async (
    userId: number,
    userNickname: string,
    userPhone: string,
    userAddress: string,
) => {
    const props: FetchProps = {
        url: "users/setting-info",
        method: "PATCH",
        data: { userId, userNickname, userPhone, userAddress },
        isAuth: true,
    };
    const result = await fetchModify(props);

    return result;
};

/* Export */
export { getSellerInfo, getBusinessRegiInfo, patchSettingInfo };
