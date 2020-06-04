import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../img/Logo final.svg'
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Workspace from "./Workspace"

const GET_LOGO = gql`
query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            name
            height
            width
            texts {
            layer
            type
            text
            x
            y
            color
            fontSize
            fontFamily
            } 
            images {
            layer
            type
            src
            x
            y
            height
            width
            layer
            } 
            lastUpdate
        }
    }

`;

class EditScreen extends Component {
    constructor() {
        super();

    }
    render() {
        if (this.props.match.params.action == "edit") {
            return (
                <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                    {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        console.log(data.logo);
                        return (
                            <Fragment>
                                <header>
                                    <div className="logo-container">
                                        <img className="logo" src={logo} alt="Logo" />
                                    </div>
                                    <nav>
                                        <ul className="nav-links">
                                            <li className="nav-link">Signed in as User101@gmail.com</li>
                                            <li className="nav-link"><div className="yellow">SETTINGS</div></li>
                                            <li className="nav-link"><div className="red">LOG OUT</div></li>
                                        </ul>
                                    </nav>
                                </header>
                                <Workspace saveCallback={this.saveCallback} logo={data.logo} />
                                <footer>
                                    <div className="footer_text">
                                        Powered by GologoLo.org
                                </div>
                                </footer>
                            </Fragment>
                        );
                    }}
                </Query>);
        }
        else {

        }
    }
}

export default EditScreen;
