import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { ShipsProvider } from "./contexts/ShipsContext";
import { ComponentsProvider } from "./contexts/ComponentsContext";
import { JobsProvider } from "./contexts/JobsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ShipsProvider>
        <ComponentsProvider>
          <JobsProvider>
            <App />
          </JobsProvider>
        </ComponentsProvider>
      </ShipsProvider>
    </AuthProvider>
  </React.StrictMode>
);
