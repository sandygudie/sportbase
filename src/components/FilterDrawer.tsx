import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";


type Props = {
  children: JSX.Element;
};
export default function FilterDrawer({ children }: Props) {
  const [isOpen, setOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) =>
      setOpen(open);

  return (
    <div className="block md:hidden ">
      <IconButton
        onClick={toggleDrawer(true)}
        className="flex items-center gap-2 text-white"
      >
         <TuneIcon className="" />
        <span className="font-bold text-[15px] text-white">FILTER </span>
       
      </IconButton>
      <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer(false)}>
        <div className="flex px-4 pt-8 pb-6 items-center justify-between">
          <span className="flex items-center gap-2 text-base font-bold"><TuneIcon />FILTER </span>
          <IconButton className="text-lg" onClick={() => setOpen(false)} aria-label="Close">
            {" "}
            <CloseIcon className="text-dark"/>
          </IconButton>
        </div>
        <div className="px-4 w-72">{children}</div>
      </Drawer>
    </div>
  );
}
