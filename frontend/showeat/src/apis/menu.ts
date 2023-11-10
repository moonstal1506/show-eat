/* Import */
import { fetchGet, fetchModify } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------
/* Function for Get Seller's Menu List */
const getMenuList = async () => {
    const props: FetchProps = {
        url: "business/menu",
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Add Menu */
interface AddNewMenuType {
    menu: string;
    price: string;
    multipartFiles: File[];
}

const addNewMenu = async ({ menu, price, multipartFiles }: AddNewMenuType) => {
    const formData = new FormData();

    const yaho = JSON.stringify({
        menu,
        price,
    });

    console.log(yaho);
    // console.log(
    //     JSON.stringify({
    //         menu,
    //         price,
    //     }),
    // );

    // multipartFiles.forEach((file, index) => {
    //     formData.append(`file${index + 1}`, file);
    // });

    const props: FetchProps = {
        url: "business/menu",
        method: "POST",
        isAuth: true,
        contentType: "file", // or "multipart/form-data"
        data: {
            registMenuRequestDto: yaho,
            multipartFiles,
        },
    };

    console.log(formData);

    console.log(menu, price, multipartFiles);

    const result = await fetchModify(props);

    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export { getMenuList, addNewMenu };
