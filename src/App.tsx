import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import createWidget from "./components/createWidget";
import showWidget from "./components/showWidget";

function App() {
  return (
      <Router>
        <Route exact path="/" component={createWidget} />
          <Route exact path="/show" component={showWidget} />
      </Router>
  );
}

export default App;
