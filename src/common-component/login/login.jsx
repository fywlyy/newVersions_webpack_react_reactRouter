import React from 'react';
import { hashHistory } from 'react-router';
import API from '../../api/api.js';
import Util from '../../common-component/util/util.js';

export default class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userList: [],
        }
    }
    componentDidMount() {
    	let _this = this;

		Util.ajaxRequest({
			url: API.getUserList,
			type: 'GET',
			successCbk: (req) => {
				console.log(req);
                _this.setState({
                    userList: req
                });
			}
		})
    }
    render() {
    	let { userList } = this.state;
        return(
            <div className="container home-page">
            	<h1>用户列表</h1>
            	<ul>
            	{
            		userList.map((item,index) => {
            			return (<li key={index}>{item.name}</li>)
            		})
            	}
            	</ul>
            </div>
        );
    }
}

module.exports = HomePage;