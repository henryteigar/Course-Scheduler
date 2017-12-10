import React, { Component } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import MainContainer from './MainContainer/MainContainer';
import UserStore from 'client/stores/UserStore';
import * as LoginAction from 'client/actions/LoginAction';

import '../css/main.scss';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        };

    }

    componentDidMount() {
        LoginAction.fetchUser();
    }

    componentWillMount() {
        UserStore.on("change", () => {
            this.setState({user: UserStore.getUser()});
            if (UserStore.getUser() === null) {
                this.props.history.push("/login")
            }
        });
    }

    render() {

        return (
            <div>
                <Sidebar />
                <MainContainer user={this.state.user}/>
            </div>
        )
    }
}

export default App;