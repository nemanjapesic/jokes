import React from "react";

import { Box, CircularProgress } from "@material-ui/core";

const Spinner = () => {
  return (
    <Box textAlign="center" p={4}>
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default Spinner;
