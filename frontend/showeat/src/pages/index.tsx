/* Import */
import PaginationBar from "@/components/paginationBar/PaginationBar";
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
                <div>
                    <PaginationBar pageCount={10} />
                </div>
            </main>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Home;
