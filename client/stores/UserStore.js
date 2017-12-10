import dispatcher from '../dispatcher/Dispatcher';
import {EventEmitter} from 'events';
import axios from 'axios';
import {LoginConstants} from "client/constants/LoginConstants";
import {LoginAction} from 'client/actions/LoginAction'
import { browserHistory } from 'react-router'


class UserStore extends EventEmitter {
    constructor() {
        super();
        this.user = null;
        this.errorMsg = null;
        this.jwt = localStorage.getItem('token');
        this.axoisConf = {
            baseURL: process.env.API_BASE_URL,
            timeout: 10000,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
    }

    getUser() {
        return this.user;
    }

    fetchUser() {
        if (this.jwt) {
            let conf = this.axoisConf;
            conf.headers['x-access-token'] = this.jwt;
            axios.create(conf).get('user')
                .then((response) => {
                    this.user = response.data[0];
                    this.emit("change");
                })
                .catch((error) => {
                    this.user = null;
                    console.log(error);
                    this.emit("change");
                });
        } else {
            this.user = null;
            this.emit("change");
        }

    }

    loginAttempt(credentials) {
        return axios.create(this.axoisConf)
            .post('login',
                {
                    'username': credentials.username,
                    'password': credentials.password
                }
            )
            .then((res) => {
                this.jwt = res.data.jwt;
                localStorage.setItem('token', this.jwt);
                userStore.fetchUser();
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    this.errorMsg = "Both fields are required!"
                } else if (err.response.status === 401) {
                    this.errorMsg = "Username or password incorrect!"
                } else {
                    this.errorMsg = "Sorry, come back later!"
                }
                this.emit("change");
            });
    }

    logout() {
        this.user = null;
        this.jwt = null;
        localStorage.removeItem('token');
    }

}

dispatcher.register((action) => {
    switch (action.type) {
        case LoginConstants.LOGIN_ATTEMPT:
            userStore.loginAttempt(action.credentials);
            break;
        case LoginConstants.LOGOUT:
            userStore.logout();
            break;
        case LoginConstants.FETCH_USER:
            userStore.fetchUser();
            break;

    }
});

const userStore = new UserStore();
export default userStore;