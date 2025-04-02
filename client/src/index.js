import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';

import './index.css';

//containers
import Home from './container/Home';
import Add from './container/Add';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<Add />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root'),
);