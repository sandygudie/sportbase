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
      <div
        onClick={toggleDrawer(true)}
        role="button"
        className="flex text-sm items-center  gap-2 text-white"
      >
        <span className="font-normal">Filter </span>
        <TuneIcon className=" text-sm" />
      </div>
      <Drawer anchor={"right"} open={isOpen} onClose={toggleDrawer(false)}>
        <div className="flex px-4 py-2 items-center justify-between">
          <span className="flex items-center gap-2 text-base font-normal"><TuneIcon />Filter </span>
          <IconButton  onClick={() => setOpen(false)} aria-label="Close">
            {" "}
            <CloseIcon />
          </IconButton>
        </div>
        <div className="px-4 w-48">{children}</div>
      </Drawer>
    </div>
  );
}
