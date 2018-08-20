import React from "react";
import ReactDOM from "react-dom";

import UnicornEditor from "./UnicornEditor";

import "./styles.css";

function App() {
  return (
    <div>
      <UnicornEditor />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
