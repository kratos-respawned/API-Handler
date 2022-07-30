import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
let rootElement = document.getElementById("root");
let root = ReactDOM.createRoot(rootElement);
root.render(<App />);
