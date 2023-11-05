import styled from "@emotion/styled";
import Slider from "react-slick";
// import Card from "../card/Card";

interface CarouselProps {
    width: string;
    height: string;
}

const carouselContents = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const CarouselContainer = styled("div")<CarouselProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
`;

const CarouselHeaderContainer = styled("div")`
    //
`;

const CarouselTitleWrapper = styled("span")`
    //
`;

const CarouselDescriptionWrapper = styled("span")`
    //
`;

const CarouselContentWrapper = styled("div")<CarouselProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    display: inline-flex;
    justify-content: center;
    align-items: center;
`;

function Carousel({ width, height }: CarouselProps) {
    const settings = {
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };
    return (
        <CarouselContainer width={width} height={height}>
            <CarouselHeaderContainer>
                <CarouselTitleWrapper>야호</CarouselTitleWrapper>
                <CarouselDescriptionWrapper>우와</CarouselDescriptionWrapper>
            </CarouselHeaderContainer>
            <Slider {...settings}>
                {carouselContents.map((content, idx) => (
                    <CarouselContentWrapper key={`${content}-${idx}`} width={width} height={height}>
                        {content}
                    </CarouselContentWrapper>
                ))}
            </Slider>
        </CarouselContainer>
    );
}

export default Carousel;
