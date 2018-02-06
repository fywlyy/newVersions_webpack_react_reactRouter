import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './common-component/loading/loading.jsx';
import Bottom from './common-component/bottom/bottom.jsx';
import Util from './common-component/util/util.js';

import './asset/reset.scss';

const HomePage = Loadable({loader: () => import(/* webpackChunkName: "homePage" */'./pages/home-page/home-page.jsx'),loading: Loading});
const Login = Loadable({loader: () => import(/* webpackChunkName: "Login" */'./common-component/login/login.jsx'),loading: Loading});

ReactDOM.render(
    <HashRouter>
    	<div>
			<Switch>
	            <Route exact path="/" component={HomePage}/>
	            <Route path="/login/:testInfo?/:id?" component={Login}/>            
	        </Switch>
    	</div>	                        
    </HashRouter>, 
    document.getElementById('app-container')
);