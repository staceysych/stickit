import ReactDOM from "react-dom";

import "fontsource-roboto";
import "./dashboard.css";

import Dashboard from "../components/Dashboard/DashboardPage";

const root = document.createElement("div");
root.classList.add('container')
root.style.margin = '0 auto'
document.body.appendChild(root);
ReactDOM.render(<Dashboard />, root);
