/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Product } from "@/types";
import { filterList } from "@/utilis";
import { addFilterItem, removedFilterItem } from "@/utilis/filtered";
import DoneIcon from "@mui/icons-material/Done";

type Props = {
  collection: Product[];
  collectionSlug: string;
  category: string;
  handleCollectionChange: (collection: Product[]) => void;
};

function FilterComponent({
  collection,
  handleCollectionChange,
  category,
  collectionSlug,
}: Props) {
  const [expanded, setExpanded] = useState<string | false>("");
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [filteredCollection, setFilteredCollection] = useState<Product[]>([]);

  // useEffect(() => {
  //   handleCollectionChange(filteredCollection);
  // }, [filteredCollection]);

  let temp_collection = [...collection];
  let filterElement = filterList(temp_collection, collectionSlug, category);

  let itemQuantity = (key: string, value: any) =>
    collection.filter(
      (x: Product | any) => x[key] == value || x[key]?.includes(value)
    ).length;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) =>
      setExpanded(newExpanded ? panel : false);

  const ToggleFilterItems = (selected: string) => {
    let filtered: Product[] | any;
    if (selectedList.includes(selected)) {
      filtered = removedFilterItem(expanded, selected, filteredCollection);
      setSelectedList((selectedList) =>
        selectedList.filter((ele) => ele !== selected)
      );
      setFilteredCollection(filtered);
    } else {
      setSelectedList((selectedList) => [...selectedList, selected]);
      filtered = addFilterItem(expanded, selected, temp_collection);
      setFilteredCollection((filteredCollection) => [
        ...filteredCollection,
        ...filtered,
      ]);
    }
  };
console.log(filteredCollection)
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
            >
              <div
                className={`${
                  expanded === ele.name && `text-primary`
                } w-full flex items-center justify-between`}
              >
                <p className="text-sm font-normal">{ele.name}</p>
                {expanded === ele.name ? (
                  <RemoveIcon sx={{ fontSize: "0.9rem" }} />
                ) : (
                  <AddIcon sx={{ fontSize: "0.9rem" }} />
                )}
              </div>
            </MuiAccordionSummary>
            <MuiAccordionDetails>
              <FormGroup>
                {ele.name === "size" ? (
                  <div className="flex items-center flex-wrap ">
                    {ele.selection.map((item: string, index: number) => (
                      <FormControlLabel
                        className="m-0"
                        key={index}
                        control={
                          <Checkbox
                            icon={
                              <p className="w-[30px] text-center  border-solid font-medium border-[0.5px] text-[9px] text-dark px-2">
                                {item}
                              </p>
                            }
                            checkedIcon={
                              <p className="w-[30px] text-center  border-solid font-medium border-[0.5px] text-[9px] bg-dark text-white px-2">
                                {item}
                              </p>
                            }
                            className="p-1"
                            checked={selectedList.includes(item)}
                            onChange={() => {
                              ToggleFilterItems(item);
                            }}
                          />
                        }
                        label={""}
                      />
                    ))}
                  </div>
                ) : ele.name === "color" ? (
                  <div className="flex items-center flex-wrap ">
                    {ele.selection.map((item: string, index: number) => (
                      <FormControlLabel
                        className="m-0"
                        key={index}
                        control={
                          <Checkbox
                            icon={
                              <div
                                style={{ backgroundColor: item }}
                                className="border-solid rounded-full p-1 h-4 w-4"
                              ></div>
                            }
                            checkedIcon={
                              <div
                                style={{ backgroundColor: item }}
                                className="border-solid rounded-full p-1 h-4 w-4"
                              >
                                {selectedList.includes(item) && (
                                  <DoneIcon
                                    className={`${
                                      item === "White"
                                        ? "text-dark"
                                        : "text-white"
                                    } text-[16px]  mr-0 inline p-0`}
                                  />
                                )}
                              </div>
                            }
                            className="p-2"
                            checked={selectedList.includes(item)}
                            onChange={() => {
                              ToggleFilterItems(item);
                            }}
                          />
                        }
                        label={""}
                      />
                    ))}
                  </div>
                ) : (
                  ele.selection.map((item: string, index: number) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          className=""
                          checked={selectedList.includes(item)}
                          onChange={() => {
                            ToggleFilterItems(item),
                              console.log(filteredCollection);
                          }}
                        />
                      }
                      label={
                        <div className="flex items-center gap-6">
                          <p>{item}</p>
                          <p className="p-3 text-xs bg-gray-100 flex items-center justify-center rounded-full w-3 text-sm h-3 p-2 ">
                            {itemQuantity(ele.name, item)}
                          </p>
                        </div>
                      }
                    />
                  ))
                )}
              </FormGroup>
            </MuiAccordionDetails>
          </MuiAccordion>
        );
      })}
    </div>
  );
}

export default FilterComponent;
