import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export const Navigation = () => {
  return <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed" style={{ backgroundColor: '#2f3269' }}>
      <Container>
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
            <strong>Customer.io</strong>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </Container>
    </AppBar>
  </Box>
}