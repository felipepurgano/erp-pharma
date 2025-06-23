import React from "react";
import { useLocation } from "react-router-dom";
import AppRouter from "./router";
import styles from "./styles/App.module.css";

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div
      className={`${styles.app} ${isHome ? styles.homePadding : ""}`}
    >
      <AppRouter />
    </div>
  );
}
