
import React from "react";
import Header from "./components/header/Header.js";
import Main from "./components/main/Main.js";
import Footer from "./components/footer/Footer";
import { SelectContextProvider } from "./contexts/SelectContext";
import { WheatherContextProvider } from "./contexts/WheatherContext";

function App() {
  return (
    <div className="App">
      <SelectContextProvider>
        <WheatherContextProvider>
          <Header />
          <Main />
          <Footer />
        </WheatherContextProvider>
      </SelectContextProvider>
    </div>
  );
}

export default App;