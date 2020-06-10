import React, { Component, createRef } from 'react';
import '../App.css';
import { Stage, Text, Rect, Layer } from 'react-konva';
import URLImage from "./URLImage";


class WorkspaceCanvas extends Component {

    constructor() {
        super();
        this.state = {
            height: 0,
            width: 0
        };
    }
    // componentDidUpdate = () => {
    //     if (this.props.selected) {
    //         console.log("component did update");
    //     }
    // }

    onDragEnd = (e) => {
        this.setState({ width: e.target.width(), height: e.target.height() })
        this.props.changeSelect(e.target);
        this.props.changePosition(e.target.id(), e.target.x(), e.target.y());
    }

    onSelect = (e) => {
        this.setState({ width: e.target.width(), height: e.target.height() })
        this.props.changeSelect(e.target);
    }
    renderCanvas = () => {
        if (this.props.contents) {
            return (
                <Layer>
                    <Rect width={this.props.width} height={this.props.height} fill={"#e8eef2"} onClick={this.props.deSelect} />
                    {this.props.contents.map((content, index) => {
                        var selectedSwitch = ((this.props.selected !== null) && (index === this.props.selected));
                        console.log(this.state);
                        if (content.__typename === "text") {
                            return (
                                <React.Fragment key={index}>
                                    {selectedSwitch && <Rect width={this.state.width + 10} height={this.state.height + 10} x={content.x - 5}
                                        y={content.y - 5} strokeWidth={3}
                                        stroke={"#fe5f55"}
                                        strokeEnabled={selectedSwitch} />}
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
                                        onClick={this.onSelect}
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
                                    onClick={this.onSelect}
                                    strokeWidth={7}
                                    stroke={"#fe5f55"}
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


