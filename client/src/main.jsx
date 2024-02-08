import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";

import { store } from "./app/store";

import "./css/main.css";

import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';

import Home from './pages/Home/index.jsx'
import SignIn from './pages/SignIn/index.jsx'
import User from './pages/User/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/user' element={<User />} />
          </Routes>
          <Footer />
        </Router>
    </Provider>
  </React.StrictMode>,
)
