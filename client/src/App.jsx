import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './scenes/HomePage';
import Loginpage from './scenes/LoginPage';
import Profilepage from './scenes/ProfilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'; // Corrected import
import { themeSettings } from './theme';
import Forgotpassword from './scenes/Forgotpassword';
import Validateotp from './scenes/Validateotp';
import Verifyemail from './scenes/Verifyemail';
import Resetpassword from './scenes/Resetpassword';


function App() {
  const mode = useSelector((state) => state.mode);

  // Memoizing theme creation
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<Loginpage />} />
            <Route path='/home' element={isAuth ? <Homepage /> : <Navigate to="/"/>} />
            <Route path='/forgot-password' element={<Forgotpassword />} />
            <Route path='/validate' element={<Validateotp/>} />
            <Route path='/verify' element={<Verifyemail/>} />
            <Route path='/reset-password' element={<Resetpassword/>} />
            <Route path='/profile/:userId' element={isAuth ? <Profilepage /> :<Navigate to="/"/>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
