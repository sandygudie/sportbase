import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { AppProvider } from "@/context";
import { useRouter } from "next/router";

const App = ({ Component, pageProps }: AppProps) => {
  const [showSubNav, setShowSubNav] = useState(false);
  const router = useRouter();
  return (
    <>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <Navbar showSubNav={showSubNav} setShowSubNav={setShowSubNav} />
          <div className="z-10 pt-24 pb-36 relative">
            <Component
              setShowSubNav={setShowSubNav}
              key={router.asPath}
              {...pageProps}
            />
          </div>
          <Footer />
        </ThemeProvider>
      </AppProvider>
    </>
  );
};

export default App;
