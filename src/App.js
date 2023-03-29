import "./App.css";
import { Outlet } from "react-router-dom";
import Navigatoer from "./Components/Navigatoer/Navigatoer";
import React from "react";
import Container from "./Components/Layout/Container";

function App() {
  return (
    <div id="wrapper">
      <Navigatoer />
      <Container />
    </div>
  );
}

export default App;
