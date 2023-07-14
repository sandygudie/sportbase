/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, useEffect, useState } from "react";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {
  filterElement_accesories,
  filterElement_apparels,
  filterElement_footwear,
} from "../data";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Product } from "@/types";
import TuneIcon from "@mui/icons-material/Tune";
import useMediaquery from "@/hooks/useMediaquery";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  collection: Product[];
  collectionSlug: string;
  setOpen?: Dispatch<React.SetStateAction<boolean>>;
};

function FilterComponent({ collection, setOpen, collectionSlug }: Props) {
  const [expanded, setExpanded] = useState<number | false>();
  const [filterElement, setFilterElement] = useState<any[]>([]);
  const matches = useMediaquery();
  useEffect(() => {
    if (collectionSlug === "apparels") {
      setFilterElement(filterElement_apparels);
    } else if (collectionSlug === "accessories") {
      setFilterElement(filterElement_accesories);
    } else {
      setFilterElement(filterElement_footwear);
    }
  }, []);
  let itemQuantity = (key: string, value: any) =>
    collection.filter(
      (x: Product | any) => x[key] == value || x[key]?.includes(value)
    ).length;

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) =>
      setExpanded(newExpanded ? panel : false);

  return (
    <div className={`${matches && `px-4`}`}>
      {" "}
      <p className="mb-6 flex items-center justify-between">
        <span className="text-base font-normal">Filter </span>
        {setOpen && matches ? (
          <CloseIcon onClick={() => setOpen(false)} />
        ) : (
          <TuneIcon />
        )}
      </p>
      {filterElement.map((ele) => {
        return (
          <MuiAccordion
            key={ele.id}
            expanded={expanded === ele.id}
            onChange={handleChange(ele.id)}
          >
            <MuiAccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              className={`${!matches && `bg-gray-100`}`}
            >
              <div className="w-full flex items-center justify-between">
                <Typography>{ele.name}</Typography>
                {expanded === ele.id ? (
                  <RemoveIcon sx={{ fontSize: "0.9rem" }} />
                ) : (
                  <AddIcon sx={{ fontSize: "0.9rem" }} />
                )}
              </div>
            </MuiAccordionSummary>
            <MuiAccordionDetails>
              <FormGroup>
                {ele.selection.map((item: string, index: number) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox />}
                    label={
                      <div className="flex items-center gap-6">
                        <p>{item}</p>
                        <p className="p-3 text-xs bg-gray-100 flex items-center justify-center rounded-full w-3 text-sm h-3 p-2 ">
                          {itemQuantity(ele.name, item)}
                        </p>
                      </div>
                    }
                  />
                ))}
              </FormGroup>
            </MuiAccordionDetails>
          </MuiAccordion>
        );
      })}
    </div>
  );
}

export default FilterComponent;
