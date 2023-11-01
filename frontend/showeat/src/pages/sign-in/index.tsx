/* Import */
import MainLayout from "@layouts/MainLayout";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Sign In Page */
function SignIn() {
    return <div>로그인 페이지입니다.</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Layout */
SignIn.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SignIn;
