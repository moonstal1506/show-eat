/* Import */
import Head from "next/head";
import styled from "@emotion/styled";
import MainLayout from "@layouts/MainLayout";
import { ReactNode } from "react";
import SearchBar from "@/components/searchBar/SearchBar";
import Carousel from "../components/carousel/Carousel";

// ----------------------------------------------------------------------------------------------------

const AdvertiseContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 300px;
`;

const MainContentsContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;

    min-width: 1020px;

    padding-top: 20px;
`;

const RecommendContentsContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

const CarouselWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

/* Home Component */
function Home() {
    const isLogin = false;
    return (
        <>
            <Head>
                <title>쑈잇: ShowEat</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <AdvertiseContainer>광고판</AdvertiseContainer>
                <MainContentsContainer>
                    <SearchBar />
                    <RecommendContentsContainer>
                        {isLogin && <span>억</span>}
                        <CarouselWrapper>
                            <Carousel />
                        </CarouselWrapper>
                    </RecommendContentsContainer>
                </MainContentsContainer>
            </main>
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
