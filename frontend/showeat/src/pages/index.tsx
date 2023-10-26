/* Import */
import Head from "next/head";
import { TextButton } from "@components/common/button";
import { RightArrowIcon } from "public/assets/icons";

// ----------------------------------------------------------------------------------------------------

/* Home Component */
function Home() {
    return (
        <>
            <Head>
                <title>쑈잇: ShowEat</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>구건, 그는 신인가!</main>
            <TextButton width="150px" text="확인" fontSize={16} />
            <TextButton width="150px" text="확인" />
            <TextButton width="150px" text="취소" fill="negative" />
            <TextButton width="150px" text="확인" colorType="secondary" />
            <TextButton width="150px" text="취소" colorType="secondary" fill="negative" />
            <TextButton width="150px" text="확인" colorType="gray" />
            <TextButton width="150px" text="취소" colorType="gray" fill="negative" />
            <TextButton width="150px" text="공유" icon={<RightArrowIcon />} />
            <RightArrowIcon />
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Home;
