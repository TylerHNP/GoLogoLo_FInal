import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// THESE ARE OUR REACT SCREENS, WHICH WE WILL ROUTE HERE
import HomeScreen from './components/HomeScreen';
// import EditLogoScreen from './components/EditLogoScreen';
import EditScreen from './components/EditScreen';

const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' });

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <React.Fragment>
                <Route exact path='/' component={HomeScreen} />
                <Route path='/edit/:id/:action' component={EditScreen} />
            </React.Fragment>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://create-react-app.dev/docs/making-a-progressive-web-app/
serviceWorker.unregister();
