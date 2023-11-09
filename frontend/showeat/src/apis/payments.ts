/* Import */
import { fetchModify } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for get Funding datas */
// interface GetPaymentPageType {
//     type: string;
// }

/* Function for Bookmark Funding */
const postRequestPayments = async (
    payType: string,
    amount: number,
    orderName: string,
    credentialId: string,
    userEmail: string,
    userNickname: string,
) => {
    const props: FetchProps = {
        url: `payments/request`,
        method: "POST",
        data: { payType, amount, orderName, credentialId, userEmail, userNickname },
        isAuth: true,
    };

    const result = await fetchModify(props);

    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default postRequestPayments;
