"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Link,
  useTheme,
} from "@mui/material";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function FourthPage() {
  const [data, setData] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);
  const theme = useTheme();
  const { t, ready } = useTranslation();

  useEffect(() => {
    setHasMounted(true);
    axios.get("https://www.trcloud.co/test/api.php").then((res) => {
      setData(res.data);
    });
  }, []);

  if (!hasMounted || !ready) return null;

  const labels = data.map((item) => item.City);
  const values = data.map((item) => parseInt(item.Population));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Range by country",
        data: values,
        backgroundColor: [
          "#FFE0E6", "#D7ECFB", "#FFF5DD", "#DBF2F2", "#EBE0FF",
          "#F8C8DC", "#C2EBFF", "#FFF1BF", "#B3E5E5", "#E1D0FF"
        ],
        borderWidth: 1,
      },
    ],
  };

  const tooltipStyle = {
    callbacks: {
      label: (context) => context.formattedValue,
    },
    bodyColor: theme.palette.mode === "dark" ? "#fff" : "#000",
    titleColor: theme.palette.mode === "dark" ? "#fff" : "#000",
    backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff",
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "center",
        labels: {
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          usePointStyle: false,
          boxWidth: 30,
          boxHeight: 12,
          padding: 12,
        },
      },
      tooltip: tooltipStyle,
    },
    scales: {
      x: {
        ticks: {
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
        },
      },
      y: {
        ticks: {
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "center",
        labels: {
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          usePointStyle: false,
          boxWidth: 30,
          boxHeight: 12,
          padding: 12,
        },
      },
      tooltip: tooltipStyle,
    },
  };

  return (
    <Box sx={{ mt: 7 }}>
      <Typography variant="h5" gutterBottom>{t("question4.title")}</Typography>
      <Typography variant="subtitle1" gutterBottom>{t("question4.description")}</Typography>

      <ul style={{ marginTop: 0, marginBottom: 16 }}>
        <li>{t("question4.rule1")}</li>
        <li>{t("question4.rule2")}</li>
        <li>{t("question4.rule3")}</li>
      </ul>

      <Typography variant="body2" sx={{ mb: 2 }}>
        {t("question4.example")}:&nbsp;
        <Link
          href="https://www.trcloud.co/test/quiz4.php"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.trcloud.co/test/quiz4.php
        </Link>
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400, width: 600 }}>
            <Bar data={chartData} options={barOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 400, width: 500 }}>
            <Pie data={chartData} options={pieOptions} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
