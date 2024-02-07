import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/index.jsx';

import Home from './pages/Home/index.jsx'
import SignIn from './pages/SignIn/index.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='sign-in' element={<SignIn />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
