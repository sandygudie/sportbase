/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, useEffect, useState } from "react";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Product } from "@/types";

import useMediaquery from "@/hooks/useMediaquery";

import { filterList } from "@/utilis";

type Props = {
  collection: Product[];
  collectionSlug: string;
  category: string;
};

function FilterComponent({ collection, category, collectionSlug }: Props) {
  const [expanded, setExpanded] = useState<number | false>();
  const matches = useMediaquery();

  useEffect(() => {}, []);
  let temp_collection = [...collection];
  let filterElement = filterList(temp_collection, collectionSlug, category);

  let itemQuantity = (key: string, value: any) =>
    collection.filter(
      (x: Product | any) => x[key] == value || x[key]?.includes(value)
    ).length;

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) =>
      setExpanded(newExpanded ? panel : false);

  return (
    <div className="relative">
      {" "}
      {filterElement.map((ele: any) => {
        return (
          <MuiAccordion
            key={ele.name}
            expanded={expanded === ele.name}
            onChange={handleChange(ele.name)}
          >
            <MuiAccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              className={`${!matches && `bg-gray-100`}`}
            >
              <div className="w-full flex items-center justify-between">
                <Typography>{ele.name}</Typography>
                {expanded === ele.name ? (
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
