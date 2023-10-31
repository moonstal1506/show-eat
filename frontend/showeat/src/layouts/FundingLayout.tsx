import React, { useState } from "react";

function FundingLayout({ children }: { children: React.ReactNode }) {
    const [number, setNumber] = useState<number>(0);

    return (
        <>
            <div>여기는 펀딩 페이지입니다.</div>
            <div>{number}</div>
            <button
                type="button"
                onClick={() => {
                    setNumber(number + 1);
                }}
            >
                클릭하세요
            </button>
            <main>{children}</main>
        </>
    );
}

export default FundingLayout;
