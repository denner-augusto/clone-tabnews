import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import "./pages/styles.css";
// import styles from "./pages/styles.module.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
// function Home() {
//   return <h1 align="center"> Em Construção </h1>;
// }

// export default Home;
