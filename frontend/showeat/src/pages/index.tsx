/* Import */
import AlarmDropDown from "@/components/common/dropdown/AlarmDropDown";
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
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
            </div>
            <div>
                <span>땡땡땡의 입찰이 완료되었습니다.</span>
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
    const [isAlarm, setIsAlarm] = useState<boolean>(false);

    const yap = ["야호", "안녕", "친구들", "난 괜찮아", "배고픔은", "잊을 수 있어."];

    const handleYap = (content: string) => {
        console.log(content);
    };

    return (
        <>
            <Head>
                <title>쑈잇: ShowEat</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                구건, 그는 신인가!
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <AlarmDropDown
                        buttonComponent={<ButtonYaho isOpen={isAlarm} setIsOpen={setIsAlarm} />}
                        dropDownComponent={<Yaho />}
                        isOpen={isAlarm}
                        color="secondary"
                    />
                    <DropDown
                        buttonComponent={<ButtonYaho isOpen={isOpen} setIsOpen={setIsOpen} />}
                        dropDownList={yap}
                        isOpen={isOpen}
                        color="secondary"
                        onClick={handleYap}
                    />
                </div>
            </main>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Home;
