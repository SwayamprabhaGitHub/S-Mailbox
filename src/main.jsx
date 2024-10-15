import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ModalProvider from "./store/ModalProvider.jsx";
import { Provider } from "react-redux";
import store from "./store/index.jsx";

createRoot(document.getElementById("root")).render(<Provider store={store}><ModalProvider><App /></ModalProvider></Provider>);
