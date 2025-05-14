import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Shop  from "./components/Shop";
import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Header />
      <Shop />
      <Footer />
    </>
  );
}

export default App;
