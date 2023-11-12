/* Import */
import { fetchGet } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for Getting Business Information */
const getBusinessInfo = async (businessId: number) => {
    const props: FetchProps = {
        url: `business/seller/${businessId}`,
        method: "GET",
        isAuth: false,
    };
    const result = await fetchGet(props);

    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default getBusinessInfo;
