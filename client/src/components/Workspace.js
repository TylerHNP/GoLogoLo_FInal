import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';

import Canvas from './PreviewCanvas';

class Workspace extends Component {
    render() {
        return (
            <section>
                <div className="control-container">
                    <div id="canvas_controls">
                    </div>
                    <div id="text_controls">

                    </div>
                    <div id="image_controls">

                    </div>
                    <div id="button_controls">

                    </div>
                </div>
                <div className="workplace-container">

                </div>
            </section>
        );
    }
}

export default Workspace;
