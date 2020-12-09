import React from "react";
import ReactDom from "react-dom";
import "./styles.css";
import {App} from "./components/App"
import {BrowsterRouter as Router} from "react-router-dom"
import {AppState} from "./AppState"

ReactDom.render(<AppState><Router><App /></Router></AppState>, document.querySelector("#root"));
