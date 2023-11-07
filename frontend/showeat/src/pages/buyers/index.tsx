import { ReactNode } from "react";
import BuyerLayout from "@layouts/BuyerLayout";
import withAuth from "@libs/withAuth";

function index() {
    return <div>Enter</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const SignInWithAuth = withAuth({
    WrappedComponent: index,
    // guardType: "USER_ONLY"
});

// ----------------------------------------------------------------------------------------------------

/* Layout */

SignInWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SignInWithAuth;
