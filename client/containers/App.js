import React, { Component } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import MainContainer from './MainContainer/MainContainer';
import UserStore from 'client/stores/UserStore';


import '../css/main.scss';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        UserStore.fetchUser();
        UserStore.on("change", () => {
            this.setState({user: UserStore.getUser()});
            console.log(this.state.user)
        });
    }



    render() {
        return (
            <div>
                <Sidebar />
                <MainContainer />
            </div>
        )
    }
}

export default App;