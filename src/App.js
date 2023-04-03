import "./App.css";

import './assets/css/bootstrap.min.css';
import './assets/font-awesome/css/font-awesome.css';
import './assets/css/plugins/toastr/toastr.min.css';
import './assets/css/animate.css';
import './assets/css/style.css';

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
