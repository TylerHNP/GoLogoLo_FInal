import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";


const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor:String!,
        $borderColor:String!,
        $borderRadius:Int!,
        $borderWidth:Int!,
        $padding:Int!,
        $margin:Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor:$backgroundColor,
                borderColor:$borderColor,
                borderRadius:$borderRadius,
                borderWidth:$borderWidth,
                padding:$padding,
                margin:$margin) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {
    constructor() {
        super();

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            id: "",
            setup: true,
            text: "",
            color: "",
            fontSize: 0,
            backgroundColor: "",
            borderColor: "",
            borderRadius: 0,
            borderWidth: 0,
            padding: 0,
            margin: 0
        }

    }
    componentDidMount() {
        this.setState(window.input_style);
        this.setState({ setup: false });
        window.input_style = {};
        console.log("Component Did Mount");
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
        window.input_style = {};
        if (this.state.setup) {
            return (
                <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                    {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        window.input_style = {
                            text: data.logo.text,
                            id: data.logo._id,
                            color: data.logo.color,
                            fontSize: data.logo.fontSize,
                            backgroundColor: data.logo.backgroundColor,
                            borderColor: data.logo.borderColor,
                            borderRadius: data.logo.borderRadius,
                            borderWidth: data.logo.borderWidth,
                            padding: data.logo.padding,
                            margin: data.logo.margin
                        }
                        return (
                            <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                                {(updateLogo, { loading, error }) => (
                                    <div className="container">
                                        <div className="panel panel-default col-md-auto">
                                            <div className="panel-heading">
                                                <h4><Link to="/">Home</Link></h4>
                                                <h3 className="panel-title">
                                                    Edit Logo
                                        </h3>
                                            </div>
                                            <div className="row">

                                                <div className="panel-body col-lg-auto">

                                                    <form onSubmit={e => {
                                                        e.preventDefault();
                                                        updateLogo({
                                                            variables: {
                                                                id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
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
                                                            <input type="text" className="form-control" name="text" ref={node => {
                                                                text = node;
                                                            }} placeholder="Text" onChange={this.handleTextChange} defaultValue={data.logo.text} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="color">Color:</label>
                                                            <input type="color" className="form-control" name="color" ref={node => {
                                                                color = node;
                                                            }} placeholder="Color" defaultValue={data.logo.color} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="fontSize">Font Size:</label>
                                                            <input type="text" className="form-control" name="fontSize" ref={node => {
                                                                fontSize = node;
                                                            }} placeholder="Font Size" defaultValue={data.logo.fontSize} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="backgroundColor">Background Color:</label>
                                                            <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                                backgroundColor = node;
                                                            }} placeholder="Background Color" defaultValue={data.logo.backgroundColor} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderColor">Border Color:</label>
                                                            <input type="color" className="form-control" name="borderColor" ref={node => {
                                                                borderColor = node;
                                                            }} placeholder="Border Color" defaultValue={data.logo.borderColor} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderRadius">Border Radius:</label>
                                                            <input type="text" className="form-control" name="borderRadius" ref={node => {
                                                                borderRadius = node;
                                                            }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderWidth">Border Width:</label>
                                                            <input type="text" className="form-control" name="borderWidth" ref={node => {
                                                                borderWidth = node;
                                                            }} placeholder="Border Width" defaultValue={data.logo.borderWidth} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="padding">Padding:</label>
                                                            <input type="text" className="form-control" name="padding" ref={node => {
                                                                padding = node;
                                                            }} placeholder="Padding" defaultValue={data.logo.padding} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="margin">Margin:</label>
                                                            <input type="text" className="form-control" name="margin" ref={node => {
                                                                margin = node;
                                                            }} placeholder="Margin" defaultValue={data.logo.margin} />
                                                        </div>

                                                        <button type="submit" className="btn btn-success">Submit</button>
                                                    </form>
                                                    {loading && <p>Loading...</p>}
                                                    {error && <p>Error :( Please try again</p>}
                                                </div>
                                                <div className="col-lg-4" style={{
                                                    borderStyle: "solid",
                                                    color: data.logo.color,
                                                    fontSize: data.logo.fontSize + "pt",
                                                    backgroundColor: data.logo.backgroundColor,
                                                    borderColor: data.logo.borderColor,
                                                    borderRadius: data.logo.borderRadius + "pt",
                                                    borderWidth: data.logo.borderWidth + "pt",
                                                    padding: data.logo.padding + "pt",
                                                    margin: data.logo.margin + "pt"
                                                }}>
                                                    {data.logo.text}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Mutation>
                        );
                    }}
                </Query>
            );
        }
        return (<Mutation mutation={UPDATE_LOGO} key={this.state._id} onCompleted={() => this.props.history.push(`/`)}>
            {(updateLogo, { loading, error }) => (
                <div className="container">
                    <h2><Link to="/">Home</Link></h2>
                    <div className="row">
                        <div className="panel panel-default col-md-auto" style={{ marginBlockEnd: 10 }}>
                            <div className="panel-heading">

                                <h3 className="panel-title">
                                    Edit Logo
                                        </h3>
                            </div>
                            <div className="panel-body">

                                <form onSubmit={e => {
                                    e.preventDefault();
                                    updateLogo({
                                        variables: {
                                            id: this.state.id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
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
                        <div className="col-lg" style={{
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
        </Mutation>);
    }
}

export default EditLogoScreen;