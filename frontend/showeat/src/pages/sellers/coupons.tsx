/* Import */
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";
import BuyerLayout from "@/layouts/BuyerLayout";
import styled from "@emotion/styled";
import Coupon from "@/components/coupon/Coupon";

const CouponContainer = styled("div")`
    color: #000;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
`;

const CouponWrapper = styled("div")`
    display: grid;
    font-weight: 700;
    font-size: 40px;
`;

const CouponList = styled("div")`
    display: flex;
    flex-wrap: wrap;
    width: 700px;
    align-items: center;
    margin-top: 20px;
`;

function Coupons() {
    // const activeCoupons = getMyCoupons(userId, "ACTIVE");
    // const usedCoupons = getMyCoupons(userId, "USED");
    // const expiredCoupons = getMyCoupons(userId, "EXPIRED");
    // 쿠폰 상태별로 다르게 리스트 불러오기
    const couponData = [
        {
            couponId: 1,
            couponStatus: "ACTIVE",
            couponType: "SINGLE",
            couponOriginalPrice: 10000,
            remainingDays: 30,
            businessName: "메가커피",
            businessImgUrl: "/assets/images/service-logo.svg",
            fundingMenu: "아메리카노",
            fundingImgUrl: "/assets/images/service-logo.svg",
        },
        {
            couponId: 2,
            couponStatus: "USED",
            couponType: "SINGLE",
            couponOriginalPrice: 20000,
            remainingDays: 10,
            businessName: "스타벅스",
            businessImgUrl: "/assets/images/service-logo.svg",
            fundingMenu: "바닐라 라떼",
            fundingImgUrl: "/assets/images/service-logo.svg",
        },
        {
            couponId: 3,
            couponStatus: "EXPIRED",
            couponType: "SINGLE",
            couponOriginalPrice: 20000,
            remainingDays: 10,
            businessName: "스타벅스",
            businessImgUrl: "/assets/images/service-logo.svg",
            fundingMenu: "바닐라 라떼",
            fundingImgUrl: "/assets/images/service-logo.svg",
        },
    ];

    return (
        <CouponContainer>
            <CouponWrapper>보유 쿠폰</CouponWrapper>
            <CouponList>
                {couponData.map((coupon) => (
                    <Coupon key={coupon.couponId} couponData={coupon} onClick={() => {}} />
                ))}
            </CouponList>
        </CouponContainer>
    );
}

/* Middleware */
const CouponWithAuth = withAuth({ WrappedComponent: Coupons, guardType: "PUBLIC" });

/* Layout */
CouponWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

export default CouponWithAuth;
