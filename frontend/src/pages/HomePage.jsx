import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Box, Card, CardMedia, CardContent, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Fade, Slide } from 'react-awesome-reveal';

const HomePage = () => {
  return (
    <div>
      {/* Header Section */}
      <AppBar position="static" sx={{ backgroundColor: '#B4C424' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Agrimo
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/028/288/558/non_2x/closeup-corn-cobs-in-corn-plantation-field-generative-ai-free-photo.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Fade>
          <Typography variant="h3" fontWeight="bold">Welcome to Agrimo</Typography>
          <Typography variant="h6" mt={2}>
            Revolutionizing Agriculture for a Better Tomorrow
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 4, backgroundColor: '#fff', color: '#6b8e23', fontWeight: 'bold' }}
          >
            Learn More
          </Button>
        </Fade>
      </Box>

      {/* About Us Section */}
      <Box sx={{ py: 6, backgroundColor: '#f0f8ff' }}>
        <Container>
          <Slide direction="left">
            <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" align="center" sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
              Agrimo is dedicated to enhancing agricultural productivity through innovative solutions and sustainable practices. We strive to create a positive impact on farmers and communities worldwide.
            </Typography>
          </Slide>
        </Container>
      </Box>

      {/* Services Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Best Agriculture Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: 'center', padding: 2 }}>
                <CardMedia
                  component="img"
                  sx={{
                    height: 200,
                    width: '100%',
                    objectFit: 'cover', // Ensures images cover the area without distortion
                  }}
                  image={service.image}
                  alt={service.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Latest News Section */}
      <Box sx={{ py: 6, backgroundColor: '#fafafa' }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            Latest News
          </Typography>
          <Grid container spacing={4}>
            {news.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    sx={{
                      height: 200,
                      width: '100%',
                      objectFit: 'cover',
                    }}
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        {faq.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      {/* Footer */}
      <Box sx={{ py: 4, backgroundColor: '#B4C424', color: '#fff', mt: 4 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Agrimo
              </Typography>
              <Typography variant="body2">
                Revolutionizing Agriculture for a Better Tomorrow.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Quick Links
              </Typography>
              <Typography variant="body2">Home</Typography>
              <Typography variant="body2">Dashboard</Typography>
              <Typography variant="body2">Services</Typography>
              <Typography variant="body2">Contact</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FacebookIcon />
                <TwitterIcon />
                <InstagramIcon />
                <LinkedInIcon />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2">info@agrimo.com</Typography>
              <Typography variant="body2">+1 234 567 890</Typography>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} Agrimo. All Rights Reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

const services = [
  { title: 'Harvest Excellence', description: 'Efficient and reliable crop harvesting.', image: 'https://images.pexels.com/photos/1486976/pexels-photo-1486976.jpeg' },
  { title: 'Farming Research', description: 'Innovative farming solutions.', image: 'https://i.pinimg.com/736x/d1/22/b2/d122b250ced35523ad6961b84b238b6b.jpg' },
  { title: 'Soil Conservation', description: 'Protect and preserve soil health.', image: 'https://img.freepik.com/free-photo/growing-life-concept-with-flowers_23-2149243611.jpg?t=st=1736344213~exp=1736347813~hmac=d48fe905a4b7e5726999a217761e62ca3d76035ec69e8868cf135a13bbfc8e8a&w=360' },
];

const news = [
  { title: 'Agriculture Trends 2025', description: 'Stay updated with the latest trends.', image: 'https://img.freepik.com/free-photo/farming-concept-with-pumpkin-goats_23-2149629531.jpg?t=st=1736344335~exp=1736347935~hmac=b6f9636ab4b5364826f3e5b3dfadad76a06accd3fece646d42e97f58adde7607&w=740' },
  { title: 'Innovative Tools for Farmers', description: 'Discover cutting-edge technology.', image: 'https://img.freepik.com/free-photo/futuristic-technology-concept_23-2151908084.jpg?t=st=1736344457~exp=1736348057~hmac=5caf4b0ccac3728ec8a7884c9695c21e03dbee849af6d8a75e0efac34fcba750&w=900' },
  { title: 'Global Farming Practices', description: 'Learn from the best practices globally.', image: 'https://media.istockphoto.com/id/2041616190/photo/autonomous-agriculture-vehicle-and-drone-are-working-in-agricultural-plot-agriculture.jpg?s=2048x2048&w=is&k=20&c=iRdabNr8ybcw4zDOEUTQPu9XlmzcPswnxfjsqwDr_9k=' },
];

const faq = [
  { question: 'What services do you offer?', answer: 'We offer crop management, soil conservation, and more.' },
  { question: 'How can I contact Agrimo?', answer: 'Reach us at info@agrimo.com or +1 234 567 890.' },
  { question: 'Do you provide organic products?', answer: 'Yes, we offer a wide range of organic products.' },
];

export default HomePage;
