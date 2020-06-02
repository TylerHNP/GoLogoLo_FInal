import React, { Component } from 'react';

import '../App.css';
import { Stage, Text, Image, Layer } from 'react-konva';
import Konva from 'konva';

class PreviewCanvas extends Component {
    constructor(props) {
        super();
        console.log(props);
        this.parentRef = React.createRef();
    };

    renderCanvas = () => {
        if (this.props.selected) {
            var parentWidth = document.documentElement.clientWidth * 0.60;
            var parentHeight = document.documentElement.clientHeight * 0.65;
            return (<Stage width={parentWidth} height={parentHeight}>
                <Layer>
                    {this.props.texts.map((text) => {
                        return (<Text
                            text={text.text}
                            x={text.left}
                            y={text.top}
                            fill={text.color}
                            fontSize={24}
                        />);
                    })}
                </Layer>
            </Stage>);
        }
    }

    render() {
        return (
            <div id="canvas_container">
                <div className="green" style={{
                    padding: "1rem",
                    fontSize: 24,
                    textAlign: "center"
                }
                }>Preview</div>
                <div id="preview_canvas" ref={this.parentRef}>{this.renderCanvas()}</div>
            </div>

        );

    }
}

export default PreviewCanvas;


