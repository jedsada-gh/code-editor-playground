import React, { useEffect, useRef } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

function JavascriptEditor() {
  const monaco = useMonaco();
  const editorRef = useRef(null);

  useEffect(() => {
    if (!monaco) {
      console.log("Monaco instance is not ready yet.");
      return;
    }
  }, [monaco]);

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    const rowProperties = [
      {
        label: "pat",
        kind: monaco.languages.CompletionItemKind.Property,
        detail: "string",
        documentation: "Property nuvo: string",
        insertText: "nuvo",
      },
      {
        label: "companyName",
        kind: monaco.languages.CompletionItemKind.Property,
        detail: "string",
        documentation: "Property companyName: string",
        insertText: "companyName",
      },
    ];

    monaco.languages.registerCompletionItemProvider("javascript", {
      triggerCharacters: [".", "("],
      provideCompletionItems: function (model, position) {
        // const textUntilPosition = model.getValueInRange({
        //   startLineNumber: position.lineNumber,
        //   startColumn: 1,
        //   endLineNumber: position.lineNumber,
        //   endColumn: position.column,
        // });

        // Check if the text until the cursor ends with "row."
        // if (textUntilPosition.endsWith("row.")) {
        //   console.log("here");
        // Return the suggestions if "row." is detected
        //   return { suggestions: suggestions };
        // }

        // Return an empty array if "row." is not detected
        // return { suggestions: [] };

        const textUntilPosition = model.getValueInRange({
          startLineNumber: 1, // Start from the first line
          startColumn: 1, // Start from the first column
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        // A simple check to infer if 'row' might be a function parameter
        // This regex looks for patterns like "(row)" or "row =>"
        // Note: This is a basic check and might not be accurate for all coding styles or scenarios
        const likelyFunctionParameter = /\((\s*row\s*)\)|row\s*=>/.test(
          textUntilPosition
        );

        if (likelyFunctionParameter && textUntilPosition.endsWith("row.")) {
          return { suggestions: rowProperties };
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
        theme="vs-dark"
        height="500px"
        defaultValue="// Type your javascript here"
        defaultLanguage="javascript"
        path="javascript"
        // https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IStandaloneEditorConstructionOptions.html
        options={{
          minimap: { enabled: false },
        }}
        onMount={handleEditorMount}
        onValidate={handleEditorValidation}
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

export default JavascriptEditor;
