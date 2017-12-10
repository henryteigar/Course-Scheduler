import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Login from './containers/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

let jwt = localStorage.getItem('jwt');


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/login' component={Login}/>
        </Switch>
    </BrowserRouter>,
document.getElementById('app'));