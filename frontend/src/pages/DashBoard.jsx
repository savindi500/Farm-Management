import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Field Sizes (acres)",
        data: [],
        backgroundColor: "#42a5f5",
      },
    ],
  });

  const [cardData, setCardData] = useState({
    totalCrops: 0,
    totalFields: 0,
    totalStaff: 0,
    availableVehicles: 0,
  });

  const [weatherData, setWeatherData] = useState({
    temperature: "Loading...",
    condition: "Loading...",
    time: new Date().toLocaleTimeString(),
  });

  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const fetchFieldData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/fields");
        const data = await response.json();

        const labels = data.map((field) => field.fieldName);
        const sizes = data.map((field) => field.size);

        setBarChartData({
          labels,
          datasets: [
            {
              label: "Field Sizes (acres)",
              data: sizes,
              backgroundColor: "#42a5f5",
            },
          ],
        });

        // Set the total fields and the staff count (you can replace it with real data)
        setCardData({
          totalFields: data.length,
          totalCrops: crops.length, // Set crops length dynamically
          totalStaff: 20, // Assuming static number for now
          availableVehicles: 2, // Replace with real data if available
        });
      } catch (error) {
        console.error("Error fetching field data:", error);
      }
    };

    const fetchWeatherData = async () => {
      try {
        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
        const searchEngineId = process.env.REACT_APP_SEARCH_ENGINE_ID;

        const query = "current weather in Malabe";

        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${query}`
        );
        const data = await response.json();

        const snippet = data.items[0].snippet;
        const [condition, temperature] = snippet.split(", ");

        setWeatherData({
          temperature: temperature || "N/A",
          condition: condition || "N/A",
          time: new Date().toLocaleTimeString(),
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const fetchCropData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/crops");
        const data = await response.json();
        setCrops(data);
        // Update the total crops dynamically when crops data is fetched
        setCardData((prevState) => ({
          ...prevState,
          totalCrops: data.length,
        }));
      } catch (error) {
        console.error("Error fetching crop data:", error);
      }
    };

    fetchFieldData();
    fetchWeatherData();
    fetchCropData();

    const timeInterval = setInterval(() => {
      setWeatherData((prev) => ({
        ...prev,
        time: new Date().toLocaleTimeString(),
      }));
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [crops.length]);

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Weather</Typography>
              <Typography>Temperature: {weatherData.temperature}</Typography>
              <Typography>Condition: {weatherData.condition}</Typography>
              <Typography>Time: {weatherData.time}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Crops</Typography>
              <Typography variant="h4">{cardData.totalCrops}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Fields</Typography>
              <Typography variant="h4">{cardData.totalFields}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Staff</Typography>
              <Typography variant="h4">{cardData.totalStaff}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: "20px" }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Field Sizes</Typography>
            <Box sx={{ height: "300px" }}>
              <Bar data={barChartData} options={barChartOptions} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ marginTop: "20px" }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Available Crops</Typography>
            <Grid container spacing={2}>
              {crops.map((crop, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card>
                    <CardContent>
                      <img
                        src={crop.image}
                        alt={crop.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          margin: "0 auto",
                        }}
                      />
                      <Typography align="center">{crop.commonName}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
