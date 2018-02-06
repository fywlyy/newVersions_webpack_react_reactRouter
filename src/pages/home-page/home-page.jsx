import React from 'react';
import { hashHistory } from 'react-router';
import API from '../../api/api.js';
import Util from '../../common-component/util/util.js';

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
                <div className="btn-module"><button type="button" className="btn primary" onClick={(e) => this.handleLogin(e)}>登陆</button></div>
            </div>
        );
    }
}

export default HomePage;