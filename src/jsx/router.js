import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "./views";
import About from "./views/about";
import Back from "./partials/back";
import Uses from "./views/uses";
import CustomHtmlPage from "./views/custom-html-page";

function PageNotFound({ location }) {
  return (
    <div className="container">
      <h1>😔 Oops!</h1>
      <section>can't find: {location.pathname.replace(/\/$/, "")}</section>
      <Back />
    </div>
  );
}

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/about" exact component={About} />
          <Route path="/uses" exact component={Uses} />
          <Route path="/pages/*" exact component={CustomHtmlPage} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
