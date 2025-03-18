import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import "./style.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Layout from "./components/Layout";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <Layout>
          <App />
        </Layout>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
