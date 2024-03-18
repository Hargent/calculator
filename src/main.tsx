import "./index.css";

import App from "./app/app.tsx";
import { AppContextProviders } from "./context/index.tsx";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProviders>
      <App />
    </AppContextProviders>
  </React.StrictMode>
);
