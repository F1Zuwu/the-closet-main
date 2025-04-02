import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


// CUSTOM + TAILWINDCSS
import './index.css';

// CONTIANERS
import Home from './container/Home';
import Add from './container/Add';
import Login from './container/Login';
import Register from './container/Reigster';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            {/* MAIN */}
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<Add />} />

            {/* AUTH */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root'),
);