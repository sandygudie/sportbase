import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Button } from "@mui/material";
import Link from "next/link";
import { banner } from "@/data";

export default function Swipeable() {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: "100%", flexGrow: 1, margin: "auto" }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        className="w-full"
      >
        {banner.map((step, index) => (
          <div key={step.label} className="w-full">
            {Math.abs(activeStep - index) <= 2 ? (
              <Link href={""}>
                <div
                  style={{
                    backgroundImage: `url(${step.imgPath})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundColor: "#f6f6f6",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="h-[500px] w-full"
                ></div>
                <div className="p-6 absolute bottom-10 ">
                  <p className=" w-64 text-2xl font-bold md:w-96 text-white lg:text-3xl pb-6">
                    {step.label?.toUpperCase()}
                  </p>
                  <Button
                    className="text-sm md:text-[16px] text-white  w-36 font-bold p-3"
                    variant="contained"
                  >
                    SHOP NOW{" "}
                  </Button>{" "}
                </div>
              </Link>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
}
