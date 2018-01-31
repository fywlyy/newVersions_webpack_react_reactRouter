import React from 'react';

export default class Loading extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="loading-module">
                加载中...
            </div>
        );

    }
}