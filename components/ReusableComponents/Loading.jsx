"use client";

import { CircularProgress, Box, Typography } from "@mui/material";

export default function Loading({ 
  size = 40, 
  message = "Loading...", 
  fullScreen = false,
  height = "auto" 
}) {
  const content = (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      className={fullScreen ? "min-h-screen" : ""}
      style={{ minHeight: height === "auto" ? "200px" : height }}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" className="mt-4 text-gray-600">
          {message}
        </Typography>
      )}
    </Box>
  );

  return content;
}
