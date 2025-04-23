"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
} from "@mui/material";

import { useTranslation } from "react-i18next";


const topValues = [100, 7, 107, 3, 104];

export default function FirstPage() {
  const [inputValues, setInputValues] = useState(["", "", "", "", ""]);
  const [calculatedValues, setCalculatedValues] = useState(["", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(null);
  const handleChange = (index, input) => {
    const newInputs = [...inputValues];
    newInputs[index] = input;
    setInputValues(newInputs);
    setErrorMessage("");
    setCalculated(false);
    setSourceIndex(null);
  };
  const { t } = useTranslation();

  const handleGo = () => {
    const filled = inputValues.filter((v) => v !== "");

    if (filled.length > 1) {
      setErrorMessage("กรุณากรอกตัวเลขในช่องเดียวเท่านั้น");
      return;
    }

    const index = inputValues.findIndex((v) => v !== "");
    const inputValue = parseFloat(inputValues[index]);

    if (!isNaN(inputValue)) {
      const ratio = inputValue / topValues[index];
      const result = topValues.map((val) => (val * ratio).toFixed(2));
      setCalculatedValues(result);
      setCalculated(true);
      setSourceIndex(index);
    } else {
      setErrorMessage("กรุณากรอกตัวเลขที่ถูกต้อง");
    }
  };

  const handleClear = () => {
    setInputValues(["", "", "", "", ""]);
    setCalculatedValues(["", "", "", "", ""]);
    setErrorMessage("");
    setCalculated(false);
    setSourceIndex(null);
  };

  return (
    <Box sx={{ mt: 7 }}>
    <Typography variant="h5" gutterBottom>
      {t("question2.title")}
    </Typography>

    <Typography variant="subtitle1" gutterBottom>
      {t("question2.description")}
    </Typography>

    <ul style={{ marginTop: 0, marginBottom: 16 }}>
      <li>{t("question2.rule1")}</li>
      <li>{t("question2.rule2")}</li>
      <li>{t("question2.rule3")}</li>
    </ul>

    <Typography variant="body2" sx={{ mb: 2 }}>
      {t("question2.example")}:&nbsp;
      <Link
        href="https://www.trcloud.co/test/quiz2.php"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://www.trcloud.co/test/quiz2.php
      </Link>
    </Typography>


      <table border="1" cellPadding={5} style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {topValues.map((val, index) => (
              <th key={index}>
                <strong>{val}</strong>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {topValues.map((_, index) => (
              <td key={index}>
                <TextField
                  fullWidth
                  variant="standard"
                  value={
                    inputValues[index] !== ""
                      ? inputValues[index]
                      : (calculated && sourceIndex !== null && index !== sourceIndex
                          ? calculatedValues[index]
                          : "")
                  }
                  onChange={(e) => handleChange(index, e.target.value)}
                  inputProps={{
                    style: { textAlign: "center" },
                  }}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {errorMessage && (
        <Typography color="error" sx={{ mt: 1 }}>
          {errorMessage}
        </Typography>
      )}

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" sx={{ mr: 2 }} onClick={handleGo}>
          GO
        </Button>
        <Link component="button" variant="body2" onClick={handleClear}>
          Clear
        </Link>
      </Box>
    </Box>
  );
}
