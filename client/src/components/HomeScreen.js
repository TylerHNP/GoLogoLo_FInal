import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import logo from '../img/Logo final.svg'
import plusIcon from '../img/plus_icon.svg'
import { Query } from 'react-apollo';
import Canvas from './PreviewCanvas';
const GET_LOGOS = gql`
  {
    logos {
      _id
      name
      lastUpdate
    }
  }
`;
const GET_LOGO = gql`
query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            name
            height
            width
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
class HomeScreen extends Component {
    state = {
        selected: null
    }

    handlePreview = (e) => {
        this.setState({ selected: e.target.id });
    }

    passToCanvas = () => {
        if (this.state.selected) {
            return (
                <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.state.selected }}>
                    {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        // console.log(data.logo)
                        return <Canvas selected={this.state.selected} width={data.logo.width} height={data.logo.height}
                            contents={(data.logo.texts.concat(data.logo.images).sort(function (logo1, logo2) {
                                if (logo1.layer > logo2.layer) {
                                    return 1;
                                }
                                else if (logo1.layer === logo2.layer) {
                                    return 0;
                                }
                                return -1;
                            }))} />;
                    }}
                </Query>);
        }
        return (<Canvas selected={this.state.selected} />);
    }
    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

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
                            <section>
                                <div className="control-container">
                                    <div id="menu">
                                        <div className="green" style={{
                                            padding: "1rem",
                                            fontSize: 24,
                                            textAlign: "center"
                                        }
                                        }>Recent Works</div>
                                        <div id="logo_links">
                                            {data.logos.sort(function (logo1, logo2) {
                                                if (logo1.lastUpdate < logo2.lastUpdate) {
                                                    return 1;
                                                }
                                                else if (logo1.lastUpdate === logo2.lastUpdate) {
                                                    return 0;
                                                }
                                                return -1;
                                            }).map((logo, index) => (
                                                <ul key={index}>
                                                    <li className="logo_link" >
                                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                                            <div id={logo._id} onClick={this.handlePreview} style={{ cursor: "pointer", flex: 6 }}>{logo.name}</div>
                                                            <Link style={{ flex: 2, color: 'inherit', textDecoration: 'inherit' }} to={`/edit/${logo._id}/${"edit"}`}>
                                                                <button className="edit_button" >Edit</button>
                                                            </Link>
                                                        </div>
                                                        <div style={{ fontSize: 10, fontStyle: "italic" }}>last edited {logo.lastUpdate}</div>
                                                    </li>
                                                </ul>
                                            ))} </div><div>
                                        </div>
                                    </div>
                                    <Link style={{ color: 'inherit', textDecoration: 'inherit' }} id="add_logo_button" to={`/edit/${"null"}/${"create"}`}>
                                        <div id="create_new_button">
                                            Create New
                                        <img style={{ marginLeft: 10, marginBottom: 5, verticalAlign: "middle" }} src={plusIcon} alt="Plus Icon" />
                                        </div></Link>
                                </div>
                                <div className="workplace-container">
                                    {this.passToCanvas()}
                                </div>
                            </section>
                            <footer>
                                <div className="footer_text">
                                    Powered by GologoLo.org
                                </div>
                            </footer>
                        </Fragment>


                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
