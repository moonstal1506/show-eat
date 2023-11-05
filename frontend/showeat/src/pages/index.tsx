/* Import */
import Head from "next/head";
import styled from "@emotion/styled";
import MainLayout from "@layouts/MainLayout";
import { ReactNode } from "react";
import SearchBar from "@/components/searchBar/SearchBar";
import { CardCarousel, AdCarousel } from "../components/carousel";

// ----------------------------------------------------------------------------------------------------

const AdvertiseContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 1080px;
    height: 400px;

    margin-bottom: 2em;
`;

const MainContentsContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;

    min-width: 1080px;

    padding-top: 2em;
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
    const isLogin = true;

    const adData = [
        {
            businessName: "야옹",
            imgUrl: "/assets/images/ad/cat.png",
        },
        {
            businessName: "댕댕",
            imgUrl: "/assets/images/ad/dog.jpeg",
        },
        {
            businessName: "라쿤",
            imgUrl: "/assets/images/ad/raccoon.jpg",
        },
        {
            businessName: "레서판다",
            imgUrl: "/assets/images/ad/lesserpanda.jpg",
        },
    ];

    const carouselLoginnedData = [
        {
            type: "myFundings",
            title: `님이 참여한 펀딩`,
            description: "회원님이 참여한 펀딩 중 현재 진행 중인 펀딩 목록이에요.",
            data: "",
        },
        {
            type: "favorites",
            title: `님이 조... 조... 좋아요한 펀딩`,
            description: "회원님이 ‘좋아요’ 등록한 펀딩 중 현재 진행 중인 펀딩 목록이에요.",
            data: "",
        },
    ];

    const carouselAlwaysData = [
        {
            type: "hot",
            title: "무수히 많은 펀딩의 요청이! 실시간 HOT 펀딩",
            description:
                "셀러가 설정한 최소 참여 인원을 초과 달성하고 있는 실시간 인기 펀딩 목록이에요.",
            data: "",
        },
        {
            type: "latest",
            title: "너만 오면 Go, 마감 임박!",
            description:
                "셀러가 설정한 최소 참여 인원을 달성한 펀딩 중 최대 참여 인원에 근접했거나, 마감 시한에 가까운 펀딩 목록이에요.",
            data: "",
        },
        {
            type: "cheap",
            title: "앗! 타이어보다 싸다, 파격 세일!",
            description: "셀러가 가격을 대폭 낮춘 할인율이 높은 펀딩 목록이에요.",
            data: "",
        },
        {
            type: "repurchase",
            title: "안 먹어 본 사람은 있어도 한 번만 먹은 사람은 없다!",
            description: "바이어의 재구매율이 높은 셀러의 펀딩 목록이에요.",
            data: "",
        },
    ];

    return (
        <>
            <Head>
                <title>쑈잇: ShowEat</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <AdvertiseContainer>
                    <AdCarousel height={400} adData={adData} />
                </AdvertiseContainer>
                <MainContentsContainer>
                    <SearchBar />
                    <RecommendContentsContainer>
                        {isLogin &&
                            carouselLoginnedData.map((carouselData, idx) => (
                                <CarouselWrapper key={`${carouselData.type}-${idx}`}>
                                    <CardCarousel
                                        width={960}
                                        height={400}
                                        title={carouselData.title}
                                        description={carouselData.description}
                                    />
                                </CarouselWrapper>
                            ))}
                        {carouselAlwaysData.map((carouselData, idx) => (
                            <CarouselWrapper key={`${carouselData.type}-${idx}`}>
                                <CardCarousel
                                    width={960}
                                    height={400}
                                    title={carouselData.title}
                                    description={carouselData.description}
                                />
                            </CarouselWrapper>
                        ))}
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
