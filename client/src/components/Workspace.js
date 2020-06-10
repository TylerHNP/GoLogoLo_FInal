import React, { Component, Fragment } from 'react';
import '../App.css';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";
import Canvas from './WorkspaceCanvas';
import { Link } from 'react-router-dom';


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

const ADD_LOGO = gql`
    mutation Addlogo($name:String!,$texts: [textInput]!,$images: [imageInput]!,$height:Int!, $width: Int!){
    addLogo(name: $name, height: $height, width: $width,texts: $texts, images: $images)
    {
    _id
    name
    }
}
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
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
        this.stageRef = React.createRef();
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

    layerControls = () => {
        return (<div style={{ display: "flex", paddingLeft: "0.5rem" }}>
            <div style={{ flex: 1, textAlign: "center" }}>
                <button
                    style={{ backgroundColor: "#a5ffd6" }}
                    className="control_button"
                    onClick={this.handleBringFoward}>Bring forward</button></div>
            <div style={{ flex: 1, textAlign: "center" }}>
                <button style={{ backgroundColor: "#f0b67f" }}
                    className="control_button"
                    onClick={this.handleSendBackward}>Send backward</button> </div>
            <div style={{ flex: 1, textAlign: "center" }}>
                <button style={{ backgroundColor: "#fe5f55" }}
                    className="control_button"
                    onClick={this.handleRemove}>  Remove</button> </div>

        </div>);
    }

    handleAddText = () => {
        if (!this.newTextInput.current.value) {
            alert("Please enter a text value");
            return;
        }
        var newText = {
            layer: this.state.contents.length,
            text: this.newTextInput.current.value,
            color: "#333333",
            fontFamily: "Lato",
            fontSize: 20,
            x: 10,
            y: 10,
            __typename: "text"
        }
        var newContents = this.state.contents;
        newContents.push(newText);
        this.newTextInput.current.value = null;
        this.setState({ contents: newContents });
    }

    handleImportImage = () => {
        if (!this.newImageInput.current.value) {
            alert("Please enter a valid source for new image");
            return;
        }
        var newImage = {
            layer: this.state.contents.length,
            src: this.newImageInput.current.value,
            x: 10,
            y: 10,
            height: 100,
            width: 100,
            __typename: "image"
        }
        var newContents = this.state.contents;
        newContents.push(newImage);
        this.setState({ contents: newContents });
        this.newImageInput.current.value = null;

    }

    handleBringFoward = () => {
        console.log("bring forward");
        var currentSelected = this.state.selected;
        if (currentSelected !== this.state.contents.length - 1) {
            var newContents = this.state.contents;
            var temp = newContents[currentSelected + 1];
            temp.layer = currentSelected;
            newContents[currentSelected].layer = currentSelected + 1
            newContents[currentSelected + 1] = newContents[currentSelected];
            newContents[currentSelected] = temp;
            this.setState({ selected: currentSelected + 1, contents: newContents })
            // console.log(this.state.contents);
        }
    }

    handleSendBackward = () => {
        console.log("send backward");
        var currentSelected = this.state.selected;
        if (currentSelected === 0) {
            return;
        }
        var newContents = this.state.contents;
        var temp = newContents[currentSelected - 1];
        temp.layer = currentSelected;
        newContents[currentSelected].layer = currentSelected - 1
        newContents[currentSelected - 1] = newContents[currentSelected];
        newContents[currentSelected] = temp;
        this.setState({ selected: currentSelected - 1, contents: newContents })
        // console.log(this.state.contents);
    }

    handleRemove = () => {
        console.log("remove");
        var newContents = this.state.contents;
        newContents.splice(this.state.selected, 1);
        newContents.forEach((content, index) => {
            content.layer = index;
        })
        this.setState({ selected: null, contents: newContents });
    }

    handleTextFontSizeChange = (e) => {
        var newContents = this.state.contents;
        newContents[this.state.selected].fontSize = Number.parseInt(e.target.value)
            ? Number.parseInt(e.target.value) : 0;
        this.setState({ contents: newContents });
    }

    handleTextColorChange = (e) => {
        var newContents = this.state.contents;
        newContents[this.state.selected].color = e.target.value;
        this.setState({ contents: newContents });
    }
    handleFontFamilyChange = (e) => {
        var newContents = this.state.contents;
        newContents[this.state.selected].fontFamily = e.target.value;
        this.setState({ contents: newContents });
    }

    handleImageWidthChange = (e) => {
        var newContents = this.state.contents;
        newContents[this.state.selected].width = Number.parseInt(e.target.value)
            ? Number.parseInt(e.target.value) : 0;
        this.setState({ contents: newContents });
    }

    handleImageHeightChange = (e) => {
        var newContents = this.state.contents;
        newContents[this.state.selected].height = Number.parseInt(e.target.value)
            ? Number.parseInt(e.target.value) : 0;
        this.setState({ contents: newContents });
    }



    changePosition = (layer, x, y) => {
        var newContents = this.state.contents;
        newContents[layer].x = x;
        newContents[layer].y = y;
        this.setState({ contents: newContents })
    }

    changeSelect = (e) => {
        this.setState({ selected: parseInt(e.id()) });
    }

    deSelect = () => {
        this.setState({ selected: null });
    }

    handleUpdate = () => {
        // console.log(this.history);
        return (
            <Mutation mutation={UPDATE_LOGO} onCompleted={() => this.history.push(`/`)}>
                {(updateLogo, { loading, error }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return (
                        <div style={{ flex: 1, textAlign: "center" }}>
                            <button className="main_button" style={{ color: "#a5ffd6" }} onClick={e => {
                                e.preventDefault();
                                var newTexts = [];
                                var newImages = [];
                                this.state.contents.forEach(element => {
                                    var toAdd = { ...element };
                                    if (toAdd.__typename === "text") {
                                        delete toAdd.__typename;
                                        newTexts.push(toAdd);

                                    }
                                    else {
                                        delete toAdd.__typename;
                                        newImages.push(toAdd);
                                    }
                                });
                                console.log(this.state.contents);
                                updateLogo({
                                    variables: {
                                        id: this.state.id, name: this.state.name, height: this.state.height, width: this.state.width,
                                        texts: newTexts, images: newImages
                                    }
                                });
                            }}
                            >  Save</button>
                        </div>
                    )
                }
                }

            </Mutation>);
    }



    handleAdd = () => {
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return (
                        <div style={{ flex: 1, textAlign: "center" }}>
                            <button className="main_button" style={{ color: "#a5ffd6" }} onClick={e => {
                                e.preventDefault();
                                var newTexts = [];
                                var newImages = [];
                                this.state.contents.forEach(element => {
                                    var toAdd = { ...element };
                                    if (toAdd.__typename === "text") {
                                        delete toAdd.__typename;
                                        newTexts.push(toAdd);

                                    }
                                    else {
                                        delete toAdd.__typename;
                                        newImages.push(toAdd);
                                    }


                                });
                                console.log(this.state.contents);
                                addLogo({
                                    variables: {
                                        name: this.state.name, height: this.state.height, width: this.state.width,
                                        texts: newTexts, images: newImages
                                    }
                                });
                            }}
                            >  Create</button>
                        </div>
                    )
                }
                }

            </Mutation>

        );

    }

    handleExport = (e) => {
        console.log("here");
        var url = this.stageRef.current.toDataURL({
            mimeType: "image/jpeg",
            quality: 0,
            pixelRatio: 2
        });
        const link = document.createElement("a");
        link.download = this.state.name;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    handleDelete = () => {
        return (
            <Mutation mutation={DELETE_LOGO} key={this.state.id} onCompleted={() => this.props.history.push('/')}>
                {(removeLogo, { loading, error }) => (
                    <Fragment>
                        <div style={{ flex: 1, textAlign: "center" }}>
                            <button className="main_button" style={{ color: "#fe5f55" }}
                                onClick={e => {
                                    e.preventDefault();
                                    removeLogo({ variables: { id: this.state.id } });
                                }}
                            >  Delete</button>
                        </div>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error :( Please try again)</p>}
                    </Fragment>
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
                                    style={{
                                        backgroundColor: "#f0b67f"
                                    }}
                                    onClick={() => {
                                        this.setState({ name: this.nameInput.current.value });
                                    }}
                                > Change Name</button> </div>
                        </div>
                        <br />
                        <div style={{ display: "flex", paddingLeft: "0.5rem" }}>
                            <input type="text" className="long_input" placeholder="New Text" ref={this.newTextInput} />
                            <div style={{ flex: 1, textAlign: "center" }}>
                                <button className="control_button" style={{
                                    backgroundColor: "#f0b67f"
                                }}
                                    onClick={this.handleAddText}> Add Text</button> </div>
                        </div>
                        <br />
                        <div style={{ display: "flex", paddingLeft: "0.5rem" }}>
                            <input type="text" className="long_input" placeholder="URL" ref={this.newImageInput} />
                            <div style={{ flex: 1, textAlign: "center" }}>
                                <button className="control_button"
                                    style={{
                                        backgroundColor: "#f0b67f"
                                    }} onClick={this.handleImportImage}>  Import Image</button> </div>
                        </div>
                        <br />
                        <div className="control_row">
                            <label className="control_label" htmlFor="canvas_width">Width: </label>
                            <input type="number" className="control_input" name="canvas_width" value={this.state.width}
                                onChange={e => { this.setState({ width: parseInt(e.target.value) ? parseInt(e.target.value) : 0 }) }} />
                            <label className="control_label" htmlFor="canvas_height">Height: </label>
                            <input type="number" className="control_input" name="canvas_height" value={this.state.height}
                                onChange={e => { this.setState({ height: parseInt(e.target.value) ? parseInt(e.target.value) : 0 }) }} />
                        </div>
                    </div>
                    {(this.state.selected !== null && this.state.contents[this.state.selected].__typename === "text") && <div className="controls" id="text_controls">
                        <div className="yellow" style={{
                            fontSize: 20,
                            textAlign: "center"
                        }
                        }>Text</div>
                        <br />
                        {this.layerControls()}
                        <br />
                        <div className="control_row">
                            <label className="control_label" htmlFor="fontSize">Size: </label>
                            <input type="number" className="control_input" name="fontSize" value={this.state.contents[this.state.selected].fontSize}
                                onChange={this.handleTextFontSizeChange}
                            />
                            <label className="control_label" htmlFor="color">Color: </label>
                            <input type="color" style={{ verticalAlign: "middle" }} className="control_input" name="color" value={this.state.contents[this.state.selected].color}
                                onChange={this.handleTextColorChange} />

                            <label className="control_label" htmlFor="fontFamily">Font Family: </label>
                            <select type="color" style={{
                                verticalAlign: "middle", height: "2vw",
                                textAlign: "center",
                                fontSize: 12,
                                borderRadius: "0.5rem"
                            }} name="fontFamily"
                                value={this.state.contents[this.state.selected].fontFamily}
                                onChange={this.handleFontFamilyChange} multiple={false} >
                                <option value="Lato">Lato</option>
                                <option value="Arial">Arial</option>
                                <option value="Helvetica">Helvetica</option>
                                <option value="Times">Times</option>
                            </select>
                        </div>
                    </div>}
                    {(this.state.selected !== null && this.state.contents[this.state.selected].__typename === "image") && <div className="controls" id="image_controls">
                        <div className="yellow" style={{
                            fontSize: 20,
                            textAlign: "center"
                        }
                        }>Image</div>
                        <br />
                        {this.layerControls()}
                        <br />
                        <div className="control_row">
                            <label className="control_label" htmlFor="image_width">Width: </label>
                            <input type="number" className="control_input" name="image_width"
                                value={parseInt(this.state.contents[this.state.selected].width)}
                                onChange={this.handleImageWidthChange} />
                            <label className="control_label" htmlFor="image_height">Height: </label>
                            <input type="number" className="control_input" name="image_height"
                                value={parseInt(this.state.contents[this.state.selected].height)}
                                onChange={this.handleImageHeightChange} />
                        </div>
                    </div>}
                    {(this.state.selected === null) &&
                        <div className="controls" id="instruction">
                            <div className="yellow" style={{
                                fontSize: 20,
                                textAlign: "center"
                            }
                            }>Instruction</div>
                            <br />
                            <br />
                            <div className="green" style={{
                                fontSize: 15,
                                textAlign: "center",
                                fontStyle: "italic"
                            }}>Click an image or a text to select and change their attributes.</div>
                            <br />
                            <br />
                        </div>
                    }

                    <div style={{ display: "flex", flex: 1, marginTop: "1rem" }} id="button_controls">
                        {(!this.props.addCallback) && this.handleUpdate()}
                        {(this.props.addCallback) && this.handleAdd()}
                        <div style={{ flex: 1, textAlign: "center" }}>
                            <button className="main_button" onClick={this.handleExport} style={{ color: "#f0b67f" }}>  Export</button>
                        </div>
                        {(!this.props.addCallback) && this.handleDelete()}
                        {(this.props.addCallback) && <div style={{ flex: 1, textAlign: "center" }}>
                            <Link to='/'>
                                <button className="main_button" style={{ color: "#fe5f55" }}>  Cancel</button>
                            </Link>
                        </div>}

                    </div>
                </div>
                <div className="workplace-container">
                    <Canvas
                        name={this.state.name}
                        width={this.state.width}
                        height={this.state.height}
                        contents={this.state.contents}
                        changePosition={this.changePosition}
                        changeSelect={this.changeSelect}
                        deSelect={this.deSelect}
                        selected={this.state.selected}
                        stageRef={this.stageRef}
                    />
                </div>
            </section >
        );
    }
}

export default Workspace;
