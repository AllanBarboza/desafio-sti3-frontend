import React, { useState } from 'react';
import Header from './Components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import SingIn from './Pages/SingIn';
import Register from './Pages/Register';
import ProtectRoute from './ProtectRoute';
import { Router } from '@mui/icons-material';

function App() {

  const [isAuth, setIsAuth] = useState(false)
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/login' Component={() => <SingIn setIsAuth={setIsAuth} />} />
        <Route path='/register' Component={Register} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
