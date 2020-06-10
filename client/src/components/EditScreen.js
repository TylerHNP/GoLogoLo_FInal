import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../img/Logo final.svg'
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Workspace from "./Workspace"

const GET_LOGO = gql`
query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            name
            height
            width
            backgroundColor
            texts {
            layer
            text
            x
            y
            color
            fontSize
            fontFamily
            } 
            images {
            layer
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
    render() {
        const defaultLogo = {
            _id: "",
            name: "New Logo",
            images: [],
            texts: [],
            height: 400,
            width: 400,
            backgroundColor: "#e8eef2"
        }
        return (
            <Fragment>
                <header>
                    <div className="logo-container">
                        <Link to="/"><img className="logo" src={logo} alt="Logo" /></Link>
                    </div>
                    <nav>
                        <ul className="nav-links">
                            <li className="nav-link">Signed in as User101@gmail.com</li>
                            <li className="nav-link"><div className="yellow">SETTINGS</div></li>
                            <li className="nav-link"><div className="red">LOG OUT</div></li>
                        </ul>
                    </nav>
                </header>
                {(this.props.match.params.action === "edit") && <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                    {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;

                        return (
                            <Workspace addCallback={false} logo={data.logo} history={this.props.history} />
                        );
                    }}
                </Query>}
                {(this.props.match.params.action !== "edit") && <Workspace addCallback={true} logo={defaultLogo} history={this.props.history} />}
                <footer>
                    <div className="footer_text">
                        Powered by GologoLo.org
                    </div>
                </footer>
            </Fragment>);

    }
}

export default EditScreen;
