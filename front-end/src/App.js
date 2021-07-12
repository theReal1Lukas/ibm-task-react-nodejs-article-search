import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Articles from  './Articles';

function App() {
  return (
    <>
    {/* <Router>
     
          <Switch>
              <Route path='/articles' component={Articles} />
          </Switch>
      </Router> */}
      <Articles/>
    </>

  )
}

export default App;
