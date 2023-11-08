/* Import */
import fundingTabMenuConfig from "@configs/tabMenuConfig";
import MainLayout from "@layouts/MainLayout";
import { ReactNode, useState } from "react";
import { Tab, TabBar } from "@components/composite/tabBar";
import { useRouter } from "next/router";
import withAuth from "@libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Funding Tab Page */
function FundingTab() {
    // States and Variables
    const router = useRouter();
    const { fundingId, tabName } = router.query;
    const [activeTab, setActiveTab] = useState<string>((tabName as string) || "store");

    // Function for Handling Tab Click
    const handleTabClick = (id: string, redirectUrl: string) => {
        const newRedirectUrl = redirectUrl.replace("[fundingId]", `${fundingId}`);
        setActiveTab(id);
        router.push(newRedirectUrl, undefined, { shallow: true });
    };

    return (
        <div>
            펀딩 메인 페이지입니다.
            <TabBar>
                {fundingTabMenuConfig.map((tab) => (
                    <Tab
                        key={tab.id}
                        width="30%"
                        labelText={tab.labelText}
                        isActive={activeTab === tab.id}
                        onClick={() => handleTabClick(tab.id, tab.redirectUrl)}
                    />
                ))}
            </TabBar>
            <div>{activeTab === "store" ? <div>상점</div> : <div>리뷰</div>}</div>
        </div>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const FundingTabWithAuth = withAuth({ WrappedComponent: FundingTab });

// ----------------------------------------------------------------------------------------------------

/* Layout */
FundingTabWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingTabWithAuth;
