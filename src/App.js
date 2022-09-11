import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Navigation } from './components/Navigation';
import { AppRouter } from './components/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/styles';
import { theme } from './Theme/index';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Router>
          <Navigation />
          <Container fixed>
            <Box sx={{ height: '100vh', paddingTop: 12 }}>
              <AppRouter />
            </Box>
          </Container>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App;
