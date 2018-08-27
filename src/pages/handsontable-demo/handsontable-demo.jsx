import React from 'react';
import 'handsontable/languages/zh-CN';
import { HotTable } from '@handsontable/react';
import Util from '../../common-component/util/util.js';

import 'handsontable/dist/handsontable.full.css';
import './handsontable-demo.scss';

class Handsontable extends React.Component {
    constructor(props) {
        super(props);
        this.data = [
            ["", "Ford", "Volvo", "Toyota", "Honda"],
            ["2016", 10, 11, 12, 13],
            ["2017", 20, 11, 14, 13],
            ["2018", 30, 15, 12, 13]
        ];
    }

    render() {
        return (
            <div id="hot-app">
                <HotTable 
                    data={this.data} 
                    colHeaders={true} 
                    rowHeaders={true}
                    language={'zh-CN'} 
                    contextMenu={true}
                    width="600" 
                    height="300" 
                    stretchH="all" />
            </div>
        );
    }
}

export default Handsontable;