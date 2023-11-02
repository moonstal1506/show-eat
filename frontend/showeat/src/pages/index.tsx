/* Import */
import Head from "next/head";
import MainLayout from "@layouts/MainLayout";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Home Component */
function Home() {
    return (
        <>
            <Head>
                <title>쑈잇: ShowEat</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>구건, 그는 신인가!</main>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Layout */
Home.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Home;
