import axios from 'axios';
import dispatcher from '../dispatcher/Dispatcher';
import { LoginConstants } from '../constants/LoginConstants';


export function login(credentials) {
    dispatcher.dispatch({
        type: LoginConstants.LOGIN_ATTEMPT,
        credentials: credentials
    });
}

export function logout() {
    dispatcher.dispatch({
        type: LoginConstants.LOGOUT
    });
}