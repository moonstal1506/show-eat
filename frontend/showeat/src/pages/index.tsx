/* Import */
import Modal from "@/components/modal/Modal";
// import styled from "@emotion/styled";
import Head from "next/head";
import { useState } from "react";

// ----------------------------------------------------------------------------------------------------

function GoodGood() {
    return (
        <span>
            으앙ㄹㄴ머라ㅣ너미하ㅓㅁ히ㅏㅓㅁ이ㅠㅓㅁ이ㅠㅏㅓ미ㅏㅠㅓㅣ마너ㅠㅣㅏㄴ머ㅠㅣ버ㅏㅣ
        </span>
    );
}

/* Home Component */
function Home() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <Head>
                <title>쑈잇: ShowEat</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                구건, 그는 신인가!
                <Modal
                    childComponent={<GoodGood />}
                    width="400px"
                    height="300px"
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    buttonType="confirm"
                />
                <button type="button" onClick={() => setIsOpen(!isOpen)}>
                    야호
                </button>
            </main>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Home;
