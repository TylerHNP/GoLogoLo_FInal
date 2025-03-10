import React, { Component } from 'react';
import '../App.css';
import { Stage, Text, Rect, Layer } from 'react-konva';
import URLImage from "./URLImage";


class PreviewCanvas extends Component {
    renderCanvas = () => {
        if (this.props.selected) {
            return (<Stage width={this.props.width} height={this.props.height} >
                <Layer>
                    <Rect width={this.props.width} height={this.props.height} fill={this.props.backgroundColor} />

                    {this.props.contents.map((content, index) => {
                        //console.log(content.layer + " " + index);
                        if (content.__typename === "text") {
                            return (<Text key={index}
                                id={content.layer}
                                name={content.type}
                                text={content.text}
                                x={content.x}
                                y={content.y}
                                fill={content.color}
                                fontSize={content.fontSize}
                                fontFamily={content.fontFamily}
                            />);
                        }
                        else {
                            return (
                                <URLImage key={index} src={content.src}
                                    id={content.layer}
                                    name={content.type}
                                    text={content.text}
                                    x={content.x}
                                    y={content.y}
                                    width={content.width}
                                    height={content.height} />

                            );
                        }
                    })}
                </Layer>
            </Stage>);
        }

        return (<Stage width={window.innerWidth * 0.6} height={window.innerHeight * 0.65} >
            <Layer>
                <Rect width={window.innerWidth * 0.6} height={window.innerHeight * 0.65} fill={"#e8eef2"} />
                <Text
                    text={"Please select a logo to preview."}
                    x={window.innerWidth * 0.6 / 2 - 250}
                    y={window.innerHeight * 0.65 / 2}
                    fill={" #333333"}
                    fontSize={24}
                    width={500}
                    fontFamily={"Lato"}
                    align={"center"}
                />
            </Layer></Stage>);
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
                <div id="preview_canvas" >{this.renderCanvas()}</div>
            </div>

        );

    }
}

export default PreviewCanvas;


