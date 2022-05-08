import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavbarC from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <NavbarC />
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  )
}

export default App;
