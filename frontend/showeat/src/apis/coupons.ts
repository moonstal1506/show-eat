/* Import */
import { fetchGet } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for get My Coupons */

/* 내 쿠폰 가져오는 함수 */
const getCouponList = async (userId: number, status: string, page: number) => {
    console.log(userId, " ", status);
    const props: FetchProps = {
        url: `coupon/${userId}/${status}/${page}`,
        method: "GET",
        isAuth: true,
    };

    const result = await fetchGet(props);
    console.log("result", result);
    const data = Array.isArray(result.data.couponListResponseDtos)
        ? result.data.couponListResponseDtos
        : [];
    console.log("이게뭐야?", data);
    return data;
};

// Export the function as the default export
export default getCouponList;
