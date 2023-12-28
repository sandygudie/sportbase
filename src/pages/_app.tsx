import "@/styles/globals.css";
import { Suspense, type ReactElement, type ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppProvider } from "@/context";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";

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
  
  const getLayout = Component.getLayout || commonLayout;

  return getLayout(
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />{" "}
    </ThemeProvider>
  );
};

export default App;
