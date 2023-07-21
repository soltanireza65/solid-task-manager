import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

import { MantineProvider } from "@mantine/core";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "@inrupt/solid-ui-react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <SessionProvider>
      <React.StrictMode>
        <BrowserRouter>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <App />
          </MantineProvider>
        </BrowserRouter>
      </React.StrictMode>
    </SessionProvider>
  </RecoilRoot>
);
