/* Import */
import { LayoutProps } from "@customTypes/layoutProps";
import Header from "@components/header";

// ----------------------------------------------------------------------------------------------------

/* Main Page Layout */
function MainLayout(props: LayoutProps) {
    const { children } = props;

    return (
        <>
            <Header />
            <div>여기는 메인 페이지입니다.</div>
            <article>{children}</article>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default MainLayout;
