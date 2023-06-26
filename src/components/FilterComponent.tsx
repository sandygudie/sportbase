import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {
  category,
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

type Props = {
  products: Product[];
  productSlug: string;
};

function FilterComponent({ products, productSlug }: Props) {
  const [expanded, setExpanded] = useState<number | false>();
  const [filterElement, setFilterElement] = useState<any[]>([]);


  useEffect(() => {

   if (productSlug === "apparels") {
      setFilterElement(filterElement_apparels);
    } else if (productSlug === "accessories") {
      setFilterElement(filterElement_accesories);
    }else{
      setFilterElement(filterElement_footwear);
    }
  }, [filterElement]);
  let countValue = (key: string, value: any) =>
    products.filter(
      (x: Product | any) => x[key] == value || x[key]?.includes(value)
    ).length;

  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {},
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary {...props} />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    padding: "10px 16px",
    margin: "0px",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {},
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div className="sticky top-36 w-1/6 font-bold text-xl">
      {" "}
      {filterElement.map((ele) => {
        return (
          <Accordion
            key={ele.id}
            expanded={expanded === ele.id}
            onChange={handleChange(ele.id)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <div className="w-full flex items-center justify-between">
                <Typography>{ele.name}</Typography>
                {expanded === ele.id ? (
                  <RemoveIcon sx={{ fontSize: "0.9rem" }} />
                ) : (
                  <AddIcon sx={{ fontSize: "0.9rem" }} />
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {ele.selection.map((item:string, index:number) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox />}
                    label={
                      <div className="flex items-center gap-6">
                        <p>{item}</p>
                        <p className="p-3 text-xs bg-gray-100 flex items-center justify-center rounded-full w-3 text-sm h-3 p-2 ">
                          {countValue(ele.name, item)}
                        </p>
                      </div>
                    }
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

export default FilterComponent;
