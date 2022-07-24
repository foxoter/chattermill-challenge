import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyles } from "./components/global-styles";
import { Routes } from "./components/routes";
import { ProvideAuth } from "./services/auth";

const App: React.FC = () => {
  return (
    <>
      <ProvideAuth>
        <GlobalStyles />
        <Routes />
      </ProvideAuth>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("react-root"));
