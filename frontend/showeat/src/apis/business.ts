/* Import */
import { fetchGet, fetchModify } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for Verify Business */
const postBusinessInfo = async (
    registrationRequestDto: RegistrationRequestDto,
    businessRegistration: FormData,
) => {
    const props: FetchProps = {
        url: `business/registration`,
        method: "POST",
        data: {
            registrationRequestDto,
            businessRegistration,
        },
        isAuth: true,
    };

    const result = await fetchModify(props);
    return result;
};

/* Function for Getting Business Information */
const getBusinessInfo = async (businessId: number) => {
    const props: FetchProps = {
        url: `business/seller/${businessId}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);
    return result;
};

/* Function for Modify Business Information */

// ----------------------------------------------------------------------------------------------------

/* Export */
export { getBusinessInfo, postBusinessInfo };
