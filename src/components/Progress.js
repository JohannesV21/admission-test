import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function Progress() {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <CircularProgress />
        <h2>Loading...</h2>
      </Box>
    </Box>
  );
}
