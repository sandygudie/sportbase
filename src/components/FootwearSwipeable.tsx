import React from 'react'
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Button } from "@mui/material";
import Link from "next/link";


type Props = {
    items: any[];
  };
  
export default function FootwearSwipeable({ items }: Props) {
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
  
    const handleStepChange = (step: number) => {
      setActiveStep(step);
    };
  
    return (
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {items.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <div >
                  <div
                    style={{
                      backgroundImage: `url(${step.imgPath})`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="h-[500px]"
                  ></div>
                  <div className=" border border-1 border-solid w-64 text-center mx-auto p-6 font-bold text-lg">
                  {step.label?.toUpperCase()}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </Box>
    );
  }
  