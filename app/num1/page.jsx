"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function FirstPage() {
  const [number, setNumber] = useState("");
  const [stars, setStars] = useState([]);
  const [error, setError] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  const { t, ready } = useTranslation();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(number);

    if (isNaN(num) || num <= 0) {
      setError("กรุณาใส่เลขจำนวนเต็มบวก");
      setStars([]);
      return;
    }

    setError("");
    const lines = [];

    if (num % 2 === 1) {
      for (let i = num; i >= 1; i--) {
        lines.push("⭐".repeat(i));
      }
    } else {
      for (let i = 1; i <= num; i++) {
        lines.push("⭐".repeat(i));
      }
    }

    setStars(lines);
  };

  if (!hasMounted || !ready) return null;

  return (
    <Box sx={{ mt: 7 }}>
      <Typography variant="h5" gutterBottom>{t("menu.num1")}</Typography>
      <Typography variant="subtitle1" gutterBottom>{t("question1.description")}</Typography>

      <ul>
        <li>{t("question1.even")}</li>
        <li>{t("question1.odd")}</li>
      </ul>

      <Typography variant="body2">
        {t("question1.example")}:&nbsp;
        <Link
          href="https://www.trcloud.co/test/quiz1.php"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.trcloud.co/test/quiz1.php
        </Link>
      </Typography>

      <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
        <label>
          Number of Star:
          <TextField
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            size="small"
            error={Boolean(error)}
            helperText={error}
            sx={{
              mx: 2,
              width: "100px",
              "& .MuiFormHelperText-root": { whiteSpace: "nowrap" },
            }}
          />
        </label>
        <Button type="submit" variant="outlined">Go</Button>
      </form>

      <Box sx={{ mt: 3 }}>
        {stars.map((line, index) => (
          <div key={index} style={{ fontFamily: "monospace" }}>{line}</div>
        ))}
      </Box>
    </Box>
  );
}
