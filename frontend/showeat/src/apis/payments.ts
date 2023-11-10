import { FetchProps } from "@customTypes/apiProps";
import { fetchModify } from "@utils/api";

const postRequestPayments = async (
    userId: number,
    payType: string,
    amount: number,
    orderName: string,
    credentialId: string,
    userEmail: string,
    userNickname: string,
) => {
    const props: FetchProps = {
        url: `payments/request/${userId}`,
        method: "POST",
        data: { payType, amount, orderName, credentialId, userEmail, userNickname },
        isAuth: true,
    };

    const result = await fetchModify(props);

    return result;
};

export default postRequestPayments;
