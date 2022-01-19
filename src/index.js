import React from "react";
import ReactDOM from "react-dom";
import Editor from "./components/editor";
import DanteEditor from "./components/danteEditor";
import MedEditor from "./components/mediumEd";

import "./styles.css";

function App() {
  return (
    <div className="container">
      <h1>CKEditor</h1>
      <div className="row">
        <div className="col-8 col-offset-2">
          <Editor />
        </div>
      </div>
      <hr />
      <h1>Dante Editor</h1>
      <div className="row">
        <div className="col-8 col-offset-2">
          <DanteEditor />
        </div>
      </div>
      <hr />
      <h1>Medium Editor</h1>
      <MedEditor />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
