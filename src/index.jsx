import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider } from "@mui/material";
import { Auth0Provider } from "@auth0/auth0-react";

//import { makeServer } from "./api/fakeApi";
import { theme } from "./theme/theme";

//makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="rowanvale.eu.auth0.com"
      clientId="KfviRnWx94eF1m99YxnicEhpxgDe0X15"
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
