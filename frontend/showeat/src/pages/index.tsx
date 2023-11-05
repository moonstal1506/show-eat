/* Import */
import Head from "next/head";
import styled from "@emotion/styled";
import MainLayout from "@layouts/MainLayout";
import { ReactNode } from "react";
import SearchBar from "@/components/searchBar/SearchBar";
import CardCarousel from "../components/carousel/CardCarousel";

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

    min-width: 1080px;

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
                            <CardCarousel
                                width={960}
                                height={450}
                                title="무수히 많은 펀딩의 요청이! 실시간 HOT 펀딩"
                                description="셀러가 설정한 최소 참여 인원을 초과 달성하고 있는 실시간 인기 펀딩 목록이에요."
                            />
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
