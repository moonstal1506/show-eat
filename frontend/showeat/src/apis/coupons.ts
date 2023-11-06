/* Import */
import { fetchGet } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for get My Coupons */
const getCouponList = async (userId: number, status: string) => {
    const props: FetchProps = {
        url: `coupon/${userId}/${status}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

// Export the function as the default export
export default getCouponList;
