/* Import */
import Head from "next/head";
import { MenuButton } from "@/components/common/button";

// ----------------------------------------------------------------------------------------------------

/* Home Component */
function Home() {
    const handleMenuButton = () => {
        console.log("hi");
    };

    return (
        <>
            <Head>
                <title>쑈잇: ShowEat</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                구본웅, 그는 신인가!
                <MenuButton
                    width="7vw"
                    height="7vw"
                    onClick={handleMenuButton}
                    // imageURL={}
                    // menuName={}
                    menuName="고양이"
                />
            </main>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Home;
