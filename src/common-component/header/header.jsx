import React from 'react';

import './header.scss';

export default class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="header-layout">
                顶部导航
            </div>
        );

    }
}