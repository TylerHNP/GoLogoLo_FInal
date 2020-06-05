import React, { Component } from 'react';
import '../App.css';
import { Stage, Text, Rect, Layer } from 'react-konva';
import URLImage from "./URLImage";


class WorkspaceCanvas extends Component {
    onDragEnd = (e) => {
        // console.log(this.props.contents);
        this.props.changePosition(e.target.id(), e.target.x(), e.target.y());
    }
    renderCanvas = () => {
        if (this.props.contents) {
            return (<Stage width={this.props.width} height={this.props.height} >
                <Layer>
                    <Rect width={this.props.width} height={this.props.height} fill={"#e8eef2"} />
                </Layer>
                {this.props.contents.map((content, index) => {
                    //console.log(content.layer + " " + index);
                    if (content.type === "text") {
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
                            onDragEnd={this.onDragEnd}
                        /></Layer>);
                    }
                    else {
                        return (
                            <Layer key={index}>
                                <URLImage src={content.src}
                                    id={content.layer}
                                    name={content.type}
                                    text={content.text}
                                    x={content.x}
                                    y={content.y}
                                    draggable={true}
                                    width={content.width}
                                    height={content.height}
                                    onDragEnd={this.onDragEnd} />
                            </Layer>
                        );
                    }
                })}

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
                    opacity={1}
                    fontFamily={"Lato"}
                    align={"center"}
                />
            </Layer></Stage>);
    }

    render() {
        return (
            <div id="canvas_container">
                <div className="yellow" style={{
                    padding: "1rem",
                    fontSize: 20,
                    textAlign: "center",
                    // fontStyle: "italic"
                }
                }>Workspace </div>
                <div id="preview_canvas" >{this.renderCanvas()}</div>
            </div>

        );

    }
}

export default WorkspaceCanvas;


