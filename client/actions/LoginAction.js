import axios from 'axios';


export function login(credentials) {
    let axoisConf = {
        baseURL: process.env.API_BASE_URL,
        timeout: 10000,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    return axios.create(axoisConf)
        .post('login',
            {
                'username': credentials.username,
                'password': credentials.password
            }
        )
        .then((res) => {
            let jwt = res.data.jwt;


        });




};

export function logout() {

};

