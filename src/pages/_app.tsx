import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  const [showSubNav, setShowSubNav] = useState(false);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar showSubNav={showSubNav} setShowSubNav={setShowSubNav} />
        <div className="z-10 pt-20 pb-36 relative">
          <Component setShowSubNav={setShowSubNav} {...pageProps} />
        </div>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
