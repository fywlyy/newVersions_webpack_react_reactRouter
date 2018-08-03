import React from 'react';
import API from '../../api/api.js';
import Util from '../../common-component/util/util.js';
import Header from '../../common-component/header/header.jsx';

import './mycar-360.scss';

class SphereViewer extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        $("#myCar").vc3dEye({
            imagePath:"/src/asset/images/mycar_img/",
            totalImages:51,
            imageExtension:"png"
        });
    }

    render() {
        return(
            <div className="container hasFixed home-page">
                <Header />
                <div className="my-car" id="myCar">

                </div>                
            </div>
        );
    }
}

export default SphereViewer;