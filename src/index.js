import React from "react";
import { render } from "react-dom";
import Router from "./components/Router";
import "./css/style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

render(<Router />, document.querySelector("#main"));