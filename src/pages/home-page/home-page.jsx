import React from 'react';
import { hashHistory } from 'react-router';
import API from '../../api/api.js';
import Util from '../../common-component/util/util.js';

import Header from '../../common-component/header/header.jsx';

import './home-page.scss';

export default class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userList: [],
        }
        this.addUserData = {};
    }
    componentDidMount() {
    	let _this = this;

        this.getUserList((data) => {
            _this.setState({
                userList: data
            });            
        })
    }
    getUserList(callback) {
        Util.ajaxRequest({
            url: API.getUserList,
            type: 'GET',
            successCbk: (req) => {
                console.log(req);
                callback && callback(req);
            }
        })
    }
    handleChange(e,type) {
        this.addUserData[type] = e.target.value;
    }
    handleSubmit(e) {
        let _this = this;
        let { name, phoneNum } = this.addUserData;

        if(!name){
            Util.alertMessage('请输入用户姓名！');
            return;
        }
        if(!phoneNum){
            Util.alertMessage('请输入用户手机号！');
            return;
        }

        Util.ajaxRequest({
            url: API.addUser,
            type: 'POST',
            data: {
                name,
                phoneNum
            },
            successCbk: (req) => {
                Util.alertMessage('新增用户成功！');
                _this.getUserList((data) => {
                    _this.setState({
                        userList: data
                    });            
                })           
            }
        })      
    }
    render() {
    	let { userList } = this.state;
        return(
            <div className="container hasFixed home-page">
                <Header />
                <div className="form-module">
                    <p><span className="title">用户名：</span><input type="text" name="name" onChange={(e) => this.handleChange(e,'name')} placeholder="请输入用户姓名" /></p>
                    <p><span className="title">用户手机号：</span><input type="text" name="phoneNum" onChange={(e) => this.handleChange(e,'phoneNum')} placeholder="请输入用户手机号" /></p>
                    <div className="btn-module"><button type="button" className="btn primary" onClick={(e) => this.handleSubmit(e)}>新增用户</button></div>
                </div>
            	<h2 className="user-list-title">用户列表</h2>
            	<ul className="user-list">
            	{
            		userList.map((item,index) => {
            			return (<li className="clearFix" key={index}>
                            <span className="name fl">{item.name}</span>
                            <span className="phoneNum fl">{item.phoneNum}</span>
                        </li>)
            		})
            	}
            	</ul>
            </div>
        );
    }
}

module.exports = HomePage;