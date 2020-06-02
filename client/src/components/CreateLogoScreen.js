import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor:String!,
        $borderColor:String!,
        $borderRadius:Int!,
        $borderWidth:Int!,
        $padding:Int!,
        $margin:Int!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor:$backgroundColor,
            borderColor:$borderColor,
            borderRadius:$borderRadius,
            borderWidth:$borderWidth,
            padding:$padding,
            margin:$margin) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {
    constructor() {
        super();

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            text: "",
            color: "",
            fontSize: "",
            backgroundColor: "",
            borderColor: "",
            borderRadius: "",
            borderWidth: "",
            padding: "",
            margin: ""
        }
    }
    handleTextChange = (event) => {
        console.log("text change");
        this.setState({ text: event.target.value });
    }

    handleColorChange = (event) => {
        console.log("color change");
        this.setState({ color: event.target.value });
    }

    handleFontSizeChange = (event) => {
        console.log("fontSize change");
        this.setState({ fontSize: event.target.value });
    }

    handleBackgroundColorChange = (event) => {
        console.log("background Color change");
        this.setState({ backgroundColor: event.target.value });
    }

    handleBorderColorChange = (event) => {
        console.log("borderColor change");
        this.setState({ borderColor: event.target.value });
    }

    handleBorderRadiusChange = (event) => {
        console.log("borderRadius change");
        this.setState({ borderRadius: event.target.value });
    }

    handleBorderWidthChange = (event) => {
        console.log("borderWidth change");
        this.setState({ borderWidth: event.target.value });
    }

    handlePaddingChange = (event) => {
        console.log("padding change");
        this.setState({ padding: event.target.value });
    }

    handleMarginChange = (event) => {
        console.log("margin change");
        this.setState({ margin: event.target.value });
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="row">
                            <div className="panel panel-default ">
                                <div className="panel-heading">
                                    <h4><Link to="/">Home</Link></h4>
                                    <h3 className="panel-title">
                                        Create Logo
                            </h3>
                                </div>
                                <div className="panel-body">
                                    <form onSubmit={e => {
                                        e.preventDefault();
                                        addLogo({
                                            variables: {
                                                text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                                backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value),
                                                borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value)
                                            }
                                        });
                                        text.value = "";
                                        color.value = "";
                                        fontSize.value = "";
                                        backgroundColor.value = "";
                                        borderColor.value = "";
                                        borderRadius.value = "";
                                        borderWidth.value = "";
                                        padding.value = "";
                                        margin.value = "";


                                    }}>
                                        <div className="form-group">
                                            <label htmlFor="text">Text:</label>
                                            <input required type="text" className="form-control" name="text" ref={node => {
                                                text = node;
                                            }} placeholder="Text" onChange={this.handleTextChange} defaultValue={this.state.text} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="color">Color:</label>
                                            <input required type="color" className="form-control" name="color" ref={node => {
                                                color = node;
                                            }} placeholder="Color" onChange={this.handleColorChange} defaultValue={this.state.color} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="fontSize">Font Size:</label>
                                            <input required type="text" className="form-control" name="fontSize" ref={node => {
                                                fontSize = node;
                                            }} placeholder="Font Size" onChange={this.handleFontSizeChange} defaultValue={this.state.fontSize} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="backgroundColor">Background Color:</label>
                                            <input required type="color" className="form-control" name="backgroundColor" ref={node => {
                                                backgroundColor = node;
                                            }} placeholder="Background Color" onChange={this.handleBackgroundColorChange} defaultValue={this.state.backgroundColor} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="borderColor">Border Color:</label>
                                            <input required type="color" className="form-control" name="borderColor" ref={node => {
                                                borderColor = node;
                                            }} placeholder="Border Color" onChange={this.handleBorderColorChange} defaultValue={this.state.borderColor} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="borderRadius">Border Radius:</label>
                                            <input required type="text" className="form-control" name="borderRadius" ref={node => {
                                                borderRadius = node;
                                            }} placeholder="Border Radius" onChange={this.handleBorderRadiusChange} defaultValue={this.state.borderRadius} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="borderWidth">Border Width:</label>
                                            <input required type="text" className="form-control" name="borderWidth" ref={node => {
                                                borderWidth = node;
                                            }} placeholder="Border Width" onChange={this.handleBorderWidthChange} defaultValue={this.state.borderWidth} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="padding">Padding:</label>
                                            <input required type="text" className="form-control" name="padding" ref={node => {
                                                padding = node;
                                            }} placeholder="Padding" onChange={this.handlePaddingChange} defaultValue={this.state.padding} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="margin">Margin:</label>
                                            <input required type="text" className="form-control" name="margin" ref={node => {
                                                margin = node;
                                            }} placeholder="Margin" onChange={this.handleMarginChange} defaultValue={this.state.margin} />
                                        </div>
                                        <button type="submit" className="btn btn-success">Submit</button>
                                    </form>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>Error :( Please try again</p>}
                                </div>

                            </div>
                            <div className="w-auto h-auto allign-middle" style={{
                                borderStyle: "solid",
                                color: this.state.color,
                                fontSize: this.state.fontSize + "pt",
                                backgroundColor: this.state.backgroundColor,
                                borderColor: this.state.borderColor,
                                borderRadius: this.state.borderRadius + "pt",
                                borderWidth: this.state.borderWidth + "pt",
                                padding: this.state.padding + "pt",
                                margin: this.state.margin + "pt"
                            }}>
                                {this.state.text}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;