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
        backgroundColor: [],
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
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    const fetchFieldData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/fields");
        const data = await response.json();

        const labels = data.map((field) => field.fieldName);
        const sizes = data.map((field) => field.size);

        // Alternate bar colors
        const barColors = sizes.map((_, index) =>
          index % 2 === 0 ? "#93C572" : "#B4C424"
        );

        setBarChartData({
          labels,
          datasets: [
            {
              label: "Field Sizes (acres)",
              data: sizes,
              backgroundColor: barColors,
            },
          ],
        });

        setCardData((prevState) => ({
          ...prevState,
          totalFields: data.length,
        }));
      } catch (error) {
        console.error("Error fetching field data:", error);
      }
    };

    const fetchWeatherData = async () => {
      try {
        const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
        const city = "Malabe";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        setWeatherData({
          temperature: `${data.main.temp}°C`,
          condition: data.weather[0].description,
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

        setCardData((prevState) => ({
          ...prevState,
          totalCrops: data.length,
        }));
      } catch (error) {
        console.error("Error fetching crop data:", error);
      }
    };
    const fetchstaffData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/staffs");
        const data = await response.json();
        setStaffs(data);

        setCardData((prevState) => ({
          ...prevState,
          totalStaffs: data.length,
        }));
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchFieldData();
    fetchWeatherData();
    fetchCropData();
    fetchstaffData();

    const timeInterval = setInterval(() => {
      setWeatherData((prev) => ({
        ...prev,
        time: new Date().toLocaleTimeString(),
      }));
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

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
