import React from 'react';
import API from '../../api/api.js';
import Util from '../../common-component/util/util.js';
import PhotoSphereViewer from '../../asset/plugins/photo-sphere-viewer.js';
import Header from '../../common-component/header/header.jsx';

import './sphere-viewer.scss';

class SphereViewer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            mycarArr: [{
                index: 0,
                colorName: '灰色',
                imgUrl: '/src/asset/images/mycar_gray.jpg'
            },{
                index: 1,
                colorName: '黑色',
                imgUrl: '/src/asset/images/mycar_black.jpg'
            },{
                index: 2,
                colorName: '棕色',
                imgUrl: '/src/asset/images/mycar_brown.jpg'
            }]
        }

        this.colorIndex = 0;
    }

    componentDidMount() {
        this.renderViewer(0, -Math.PI/10, -Math.PI/2);
    }

    renderViewer(index,initLat,initLong) {
        let _this = this,
            { mycarArr } = this.state,	
            $canvasBox = $("#canvas-box");

        this.PSV = this.initPhotoSphereViewer({
            containerEl: $canvasBox[0],
            imgUrl: mycarArr[index].imgUrl,
            lat: initLat,
            long: initLong
        },function(lt,lg) {
            _this.lat = lt;
            _this.long = lg;
        });
        
        this.PSV.load();
    }

    initPhotoSphereViewer(options,rotateCb) {
        return new PhotoSphereViewer({
            autoload: false,
            // Path to the panorama
            panorama: options.imgUrl,

            // Container
            container: options.containerEl,

            default_position: {
                long: options.long, 
                lat: options.lat
            },

            // Deactivate the animation
            time_anim: 3000,

            anim_speed: '1rpm',

            // Display the navigation bar
            navbar: false,

            // Resize the panorama
            size: {
                width: '100%',
                height: '500px'
            },

            min_fov: 80,

            max_fov: 80,

            // HTML loader
            loading_msg: '',

            onready: () => {
                this.setState({
                    isLoading: false
                })
            },

            onrotate: rotateCb || function() {}

        });
    }

    handleFullscreen() {
        this.PSV.toggleFullscreen();
    }

    handleSwitch(index) {
        let $canvasBox = $("#canvas-box");

        if(this.colorIndex == index){
            return;
        }
        
        this.PSV = null;
        this.setState({
            isLoading: true
        })
        $canvasBox.html('');
        this.colorIndex = index;

        this.renderViewer(index, this.lat, this.long);
    }

    render() {
        let { isLoading } = this.state;

        return(
            <div className="container hasFixed home-page">
                <Header />
                <div className="sphere-viewer-module">
                    <div id="viewer">
                        <div id="canvas-box"></div>
                    </div>
                    <div className="fullscreen" onClick={() => this.handleFullscreen()}></div>
                    <div className="options-module">
                        <span className="color-btn" onClick={() => this.handleSwitch(0)}>灰色</span>
                        <span className="color-btn" onClick={() => this.handleSwitch(1)}>黑色</span>
                        <span className="color-btn" onClick={() => this.handleSwitch(2)}>棕色</span>
                    </div>    
                    {
                        isLoading ?
                            <div className="loading"></div> : null
                    }            
                </div>                
            </div>
        );
    }
}

export default SphereViewer;