import React, { Component } from 'react';
import '../App.css';
import { Stage, Text, Image } from 'react-konva';
import Konva from 'konva';

class PreviewCanvas extends Component {
    constructor(props) {
        super();
        console.log(props);
        if (props.selected) {

        }
        else {

        }
    };


    render() {
        return (
            <div id="canvas_container">
                <div className="green" style={{
                    padding: "1rem",
                    fontSize: 24,
                    textAlign: "center"
                }
                }>Preview</div>
                <canvas id="preview_canvas"></canvas>
            </div>

        );

    }
}

export default PreviewCanvas;


