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
import { filterListHandler } from "@/utilis/filterlist";
import { addFilterItem, removedFilterItem } from "@/utilis/filtered";
import DoneIcon from "@mui/icons-material/Done";

type Props = {
  collection: Product[];
  collectionSlug: string;
  updateFilterCollection: (filteredCollection: Product[]) => void;
};

function FilterComponent({
  collection,
  updateFilterCollection,
  collectionSlug,
}: Props) {
  const [expanded, setExpanded] = useState<string | false>("");
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [currentFilteredItems, setCurrentFilteredItems] = useState<Product[]>(
    []
  );

  useEffect(() => {
    updateFilterCollection(currentFilteredItems);
  }, [currentFilteredItems]);

  let temp_collection = [...collection];
  const filterList = filterListHandler(temp_collection, collectionSlug);

  const filterItemsQuantity = (key: string, value: any) =>
    temp_collection.filter(
      (x: Product | any) => x[key] == value || x[key]?.includes(value)
    ).length;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) =>
      setExpanded(newExpanded ? panel : false);

  const ToggleFilterItems = (selectedItem: string) => {
    let filtered: Product[] | any;
    if (selectedList.includes(selectedItem)) {
      filtered = removedFilterItem(
        expanded,
        selectedItem,
        currentFilteredItems
      );
      setSelectedList((selectedList) =>
        selectedList.filter((ele) => ele !== selectedItem)
      );

      setCurrentFilteredItems(filtered);
    } else {
      setSelectedList((selectedList) => [...selectedList, selectedItem]);
      filtered = addFilterItem(expanded, selectedItem, temp_collection);
      const new_filtered = filtered.filter((obj1: { _id: string }) =>
        currentFilteredItems.every(
          (obj2: { _id: string }) => obj1._id !== obj2._id
        )
      );
      setCurrentFilteredItems((currentFilteredItems) => [
        ...new_filtered,
        ...currentFilteredItems,
      ]);
    }
    updateFilterCollection(currentFilteredItems);
  };

  return (
    <div className="relative">
      {" "}
      {filterList.map((ele: any) => {
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
                                className={`${
                                  item === "White"
                                    ? "border-solid border-gray-200 border-[2px] p-1"
                                    : " p-1.5 "
                                } rounded-full h-4 w-4`}
                              ></div>
                            }
                            checkedIcon={
                              <div
                                style={{ backgroundColor: item }}
                                className={`${
                                  item === "White"
                                    ? "border-solid border-gray-200  border-[2px] p-1"
                                    : " p-1.5 "
                                } rounded-full h-4 w-4`}
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
                          onChange={() => ToggleFilterItems(item)}
                        />
                      }
                      label={
                        <div className="flex items-center gap-6">
                          <p>{item}</p>
                          <p className="p-3 text-xs bg-gray-100 flex items-center justify-center rounded-full w-3 text-sm h-3 p-2 ">
                            {filterItemsQuantity(ele.name, item)}
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
