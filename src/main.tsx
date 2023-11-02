import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { store } from "./store.ts";

import { ThemeProvider } from "./components/ThemeProvider.tsx";

import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App />
        <Toaster />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
