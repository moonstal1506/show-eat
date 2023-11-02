import { fetchGet } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

const authWithKakao = async (code: string) => {
    const props: FetchProps = {
        url: "auth/login/kakao",
        method: "GET",
        isAuth: false,
        params: { code },
    };

    const result = await fetchGet(props);

    console.log(result.data.tokenDto.accessToken);
};

export default authWithKakao;
