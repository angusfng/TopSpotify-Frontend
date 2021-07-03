import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CookiesProvider>
        <Router>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </Router>
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
