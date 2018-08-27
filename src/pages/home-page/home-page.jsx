import React from 'react';
import API from '../../api/api.js';
import Util from '../../common-component/util/util.js';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import Header from '../../common-component/header/header.jsx';

import './home-page.scss';

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    handleLogin(e) {

        this.props.history.push("/login");
    }
    render() {
    	let { userList } = this.state;
        return(
            <div className="container hasFixed home-page">
                <Header />
                <Picker set='emojione' />
                <div className="btn-module"><button type="button" className="btn primary" onClick={(e) => this.handleLogin(e)}>登陆</button></div>
            </div>
        );
    }
}

export default HomePage;