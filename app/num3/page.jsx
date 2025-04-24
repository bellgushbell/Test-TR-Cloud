"use client";

import React from "react";
import {
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";

import { useTranslation } from "react-i18next";



const array1 = [
  { code: 101, name: "AAA" },
  { code: 102, name: "BBB" },
  { code: 103, name: "CCC" },
];

const array2 = [
  { code: 103, city: "Singapore" },
  { code: 102, city: "Tokyo" },
  { code: 101, city: "Bangkok" },
];


const output = array1.map((item) => {
  const match = array2.find((el) => el.code === item.code);
  return {
    code: item.code,
    name: item.name,
    city: match ? match.city : "-",
  };
});

export default function ThirdPage() {

  const { t } = useTranslation();

  return (
    <Box sx={{ mt: 7 }}>
    <Typography variant="h5" gutterBottom>
        {t("question3.title")}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {t("question3.description")}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        {t("question3.example")}:&nbsp;
        <Link
          href="https://www.trcloud.co/test/quiz3.php"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.trcloud.co/test/quiz3.php
        </Link>
      </Typography>


    
      <Typography variant="subtitle1" sx={{ mt: 4 }}><strong>Array1</strong></Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 200, mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Code</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array1.map((row) => (
              <TableRow key={row.code}>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1"><strong>Array2</strong></Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 200 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Code</strong></TableCell>
              <TableCell><strong>City</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array2.map((row) => (
              <TableRow key={row.code}>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Divider sx={{ my: 4 }} />

    
      <Typography variant="subtitle1"><strong>Output</strong></Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Code</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>City</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {output.map((row) => (
              <TableRow key={row.code}>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
