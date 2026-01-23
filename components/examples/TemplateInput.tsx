"use client";

import { useState } from "react";
import { Box, TextField, Typography, Container } from "@mui/material";

export default function TemplateInput() {
  const [inputValue, setInputValue] = useState("");

  return (
    <Container maxWidth="lg" className="py-4">
      <Box className="bg-green-50 p-4 rounded-lg">
        <Typography variant="h6" className="mb-3">
          Template Input (Resets on navigation)
        </Typography>
        <TextField
          fullWidth
          label="Type something - this will reset when navigating"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          helperText="This input is in the template, so state resets on route changes"
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
