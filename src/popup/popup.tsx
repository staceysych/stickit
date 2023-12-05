import React from "react";
import ReactDOM from "react-dom";

import "fontsource-roboto";
import "./popup.css";

import Menu from "../components/Menu";

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<Menu />, root);
