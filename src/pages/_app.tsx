import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppProvider } from "@/context";
import { useRouter } from "next/router";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function commonLayout(page: ReactElement) {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className="z-10 pb-36">{page}</div>
        <Footer />
      </ThemeProvider>
    </AppProvider>
  );
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();

  const getLayout = Component.getLayout || commonLayout;

  return getLayout(
    // <AppProvider>
      <ThemeProvider theme={theme}>
        <Component key={router.asPath} {...pageProps} />{" "}
      </ThemeProvider>
    // </AppProvider>
  );
};

export default App;
