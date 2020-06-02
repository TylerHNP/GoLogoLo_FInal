import React, { Component } from 'react';
import '../App.css';
import { Stage, Text, Rect, Layer } from 'react-konva';
import URLImage from "./URLImage";


class PreviewCanvas extends Component {
    constructor(props) {
        super();
        console.log(props);
        this.parentRef = React.createRef();
    };



    renderCanvas = () => {
        if (this.props.selected) {
            return (<Stage width={this.props.width} height={this.props.height} >
                <Layer>
                    <Rect width={this.props.width} height={this.props.height} fill={"#e8eef2"} />
                </Layer>
                {this.props.contents.map((content, index) => {
                    console.log(content.layer + " " + index);
                    if (content.type == "text") {
                        return (<Layer key={index}><Text
                            id={content.layer}
                            name={content.type}
                            text={content.text}
                            x={content.x}
                            y={content.y}
                            fill={content.color}
                            fontSize={content.fontSize}
                            fontFamily={content.fontFamily}
                            draggable
                        /></Layer>);
                    }
                    else {
                        return (
                            <Layer key={index}>
                                {/* <Image
                                    id={content.layer}
                                    name={content.type}
                                    text={content.text}
                                    x={content.x}
                                    y={content.y}
                                    
                                    width={content.width}
                                    heigt={content.height}
                                /> */}
                                <URLImage src={content.src}
                                    id={content.layer}
                                    name={content.type}
                                    text={content.text}
                                    x={content.x}
                                    y={content.y}
                                    width={content.width}
                                    heigt={content.height} />
                            </Layer>
                        );

                    }


                })}

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


