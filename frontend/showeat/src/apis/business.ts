/* Import */
import { fetchModify } from "@utils/api";
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

// ----------------------------------------------------------------------------------------------------

/* Export */
export default postBusinessInfo;
