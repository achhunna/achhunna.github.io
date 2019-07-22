import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Index from './views';

function PageNotFound({ location }) {
    return <h2>404 Page Not Found @ {location.pathname.replace(/\/$/, "")}</h2>;
}

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/app">App</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/" exact component={Index} />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Router;