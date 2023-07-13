import { createContext, ReactNode, useEffect, useState } from "react";
import { AppContextState } from "../types";

export const AppContext = createContext<AppContextState | null>(null);

export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [cartQty, setCartQty] = useState<number | any>();

  useEffect(() => {
    setCartQty(JSON.parse(localStorage.getItem("cart") || "[]").length);
  }, []);

  return (
    <AppContext.Provider
      value={{
        cartQty,
        setCartQty,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
