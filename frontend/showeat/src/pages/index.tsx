/* Import */
import DropDown from "@/components/common/dropdown/DropDown";
import Head from "next/head";
import { useState } from "react";

// ----------------------------------------------------------------------------------------------------

interface DropDownButtonType {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Yaho() {
    return (
        <div>
            <div>
                <span>안녕하세요 선생님</span>
            </div>
            <div>
                <button type="button">야호</button>
            </div>
        </div>
    );
}

function ButtonYaho({ isOpen, setIsOpen }: DropDownButtonType) {
    return (
        <button type="button" onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
            야호야호
        </button>
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
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <DropDown
                        buttonComponent={<ButtonYaho isOpen={isOpen} setIsOpen={setIsOpen} />}
                        dropDownComponent={<Yaho />}
                        isOpen={isOpen}
                    />
                </div>
            </main>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Home;
