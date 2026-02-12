import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppQueryProvider } from "./app/providers/query-provider";

// 1. Import Mantine Styles (Order matters!)
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

// 2. Import Mantine Provider
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  /** Put your mantine theme override here */
  primaryColor: "blue",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppQueryProvider>
      <MantineProvider theme={theme}>
        <Notifications />
        <App />
      </MantineProvider>
    </AppQueryProvider>
  </React.StrictMode>,
);
