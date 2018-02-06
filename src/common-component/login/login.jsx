import React from 'react';

export default class Login extends React.Component{
    constructor(props){
        super(props);

        let { params } = this.props.match;

        params.testInfo && alert(params.testInfo);
        params.id && alert(params.id);

        this.state = {

        }
    }

    render() {
        return(
            <div className="container">
            	登陆页
            </div>
        );
    }
}