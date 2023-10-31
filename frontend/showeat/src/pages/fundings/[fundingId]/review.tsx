import FundingLayout from "@/layouts/FundingLayout";
import Link from "next/link";
import { useRouter } from "next/router";

function Review() {
    const router = useRouter();
    const { query } = router;
    return (
        <>
            <div>호우 호우우우우</div>
            <Link href={`/fundings/${query.fundingId}`}>돌아가기</Link>
        </>
    );
}

Review.getLayout = function getLayout(page: React.ReactElement) {
    return <FundingLayout>{page}</FundingLayout>;
};

export default Review;
