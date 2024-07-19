import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Contact from "./views/Contact";
import AddContact from "./views/AddContact";
import { StoreWrapper } from "./store/flux";

function App() {
  return (
    <StoreWrapper>
      <Router>
        <Switch>
          <Route exact path="/" component={Contact} />
          <Route path="/add" component={AddContact} />
          <Route path="/edit/:id" component={AddContact} />
        </Switch>
      </Router>
    </StoreWrapper>
  );
}

export default App;
