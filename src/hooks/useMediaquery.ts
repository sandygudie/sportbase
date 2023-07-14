import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function useMediaquery() {
  const matches = useMediaQuery("(max-width:1200px)");
  return matches;
}
