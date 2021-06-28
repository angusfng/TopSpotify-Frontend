import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <CookiesProvider>
        <Router>
          <App />
        </Router>
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
