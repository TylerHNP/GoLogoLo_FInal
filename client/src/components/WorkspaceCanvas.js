import React, { Component } from 'react';
import '../App.css';
import { Stage, Text, Rect, Layer } from 'react-konva';
import URLImage from "./URLImage";


class WorkspaceCanvas extends Component {
    constructor() {
        super();
    }

    onDragEnd = (e) => {
        // console.log(this.props.contents);
        this.props.changePosition(e.target.id(), e.target.x(), e.target.y());
        this.props.deSelect();
    }

    onSelect = (e) => {
        this.props.changeSelect(e.target);
    }
    renderCanvas = () => {
        if (this.props.contents) {
            return (
                <Layer>
                    <Rect width={this.props.width} height={this.props.height} fill={"#e8eef2"} onClick={this.props.deSelect} />
                    {this.props.contents.map((content, index) => {
                        var selectedSwitch = ((this.props.selected !== null) && (index === this.props.selected));
                        //console.log(selectedSwitch);
                        if (content.__typename === "text") {
                            return (
                                <React.Fragment key={index}>
                                    <Text
                                        id={content.layer}
                                        name={content.__typename}
                                        text={content.text}
                                        x={content.x}
                                        y={content.y}
                                        fill={content.color}
                                        fontSize={content.fontSize}
                                        fontFamily={content.fontFamily}
                                        draggable
                                        onDragEnd={this.onDragEnd}
                                        onDragStart={this.onSelect}
                                        onClick={this.onSelect}
                                        strokeWidth={content.fontSize / 50}
                                        stroke={"#a5ffd6"}
                                        strokeEnabled={selectedSwitch}
                                        align={"center"}
                                        verticalAlign={"middle"}
                                    />
                                </React.Fragment>
                            );
                        }
                        else {
                            return (
                                <URLImage src={content.src} key={index}
                                    id={content.layer}
                                    name={content.__typename}
                                    text={content.text}
                                    x={content.x}
                                    y={content.y}
                                    draggable={true}
                                    width={content.width}
                                    height={content.height}
                                    onDragEnd={this.onDragEnd}
                                    onDragStart={this.onSelect}
                                    onClick={this.onSelect}
                                    strokeWidth={content.width / 50}
                                    stroke={"#a5ffd6"}
                                    strokeEnabled={selectedSwitch}
                                />

                            );
                        }
                    })}
                </Layer>);
        }

        return (<Stage width={window.innerWidth * 0.6} height={window.innerHeight * 0.65} >
            <Layer>
                <Rect width={window.innerWidth * 0.6} height={window.innerHeight * 0.65} fill={"#e8eef2"} />
                <Text
                    text={"Please add a text or import an image."}
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
                    fontSize: 24,
                    textAlign: "center",
                    // fontStyle: "italic"
                }
                }>{this.props.name} </div>
                <div id="preview_canvas" >
                    <Stage width={this.props.width} height={this.props.height} ref={this.props.stageRef}>{this.renderCanvas()}</Stage>
                </div>
            </div>

        );

    }
}

export default WorkspaceCanvas;


