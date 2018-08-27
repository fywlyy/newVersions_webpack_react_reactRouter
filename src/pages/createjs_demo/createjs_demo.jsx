import React from 'react';
import Util from '../../common-component/util/util.js';
import 'yuki-createjs/lib/easeljs-0.8.2.combined';

import './createjs_demo.scss';

class CreateJSDemo extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    

    render() {
        let {  } = this.state;

        return(
            <div className="container hasFixed">
                <canvas id="canvas" width="750" height="1200" style="width:100%"></canvas>       
            </div>
        );
    }
}

export default CreateJSDemo;