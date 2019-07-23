import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './views';
import About from './views/about';

function PageNotFound({ location }) {
    return (
        <div>
            <h1>😔 Oops!</h1>
            <section>can't find: {location.pathname.replace(/\/$/, "")}</section>
            <a href="/" className="home-link">&#60; home</a>
        </div>
    );
}

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" exact component={Index} />
                        <Route path="/about" exact component={About} />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Router;