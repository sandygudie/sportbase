import { createContext, ReactNode, useEffect, useState } from "react";
import { Product, AppContextState } from "../types";

export const AppContext = createContext<AppContextState | null>(null);

export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartQty, setCartQty] = useState<number|any>();


  useEffect(() => {

    setCartQty(JSON.parse(localStorage.getItem("cart") || "[]").length)
  }, [setCartQty]);

  // const createPaidInvoice = (invoiceItem: Invoice) => {
  //   const newInvoice: Invoice = {
  //     ...invoiceItem,
  //   };
  //   setInvoices((prevState: Invoice[]) => [newInvoice, ...prevState]);
  //   localStorage.setItem("invoices", JSON.stringify([newInvoice, ...invoices]));
  // };

  // const createDraftInvoice = (invoiceItem: Invoice) => {
  //   const newInvoice: Invoice = {
  //     ...invoiceItem,
  //   };
  //   setInvoices((prevState: Invoice[]) => [newInvoice, ...prevState]);
  //   localStorage.setItem("invoices", JSON.stringify([newInvoice, ...invoices]));
  // };

  // const editInvoice = (invoiceItem: Invoice[]) => {
  //   setInvoices(invoiceItem);
  //   localStorage.setItem("invoices", JSON.stringify(invoiceItem));
  // };

  // const deleteInvoice = (id: string) => {
  //   const newInvoice = invoices.filter((invoice: Invoice) => {
  //     return id !== invoice.id;
  //   });
  //   setInvoices(newInvoice);
  //   localStorage.setItem("invoices", JSON.stringify(newInvoice));
  // };

  // const viewInvoice = (id: string) => {
  //   return invoices.filter((invoices: Invoice) => invoices.id === id);
  // };

  // const addPaidInvoice = (id: string) => {
  //   const newInvoice = invoices.map((invoice: Invoice) => {
  //     if (id === invoice.id) {
  //       return { ...invoice, status: "paid" };
  //     }
  //     return invoice;
  //   });
  //   localStorage.setItem("invoices", JSON.stringify(newInvoice));
  //   setInvoices(newInvoice);
  // };

  return (
    <AppContext.Provider
      value={{
        products,
        cartQty,
        setCartQty
        //   createPaidInvoice,
        //   createDraftInvoice,
        //   addPaidInvoice,
        //   deleteInvoice,
        //   editInvoice,
        //   viewInvoice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
