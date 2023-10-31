import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Store from "./store";
import Review from "./review";

function Fundings() {
    const router = useRouter();
    const { query } = router;
    const [activeTab, setActiveTab] = useState("store");

    useEffect(() => {
        window.history.replaceState(null, "", `/fundings/${query.fundingId}/store`);
    }, [query.fundingId]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);

        // URL을 업데이트하되 페이지를 이동하지 않습니다. replaceState를 사용하여 현재 URL 상태를 업데이트합니다.
        window.history.replaceState(null, "", `/fundings/${query.fundingId}/${tab}`);
    };

    return (
        <div>
            <div>
                <button type="button" onClick={() => handleTabChange("store")}>
                    Tab store
                </button>
                <button type="button" onClick={() => handleTabChange("review")}>
                    Tab review
                </button>
            </div>

            <div>
                {activeTab === "store" && <Store />}
                {activeTab === "review" && <Review />}
            </div>
        </div>
    );
}

export default Fundings;
