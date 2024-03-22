import "./index.css";

import App from "./app/app.tsx";
import { AppContextProviders } from "./context/index.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProviders>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AppContextProviders>
  </React.StrictMode>
);
