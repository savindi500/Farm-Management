import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Box, Card, CardMedia, CardContent } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const HomePage = () => {
  return (
    <div>
      {/* Header Section */}
      <AppBar position="static" sx={{ backgroundColor: '#6b8e23' }}>
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
                  height="200"
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

      {/* Products Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 6 }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            Choose What’s Perfect for Your Field
          </Typography>
          <Grid container spacing={4}>
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ textAlign: 'center', padding: 2 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          What Our Customers Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ padding: 2 }}>
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    “{testimonial.text}”
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mt: 2 }}>
                    - {testimonial.author}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer Section */}
<Box sx={{ backgroundColor: '#6b8e23', color: '#fff', py: 6 }}>
  <Container>
    <Grid container spacing={4}>
      {/* About Section */}
      <Grid item xs={12} md={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          🌿 About Agrimo
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ color: '#f5f5f5' }}>
          🌱 Agrimo is a modern, professional theme designed to help your business thrive 🌟 and stand out from the crowd.
        </Typography>
      </Grid>

      {/* Quick Links */}
      <Grid item xs={12} md={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          🚀 Quick Links
        </Typography>
        <Typography variant="body2" component="ul" sx={{ listStyle: 'none', pl: 0 }}>
          <li>🔗 <a href="/home" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
          <li>🌾 <a href="/services" style={{ color: '#fff', textDecoration: 'none' }}>Services</a></li>
          <li>📜 <a href="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</a></li>
          <li>📧 <a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a></li>
        </Typography>
      </Grid>

      {/* Contact Us */}
      <Grid item xs={12} md={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          📞 Contact Us
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ color: '#f5f5f5' }}>
          ✉️ Email: <a href="mailto:info@agrimo.com" style={{ color: '#fff', textDecoration: 'none' }}>info@agrimo.com</a>
          <br />
          📱 Phone: <a href="tel:+1234567890" style={{ color: '#fff', textDecoration: 'none' }}>+1 234 567 890</a>
        </Typography>
      </Grid>
    </Grid>

    {/* Social Media Links */}
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        🌐 Follow Us
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, fontSize: '1.5rem' }}>
        <a href="https://facebook.com" style={{ color: '#fff' }}>
          <FacebookIcon />
        </a>
        <a href="https://twitter.com" style={{ color: '#fff' }}>
          <TwitterIcon />
        </a>
        <a href="https://instagram.com" style={{ color: '#fff' }}>
          <InstagramIcon />
        </a>
        <a href="https://linkedin.com" style={{ color: '#fff' }}>
          <LinkedInIcon />
        </a>
      </Box>
    </Box>

    {/* Footer Text */}
    <Typography variant="body2" align="center" sx={{ mt: 4 }}>
      &copy; {new Date().getFullYear()} Agrimo 🌾 All rights reserved.
    </Typography>
  </Container>
</Box>


    </div>
  );
};

const services = [
  { title: 'Harvest Excellence', description: 'Efficient and reliable crop harvesting.', image: 'https://images.pexels.com/photos/1486976/pexels-photo-1486976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { title: 'Farming Research', description: 'Innovative farming solutions.', image: 'https://img.freepik.com/free-photo/female-biotechnologist-inspecting-potted-plants-plant-nursery-writing-notes-into-clipboard_637285-1682.jpg?t=st=1736237807~exp=1736241407~hmac=be243249ee27798a4e6fe77c35a8c244665fad9dfa76e9baf1890609c463be1c&w=996' },
  { title: 'Soil Conservation', description: 'Protect and preserve soil health.', image: 'https://img.freepik.com/free-photo/top-view-gardener-planting_23-2148200478.jpg?t=st=1736237943~exp=1736241543~hmac=74d40710eea767c15afc7971321958243595f640eddd6a168084798cf4ddd371&w=996' },
];

const products = [
  { name: 'Organic Corn', description: 'High-quality organic corn.', image: 'https://media.istockphoto.com/id/1485792634/photo/ripe-yellow-corn-cob-on-the-field.jpg?s=2048x2048&w=is&k=20&c=31l1Ff2Yde_evbYwI7fcTtTBwvGnmrIMJso-d4syIrg=' },
  { name: 'Fresh Vegetables', description: 'From farm to table.', image: 'https://images.unsplash.com/photo-1570142056130-9f6b59c6287a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Quality Fruits', description: 'Juicy and ripe fruits.', image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const testimonials = [
  { text: 'Amazing quality and service!', author: 'Jane Doe' },
  { text: 'The freshest produce I’ve ever had.', author: 'John Smith' },
  { text: 'Highly recommend for organic food lovers.', author: 'Emily Brown' },
];

export default HomePage;
