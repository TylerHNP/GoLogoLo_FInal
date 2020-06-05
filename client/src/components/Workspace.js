import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import Canvas from './WorkspaceCanvas';

class Workspace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            currentLayer: 0,
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
    render() {
        return (
            <section>
                <div className="control-container">
                    <div id="canvas_controls" className="controls" style={{

                    }}>

                    </div>
                    <div className="controls" id="text_controls">

                    </div>
                    {/* <div className="controls" id="image_controls">

                    </div> */}
                    <div className="controls" id="button_controls">

                    </div>
                </div>
                <div className="workplace-container">
                    <Canvas width={this.state.width} height={this.state.height} contents={this.state.contents} />
                </div>
            </section>
        );
    }
}

export default Workspace;
