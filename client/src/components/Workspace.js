import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";
import Canvas from './WorkspaceCanvas';


const UPDATE_LOGO = gql`
    mutation Updatelogo(
        $id: String!,
        $name:String!,
        $texts: [textInput]!,
        $images: [imageInput]!,
        $height:Int!,
        $width: Int!
    ){
	    updateLogo(id: $id,name: $name, height: $height, width: $width,texts: $texts, images: $images){
        _id
        name
  }
}

`;

class Workspace extends Component {
    constructor(props) {
        super(props);
        this.history = props.history;
        this.nameInput = React.createRef();
        this.newTextInput = React.createRef();
        this.newImageInput = React.createRef();
        this.state = {
            selected: null,
            id: props.logo._id,
            name: props.logo.name,
            width: props.logo.width,
            height: props.logo.height,
            contents: (props.logo.texts.concat(props.logo.images).sort(function (logo1, logo2) {
                if (logo1.layer > logo2.layer) {
                    return 1;
                }
                else if (logo1.layer === logo2.layer) {
                    return 0;
                }
                return -1;
            }))
        }
        console.log(this.state)
    }

    changePosition = (layer, x, y) => {
        var newContents = this.state.contents;
        newContents[layer].x = x;
        newContents[layer].y = y;
        this.setState({ contents: newContents })
    }

    handleUpdate = () => {
        // console.log(this.history);
        return (
            <Mutation mutation={UPDATE_LOGO} key={this.state.id} onCompleted={() => this.history.push(`/`)}>
                {(updateLogo, { loading, error }) => (
                    <div style={{ flex: 1, textAlign: "center" }}>
                        <button className="main_button" style={{ color: "#a5ffd6" }} onClick={e => {
                            e.preventDefault();
                            var newTexts = [];
                            var newImages = [];
                            this.state.contents.forEach(element => {
                                delete element.__typename;
                                if (element.type === "text") {
                                    newTexts.push(element);
                                }
                                else {
                                    newImages.push(element);
                                }
                            });
                            updateLogo({
                                variables: {
                                    id: this.state.id, name: this.state.name, height: this.state.height, width: this.state.width,
                                    texts: newTexts, images: newImages
                                }
                            });
                        }}
                        >  Save</button>
                    </div>
                )}
            </Mutation>);
    }

    render() {
        return (
            <section>
                <div className="control-container">
                    <div id="canvas_controls" className="controls" >
                        <div className="yellow" style={{
                            fontSize: 20,
                            textAlign: "center"
                        }
                        }>Logo</div>
                        <br />
                        <div style={{ display: "flex", paddingLeft: "0.5rem" }}>
                            <input type="text" className="long_input" defaultValue={this.state.name} ref={this.nameInput} />
                            <div style={{ flex: 1, textAlign: "center" }}>
                                <button
                                    className="control_button"
                                    onClick={() => {
                                        this.setState({ name: this.nameInput.current.value });
                                    }}
                                > Change Name</button> </div>
                        </div>
                        <br />
                        <div style={{ display: "flex", paddingLeft: "0.5rem" }}>
                            <input type="text" className="long_input" placeholder="New Text" ref={this.newTextInput} />
                            <div style={{ flex: 1, textAlign: "center" }}><button className="control_button"> Add Text</button> </div>
                        </div>
                        <br />
                        <div style={{ display: "flex", paddingLeft: "0.5rem" }}>
                            <input type="text" className="long_input" placeholder="URL" ref={this.newImageInput} />
                            <div style={{ flex: 1, textAlign: "center" }}><button className="control_button">  Import Image</button> </div>
                        </div>
                        <br />
                        <div className="control_row">
                            <label className="control_label" htmlFor="canvas_width">Width: </label>
                            <input type="text" className="control_input" name="canvas_width" defaultValue={this.state.width} />
                            <label className="control_label" htmlFor="canvas_height">Height: </label>
                            <input type="text" className="control_input" name="canvas_height" defaultValue={this.state.height} />
                        </div>
                    </div>
                    {(this.state.selected) && <div className="controls" id="text_controls">
                        <div className="yellow" style={{
                            fontSize: 20,
                            textAlign: "center"
                        }
                        }>Text</div>
                        <br />
                        <div style={{ display: "flex", paddingLeft: "0.5rem" }}>
                            <div style={{ flex: 1, textAlign: "center" }}><button className="control_button">  Bring to front</button> </div>
                            <div style={{ flex: 1, textAlign: "center" }}><button className="control_button">  Send to back</button> </div>
                        </div>
                        <br />
                        <div className="control_row">
                            <label className="control_label" htmlFor="fontSize">Size: </label>
                            <input type="text" className="control_input" name="fontSize" defaultValue={""} />
                            <label className="control_label" htmlFor="color">Color: </label>
                            <input type="color" className="control_input" name="color" defaultValue={this.state.height} />
                        </div>
                    </div>}
                    {(this.state.selected) && <div className="controls" id="image_controls">
                        <div className="yellow" style={{
                            fontSize: 20,
                            textAlign: "center"
                        }
                        }>Image</div>
                        <br />
                        <div style={{ display: "flex", paddingLeft: "0.5rem" }}>
                            <div style={{ flex: 1, textAlign: "center" }}><button className="control_button">  Bring to front</button> </div>
                            <div style={{ flex: 1, textAlign: "center" }}><button className="control_button">  Send to back</button> </div>
                        </div>
                        <br />
                        <div className="control_row">
                            <label className="control_label" htmlFor="image_width">Width: </label>
                            <input type="text" className="control_input" name="image_width" defaultValue={""} />
                            <label className="control_label" htmlFor="image_height">Height: </label>
                            <input type="text" className="control_input" name="image_height" defaultValue={""} />
                        </div>
                    </div>}
                    {(!this.state.selected) &&
                        <div className="controls" id="instruction">
                            <div className="yellow" style={{
                                fontSize: 20,
                                textAlign: "center"
                            }
                            }>Instruction</div>
                            <br />
                            <br />
                            <div className="red" style={{
                                fontSize: 15,
                                textAlign: "center",
                                fontStyle: "italic"
                            }
                            }>Double click the element to select and change their attributes.</div>
                            <br />

                            <br />
                        </div>
                    }

                    <div style={{ display: "flex", flex: 1, marginTop: "1rem" }} id="button_controls">

                        {(!this.props.addCallback) && this.handleUpdate()}

                        <div style={{ flex: 1, textAlign: "center" }}>
                            <button className="main_button" style={{ color: "#f0b67f" }}>  Export</button>
                        </div>
                        <div style={{ flex: 1, textAlign: "center" }}>
                            <button className="main_button" style={{ color: "#fe5f55" }}>  Delete</button>
                        </div>
                    </div>
                </div>
                <div className="workplace-container">
                    <Canvas
                        name={this.state.name}
                        width={this.state.width}
                        height={this.state.height}
                        contents={this.state.contents}
                        changePosition={this.changePosition}
                    />
                </div>
            </section >
        );
    }
}

export default Workspace;
