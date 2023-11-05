import styled from "@emotion/styled";
import Image from "next/image";
import Slider from "react-slick";
import { keyframes } from "@emotion/react";
import { useRef } from "react";
// import Card from "../card/Card";

interface CarouselProps {
    width: number;
    height: number;
    title: string;
    description: string;
}

const carouselContents = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const hoverAnimation = keyframes`
from {
  transform: scale(1)
}
to {
  transform: scale(1.1)
}
`;

const clickAnimation = keyframes`
from {
  transform: scale(1.1)
}
to {
  transform: scale(1.2)
}
`;

const CarouselContainer = styled("div")<Partial<CarouselProps>>`
    width: ${(props) => `${props.width}px`};
    height: ${(props) => `${props.height}px`};

    padding: 1em 0;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const CarouselHeaderContainer = styled("div")`
    display: flex;
    flex-direction: column;
`;

const CarouselTitleWrapper = styled("span")`
    font-weight: 700;
    font-size: 26px;
`;

const CarouselDescriptionWrapper = styled("span")`
    font-size: 14px;
    color: ${(props) => props.theme.colors.gray4};

    padding-top: 0.2em;
    padding-bottom: 2em;
`;

const CarouselCardsContainer = styled("div")<Partial<CarouselProps>>`
    width: ${(props) => `${props.width}px`};
    height: ${(props) => `${props.height}px`};

    position: relative;
`;

const CarouselCardWrapper = styled("div")<Partial<CarouselProps>>`
    width: ${(props) => `${props.width}px`};
    height: ${(props) => `${props.height}px`};

    box-shadow: 0px 0px 2px 1px ${(props) => props.theme.colors.gray3};

    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const LeftArrowWrapper = styled("div")<{ height: number }>`
    width: 50px;
    height: ${(props) => `${props.height}px`};

    position: absolute;

    border-radius: 20px 0px 0px 20px;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    transform: translateX(-100%);

    &:hover {
        background: rgba(0, 0, 0, 0.2); // 반투명한 회색 창

        & img {
            animation: ${hoverAnimation} 0.2s linear forwards;
        }
    }

    &:active {
        background: rgba(0, 0, 0, 0.4); // 반투명한 회색 창
        & img {
            animation: ${clickAnimation} 0.1s linear forwards;
        }
    }
`;

const RightArrowWrapper = styled("div")<{ height: number }>`
    width: 50px;
    height: ${(props) => `${props.height}px`};

    position: absolute;

    border-radius: 0px 20px 20px 0px;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    transform: translateX(1920%) translateY(-100%);

    &:hover {
        background: rgba(0, 0, 0, 0.2); // 반투명한 회색 창

        & img {
            animation: ${hoverAnimation} 0.2s linear forwards;
        }
    }

    &:active {
        background: rgba(0, 0, 0, 0.4); // 반투명한 회색 창
        & img {
            animation: ${clickAnimation} 0.1s linear forwards;
        }
    }
`;

const ArrowImageWrapper = styled(Image)`
    //
`;

function Carousel({ width, height, title, description }: CarouselProps) {
    const settings = {
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    const sliderRef = useRef<Slider | null>(null);

    const goToPrev = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const goToNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <CarouselContainer width={width} height={height}>
            <CarouselHeaderContainer>
                <CarouselTitleWrapper>{title}</CarouselTitleWrapper>
                <CarouselDescriptionWrapper>{description}</CarouselDescriptionWrapper>
            </CarouselHeaderContainer>

            <CarouselCardsContainer width={width} height={height}>
                <LeftArrowWrapper height={height} onClick={goToPrev}>
                    <ArrowImageWrapper
                        src="/assets/icons/left-arrow-icon.svg"
                        alt="carousel-left-arrow"
                        width={40}
                        height={40}
                    />
                </LeftArrowWrapper>
                <Slider {...settings} ref={sliderRef}>
                    {carouselContents.map((content, idx) => (
                        <CarouselCardWrapper
                            key={`${content}-${idx}`}
                            width={width}
                            height={height}
                        >
                            {content}
                        </CarouselCardWrapper>
                    ))}
                </Slider>
                <RightArrowWrapper height={height} onClick={goToNext}>
                    <ArrowImageWrapper
                        src="/assets/icons/right-arrow-icon.svg"
                        alt="carousel-right-arrow"
                        width={40}
                        height={40}
                    />
                </RightArrowWrapper>
            </CarouselCardsContainer>
        </CarouselContainer>
    );
}

export default Carousel;
