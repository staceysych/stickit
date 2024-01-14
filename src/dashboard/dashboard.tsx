import React from "react";
import ReactDOM from "react-dom";

import "fontsource-roboto";
import "./dashboard.css";

import Dashboard from "../components/Dashboard/DashboardPage";

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<Dashboard/>, root);
