import { createContext, ReactNode, useEffect, useState } from "react";
import { AppContextState } from "../types";

export const AppContext = createContext<AppContextState | null>(null);

export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [cartQty, setCartQty] = useState<number | any>();
  const [showSubNav, setShowSubNav] = useState(false);

  useEffect(() => {
    setCartQty(JSON.parse(localStorage.getItem("cart") || "[]").length);
  }, []);
  const setCartQtyhandler = (cartQty: number) => setCartQty(cartQty);
  const showSubNavHandler= (showSubNav: boolean) => setShowSubNav(showSubNav);
  return (
    <AppContext.Provider
      value={{
        cartQty,
        setCartQtyhandler,
        showSubNavHandler,
        showSubNav
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
