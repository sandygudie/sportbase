/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

import Drawer from "@mui/material/Drawer";

import MenuIcon from "@mui/icons-material/Menu";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { collections, dropdownNav } from "@/data";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";

function SideNav() {
  const [isOpen, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | false>();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) =>
      setOpen(open);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) =>
      setExpanded(newExpanded ? panel : false);

  const list = () => (
    <div className="w-64" role="presentation">
      <div className="flex items-center justify-between py-2 px-4 border-b-[1px] border-x-0 border-t-0 border-b-gray-200/50 border-solid">
        <Link className="" href="/">
          {" "}
          <img
            className=" w-6 md:w-10 h-10 2xl:w-20 2xl:h-20"
            src={"/images/sneakerbase-logo.svg"}
            alt="sneaker base logo"
          />{" "}
        </Link>
        <CloseIcon
          className="hover:text-primary"
          onClick={toggleDrawer(false)}
        />
      </div>
      {dropdownNav.map((ele) => {
        return (
          <MuiAccordion
            key={ele.id}
            expanded={expanded === ele.id}
            onChange={handleChange(ele.id)}
          >
            <MuiAccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <div className="w-full flex items-center justify-between">
                <p>{ele.name}</p>
                {expanded === ele.id ? (
                  <RemoveIcon sx={{ fontSize: "0.9rem" }} />
                ) : (
                  <AddIcon sx={{ fontSize: "0.9rem" }} />
                )}
              </div>
            </MuiAccordionSummary>
            <MuiAccordionDetails>
              <div>
                {ele.category.map((list: any) => {
                  return (
                    <Link
                      href={
                        ele.name === "Brand" || ele.name === "Gender"
                          ? `/collection/${list.name.toLowerCase()}`
                          : `/collection/${ele.name.toLowerCase()}?category=${list.name.toLowerCase()}`
                      }
                      key={list.id}
                      onClick={toggleDrawer(false)}
                      onKeyDown={toggleDrawer(false)}
                      className="my-4 text-sm px-3 flex justify-start items-start hover:text-primary"
                    >
                      {list.name}
                    </Link>
                  );
                })}
              </div>
            </MuiAccordionDetails>
          </MuiAccordion>
        );
      })}
      {collections.map((ele) => {
        return (
          <div key={ele.id} className="mx-4 my-8">
            <Link
              href={`/collection${ele.link.toLowerCase()}`}
              className="hover:no-underline"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              {ele.name}
            </Link>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="md:hidden text-left basis-full">
      <MenuIcon
        className="flex justify-center items-center"
        sx={{ fontSize: "20px" }}
        onClick={toggleDrawer(true)}
      />
      <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}

export default SideNav;
