import React from "react";
import JavascriptEditor from "./editor/JavascriptEditor.js";
import SpreadsheetEditor from "./editor/SpreadsheetEditor.js";

function App() {
  return (
    <div>
      <JavascriptEditor key="javascript" />
      <div className="separator" />
      <SpreadsheetEditor key="spreadsheet" />
    </div>
  );
}

export default App;
