import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ModalProvider from "./store/ModalProvider.jsx";

createRoot(document.getElementById("root")).render(<ModalProvider><App /></ModalProvider>);
