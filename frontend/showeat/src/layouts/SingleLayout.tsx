/* Import */
import Header from "@components/header";
import { LayoutProps } from "@customTypes/layoutProps";

// ----------------------------------------------------------------------------------------------------

/* Single Page Layout */
function SingleLayout(props: LayoutProps) {
    const { children } = props;

    return (
        <>
            <Header />
            <div>여기는 푸터 없는 페이지입니다.</div>
            <article>{children}</article>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SingleLayout;
