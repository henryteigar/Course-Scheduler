import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <switch>
            <Route exact path='/' component={App} />
            <Route path='/test' component={App} />
        </switch>
    </BrowserRouter>,
document.getElementById('app'));