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
const SphereViewer = Loadable({loader: () => import(/* webpackChunkName: "SphereViewer" */'./pages/sphere-viewer/sphere-viewer.jsx'),loading: Loading});
const MyCar = Loadable({loader: () => import(/* webpackChunkName: "MyCar" */'./pages/mycar-360/mycar-360.jsx'),loading: Loading});
const HandsontableDemo = Loadable({loader: () => import(/* webpackChunkName: "HandsontableDemo" */'./pages/handsontable-demo/handsontable-demo.jsx'),loading: Loading});

ReactDOM.render(
    <HashRouter>
    	<div>
			<Switch>
	            <Route exact path="/" component={HomePage}/>
	            <Route path="/login/:testInfo?/:id?" component={Login}/>            
	            <Route path="/sphereViewer" component={SphereViewer}/>            
                <Route path="/myCar" component={MyCar}/>            
	            <Route path="/handsontable" component={HandsontableDemo}/>            
	        </Switch>
    	</div>	                        
    </HashRouter>, 
    document.getElementById('app-container')
);