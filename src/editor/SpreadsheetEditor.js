import React, { useEffect, useRef } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

function SpreadsheetEditor() {
  const monaco = useMonaco();
  const editorRef = useRef(null);

  useEffect(() => {
    if (!monaco) {
      console.log("Monaco instance is not ready yet.");
      return;
    }

    monaco.languages.register({ id: "mySpreadsheetLanguage" });
    monaco.languages.setLanguageConfiguration("mySpreadsheetLanguage", {
      comments: {
        lineComment: "//",
        blockComment: ["/*", "*/"],
      },
    });
    monaco.languages.setMonarchTokensProvider("mySpreadsheetLanguage", {
      tokenizer: {
        root: [
          [
            /\b(SUM|AVG|AVERAGE|IF|COUNT|MIN|MAX|ROUND|ABS|SQRT|POWER|LOG|EXP|SIN|COS|TAN|ASIN|ACOS|ATAN|CONCATENATE|LEFT|RIGHT|MID|LEN|FIND|REPLACE|LOWER|UPPER|TRIM|VALUE|DATE|DAY|MONTH|YEAR|TODAY|NOW|EDATE|EOMONTH|NETWORKDAYS|VLOOKUP|HLOOKUP|MATCH|INDEX|AND|OR|NOT|XOR|ISEVEN|ISODD|PI|RADIANS|DEGREES|SUMIF|COUNTIF|AVERAGEIF|SUMIFS|COUNTIFS|AVERAGEIFS)\b/,
            "keyword",
          ],
          [/\b[A-Z]+[0-9]+\b/, "variable"],
          [/[=+\-*/^&><=%]/, "operator"],
          [/\b(>=|<=|<>|AND|OR|NOT|XOR)\b/, "logical"],
        ],
      },
    });
  }, [monaco]);

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    const formulaSuggestions = [
      "SUM",
      "AVG",
      "AVERAGE",
      "IF",
      "COUNT",
      "MIN",
      "MAX",
      "ROUND",
      "ABS",
      "SQRT",
      "POWER",
      "LOG",
      "EXP",
      "SIN",
      "COS",
      "TAN",
      "ASIN",
      "ACOS",
      "ATAN",
      "CONCATENATE",
      "LEFT",
      "RIGHT",
      "MID",
      "LEN",
      "FIND",
      "REPLACE",
      "LOWER",
      "UPPER",
      "TRIM",
      "VALUE",
      "DATE",
      "DAY",
      "MONTH",
      "YEAR",
      "TODAY",
      "NOW",
      "EDATE",
      "EOMONTH",
      "NETWORKDAYS",
      "VLOOKUP",
      "HLOOKUP",
      "MATCH",
      "INDEX",
      "AND",
      "OR",
      "NOT",
      "XOR",
      "ISEVEN",
      "ISODD",
      "PI",
      "RADIANS",
      "DEGREES",
      "SUMIF",
      "COUNTIF",
      "AVERAGEIF",
      "SUMIFS",
      "COUNTIFS",
      "AVERAGEIFS",
    ].map((func) => ({
      label: `${func}(A1+B1)`,
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `${func}($1)`,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: `Documentation for ${func} Nisi esse adipisicing veniam velit ea mollit. Id cillum ullamco dolore officia. Reprehenderit do elit consectetur in occaecat officia aute. Quis labore velit occaecat esse do nostrud id. Duis elit non ipsum consectetur culpa cupidatat pariatur cupidatat. Dolore anim veniam in id magna duis exercitation.`,
    }));

    monaco.languages.registerCompletionItemProvider("mySpreadsheetLanguage", {
      triggerCharacters: ["=", "(", ","],
      provideCompletionItems: function (model, position) {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        if (
          textUntilPosition.endsWith("=") ||
          textUntilPosition.includes("(")
        ) {
          return {
            suggestions: formulaSuggestions,
          };
        }

        return { suggestions: [] };
      },
    });
  };

  function handleEditorValidation(markers) {
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  }

  return (
    <div>
      <Editor
        height="500px"
        theme="vs-dark"
        defaultValue="// Type your formula here"
        defaultLanguage="mySpreadsheetLanguage"
        path="mySpreadsheetLanguage"
        onMount={handleEditorMount}
        onValidate={handleEditorValidation}
        // https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IStandaloneEditorConstructionOptions.html
        options={{
          minimap: { enabled: false },
        }}
      />

      <div className="separator"></div>
      <div className="layout-item-end">
        <button
          className="primary-button"
          onClick={() => {
            const value = editorRef.current.getValue();
            console.log(value);
          }}
        >
          Validate
        </button>
      </div>
    </div>
  );
}

export default SpreadsheetEditor;
