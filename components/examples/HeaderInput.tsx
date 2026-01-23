"use client";

import { useState } from "react";
import { Box, TextField, Typography, Container } from "@mui/material";

export default function HeaderInput() {
  const [inputValue, setInputValue] = useState("");

  return (
    <Container maxWidth="lg" className="py-4">
      <Box className="bg-blue-50 p-4 rounded-lg">
        <Typography variant="h6" className="mb-3">
          Layout Input (Persists between routes)
        </Typography>
        <TextField
          fullWidth
          label="Type something - this will persist when navigating"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          helperText="This input is in the layout, so state persists across route changes"
        />
        {inputValue && (
          <Typography variant="body2" className="mt-2">
            You typed: {inputValue}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
