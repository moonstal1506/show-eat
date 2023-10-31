/* Import */
import { AppProps } from "next/app";
import { Global, ThemeProvider } from "@emotion/react";
import globalStyles from "@styles/global";
import { RecoilRoot } from "recoil";
import theme from "@styles/theme";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

// ----------------------------------------------------------------------------------------------------

/* App Component */
function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

    return getLayout(
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <Global styles={globalStyles} />
                <Component {...pageProps} />
            </ThemeProvider>
        </RecoilRoot>,
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default App;
