/* Import */
import Textarea from "@/components/common/input/Textarea";
import Head from "next/head";

// ----------------------------------------------------------------------------------------------------

/* Home Component */
function Home() {
    return (
        <>
            <Head>
                <title>쑈잇: ShowEat</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                구건, 그는 신인가!
                <Textarea />
            </main>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Home;
