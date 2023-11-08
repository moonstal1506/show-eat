/* Import */
import BuyerLayout from "@layouts/BuyerLayout";
import BuyersCouponsModal from "@components/custom/modal/BuyersCouponsModal";
import { buyersCouponsTabMenuConfig } from "@configs/tabMenuConfig";
import Coupon from "@components/composite/coupon";
import { getCouponList, getCouponDetails } from "@apis/coupons";
import Modal from "@components/composite/modal";
import { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Tab, TabBar } from "@components/composite/tabBar";
import { TextButton } from "@components/common/button";
import { useRouter } from "next/router";
import useUserState from "@hooks/useUserState";
import withAuth from "@libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Style */
const CouponContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: centnpmer;
    width: 100%;
    height: calc(100vh - 80px);
    padding: 5em 10em;
    box-sizing: border-box;
`;

const TitleWrapper = styled("div")`
    margin-bottom: 1em;
    font-size: 30px;
    font-weight: 900;
`;

const CouponWrapper = styled("div")`
    display: grid;
    font-weight: 700;
    font-size: 40px;
`;

const CouponList = styled("div")`
    display: flex;
    flex-wrap: wrap;
    width: 950px;
    align-items: center;
    margin-top: 20px;
`;

const MoreButton = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin: 0 auto;
    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

/* Buyers Coupons Page */
function Coupons() {
    // States and Variables
    const router = useRouter();
    const { tabName } = router.query;
    const [activeTab, setActiveTab] = useState<string>((tabName as string) || "active");
    const [couponData, setCouponData] = useState([]);
    const [status, setStatus] = useState<string>("");
    const [page, setPage] = useState(0);
    const [user] = useUserState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        setPage(0);
    };

    const handleLoadMore = () => {
        setPage(page + 1); // 더보기 : 페이지 + 1
    };

    const openModal = (coupon) => {
        console.log(`지금 클릭한 couponId: ${coupon.couponId}`);
        console.log("리스트!!!");
        console.log(couponData);
        setSelectedCoupon(coupon);
        getCouponDetails(coupon.couponId).then((couponDetailsData) => {
            console.log(couponDetailsData.data);
            setSelectedCoupon(couponDetailsData.data);
            setIsModalOpen(true);
        });
    };

    const fetchCouponData = () => {
        const { userId } = user;
        getCouponList(userId, status, page)
            .then((data) => {
                if (page === 0) {
                    setCouponData(data);
                } else {
                    setCouponData([...couponData, ...data]);
                }
                console.log("받아온 쿠폰 데이터!!!!!!!!!!!!!!!!:", data);
                // totalPages를 콘솔에 출력합니다.
                console.log("totalPages:", data.totalPages);
            })
            .catch((error) => {
                console.error("쿠폰 데이터를 가져오는 중 오류 발생:", error);
            });
    };

    // Function for Handling Tab Click
    const handleTabClick = (id: string, redirectUrl: string) => {
        setActiveTab(id);
        router.push(redirectUrl, undefined, { shallow: true });
        handleStatusChange(id.toUpperCase());
    };

    useEffect(() => {
        if (status) {
            fetchCouponData();
        }
    }, [status, page]);

    return (
        <CouponContainer>
            <TitleWrapper>보유 쿠폰</TitleWrapper>
            <TabBar>
                {buyersCouponsTabMenuConfig.map((tab) => (
                    <Tab
                        key={tab.id}
                        width="20%"
                        labelText={tab.labelText}
                        isActive={activeTab === tab.id}
                        onClick={() => handleTabClick(tab.id, tab.redirectUrl)}
                    />
                ))}
            </TabBar>
            {couponData.length === 0 ? (
                <MoreButton>
                    <CouponWrapper>쿠폰이 없습니다.</CouponWrapper>
                </MoreButton>
            ) : (
                <CouponList>
                    {couponData.map((coupon) => (
                        <Coupon
                            key={coupon.couponId}
                            couponData={coupon}
                            onClick={() => openModal(coupon)}
                        />
                    ))}
                    <MoreButton>
                        <TextButton
                            width="150px"
                            onClick={() => handleLoadMore()}
                            text="더보기"
                            curve="round"
                        />
                    </MoreButton>
                </CouponList>
            )}
            <Modal
                width="auto"
                height="auto"
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                childComponent={<BuyersCouponsModal couponDetailsData={selectedCoupon} />}
                buttonType="close"
                buttonWidth="150px"
            />
        </CouponContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const CouponsWithAuth = withAuth({ WrappedComponent: Coupons, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
CouponsWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default CouponsWithAuth;
