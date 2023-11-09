/* Import */
import BuyerLayout from "@layouts/BuyerLayout";
import BuyersCouponsModal from "@components/custom/modal/BuyersCouponsModal";
import { buyersCouponsTabMenuConfig } from "@configs/tabMenuConfig";
import Coupon from "@components/composite/coupon";
import { CouponType } from "@customTypes/apiProps";
import { getCouponList, getCouponDetails } from "@apis/coupons";
import { GetServerSideProps } from "next";
import Modal from "@components/composite/modal";
import { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Tab, TabBar } from "@components/composite/tabBar";
import { TextButton } from "@components/common/button";
import { useRouter } from "next/router";
import useUserState from "@hooks/useUserState";
import withAuth from "@libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface CouponsParams {
    tabNames?: string[];
}

interface CouponsTabProps {
    tabName: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const CouponContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    // Box Model Attribute
    width: 100%;
    height: calc(100vh - 80px);
    box-sizing: border-box;
    padding: 5em 10em;
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
    margin: 30px 0 30px 20px;
    justify-content: flex-start;
`;

const MoreButton = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin: 0 auto;
    width: 100%;
    padding-top: 30px;
`;

// ----------------------------------------------------------------------------------------------------

/* Server Side Rendering */
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // States and Variables
    const { tabNames } = params as CouponsParams;
    const allowedTabNames = buyersCouponsTabMenuConfig.map((tab) => tab.id);

    if (!tabNames || !allowedTabNames.includes(tabNames[0])) {
        return {
            redirect: {
                destination: "/error/not-found",
                permanent: false,
            },
        };
    }

    return {
        props: {
            tabName: tabNames?.[0],
        },
    };
};

// ----------------------------------------------------------------------------------------------------

/* Buyers Coupons Tab Page */
function CouponsTab(props: CouponsTabProps) {
    // States and Variables
    const router = useRouter();
    const [user] = useUserState();
    const { tabName } = props;
    const [activeTab, setActiveTab] = useState<string>(tabName || "active");
    const [status, setStatus] = useState<string>(activeTab.toUpperCase());
    const [couponData, setCouponData] = useState<CouponType[]>([]);
    const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);
    const [page, setPage] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [last, setLast] = useState<boolean>(false);

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        setPage(0);
    };

    const handleLoadMore = () => {
        setPage(page + 1); // 더보기 : 페이지 + 1
    };

    const openModal = (coupon: CouponType) => {
        setSelectedCoupon(coupon);
        getCouponDetails(coupon.couponId).then((couponDetailsData) => {
            setSelectedCoupon(couponDetailsData.data);
            setIsModalOpen(true);
        });
    };

    const fetchCouponData = () => {
        const { userId } = user;
        getCouponList(userId, status, page).then((result) => {
            const isLastPage: boolean = result.data.last;
            const couponList: CouponType[] = result.data.couponResponseDtos || [];
            if (page === 0) {
                setCouponData(couponList);
                setLast(isLastPage);
            } else {
                setCouponData([...couponData, ...couponList]);
                setLast(isLastPage);
            }
        });
    };

    // Function for Handling Tab Click
    const handleTabClick = (id: string, redirectUrl: string) => {
        setActiveTab(id);
        router.push(redirectUrl, undefined, { shallow: true });
        handleStatusChange(id.toUpperCase());
    };

    useEffect(() => {
        const { userId } = user;
        if (userId !== 0) {
            fetchCouponData();
        }
    }, [user, status, page]);

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
            {couponData ? (
                <MoreButton>
                    <CouponWrapper>쿠폰이 없습니다.</CouponWrapper>
                </MoreButton>
            ) : (
                <CouponList>
                    {couponData.map((coupon, index) => (
                        <Coupon key={index} couponData={coupon} onClick={() => openModal(coupon)} />
                    ))}
                    {!last && (
                        <MoreButton>
                            <TextButton
                                width="150px"
                                onClick={() => handleLoadMore()}
                                text="더보기"
                                curve="round"
                            />
                        </MoreButton>
                    )}
                </CouponList>
            )}
            {selectedCoupon && (
                <Modal
                    width="auto"
                    height="auto"
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    childComponent={<BuyersCouponsModal coupon={selectedCoupon} />}
                    buttonType="close"
                    buttonWidth="150px"
                />
            )}
        </CouponContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const CouponsTabWithAuth = withAuth({ WrappedComponent: CouponsTab, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
CouponsTabWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default CouponsTabWithAuth;
