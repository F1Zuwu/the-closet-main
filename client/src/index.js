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
import ViewItem from './container/ViewItemNew';
import NotFound from './container/NotFound';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            {/* MAIN */}
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<Add />} />
            <Route path='/outfit/:id' element={<ViewItem />} />

            {/* AUTH */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* ERR */}
            <Route path='/*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root'),
);