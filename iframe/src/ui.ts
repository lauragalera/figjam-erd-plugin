/// <reference path="../../types.d.ts" />

import { EditorView, ViewUpdate, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { indentWithTab } from "@codemirror/commands";
import { Parser } from "@dbml/core";

import Helper from "../utils";

import { LanguageSupport } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";

// Replaced by the widget to inject state
const INITIAL_LANGUAGE = "JavaScript";
const TABLE_LIST = [];

// The mapping from languages to CodeMirror packages
const LANGUAGES = [
  {
    name: "JavaScript",
    package: () => javascript({ jsx: true, typescript: true }),
  },
];

const availableParsers = ["mysql", "postgres", "dbml"];

let parser: "mysql" | "postgres" | "dbml" = "dbml";

// Initialize the language
const languageObject = LANGUAGES.filter((x) => x.name === INITIAL_LANGUAGE)[0];
const language = languageObject.package();
const languageName = languageObject.name;

createInfoText();

createInputFromat();

// create div with class name editor container and append it after p
const editorContainer = document.createElement("div");
editorContainer.className = "editor-container";
editorContainer.style.display = "flex";
editorContainer.style.flexDirection = "row";
editorContainer.style.width = "100%";
editorContainer.style.height = "100%";
// editorcontainer child width equaly divided
editorContainer.style.flex = "1";

const tableContainer = horizonContainer("table-container", { portion: 3 });
const existTableContainer = horizonContainer("exist-table-container", {
  portion: 1,
  align: "start",
  other: "height: 525px; border: 1px dashed gray;",
});
// const actionContainer = horizonContainer("action-container");

editorContainer.appendChild(tableContainer);

document.body.appendChild(editorContainer);

/**
 * Gets the CodeMirror editor extension configuration for the given languages
 * @param language The CodeMirror language package
 * @param languageName The name of the language package (see {@link LANGUAGES})
 * @returns CodeMirror extensions to power the editor
 */
function getExtensions(language: LanguageSupport, languageName: string) {
  // Cached styles

  return [
    // Essential setup
    [basicSetup, keymap.of([indentWithTab]), language],
    // Update function

    EditorView.updateListener.of((v: ViewUpdate) => {
      if (
        v.docChanged ||
        (v.transactions.length > 0 &&
          v.transactions.some((transaction) => transaction.reconfigured))
      ) {

        console.log("Document changed in editor.");


        // on Document changed
        const docContents = v.state.doc.toString();
        console.log("Current document contents:", docContents);

        let dbmlJSON: string | null = null;
        let dbmlError: string | null = null;

        try {
          const parseDbml = Parser.parse(docContents, parser);

          console.log("Parsed DBML library:", parseDbml);

          TABLE_LIST.length = 0;
          parseDbml.schemas.forEach((schema) => {
            schema.tables.forEach((table) => {
              TABLE_LIST.push({
                schemaName: schema.name || 'public',
                name: table.name,
                fields: table.fields,
              });
            });
          });

          renderExistTableList(existTableContainer);

          dbmlJSON = Helper.convertToJson(parseDbml, parser);
          console.log("Parsed DBML JSON:", dbmlJSON);
        } catch (err) {
          dbmlError = err.message;
          displayStatusError(existTableContainer, dbmlError)
          console.error("Error parsing DBML:", dbmlError);
        }

        // The message to pass back to the widget
        const message: Message = {
          type: "text",
          text: docContents,
          dbml: dbmlJSON,
          dbmlError: dbmlError,
          language: languageName,
          buttonAction: "update",
          parser: parser,
        };

        returnMessage(parent, message);

      } else {

        console.log("No changes in the document.");
      }
    }),
  ];
}

const returnMessage = (parent, message) => {

  console.log("Sending message to parent:", message);
  document.onkeydown = function (event) {
    const theEvent: any = event || window.event;
    var isEscape = false;
    if ("key" in theEvent) {
      isEscape = theEvent.key === "Escape" || theEvent.key === "Esc";
    } else {
      isEscape = theEvent.keyCode === 27;
    }

    if (isEscape) {
      const inputWrapper = document.getElementById("input-wrapper");
      if (inputWrapper) {
        inputWrapper.innerHTML = `<span style="font-family: monospace; font-size: 16px; color: gray;">Creating tables...</span>`;
      }
      console.log("Escape key pressed!");
      parent.postMessage(
        {
          pluginMessage: message,
        },
        "*"
      );
    }
  };
};

// Create the CodeMirror editor
const editor = new EditorView({
  state: EditorState.create({
    doc: `${availableParsers.join(" | ")} format`, // INITIAL_DOC replaced by the widget to inject state
    extensions: getExtensions(language, languageName),
  }),
  parent: tableContainer,
});
editor.focus();

// createRefEditor();
renderExistTableList(existTableContainer);
editorContainer.appendChild(existTableContainer);

editor.dom.style.width = "100%";
editor.dom.style.height = "90%";
editor.dom.style.border = "0.2px solid gray";

function horizonContainer(
  className: string = "container-name",
  extra: { portion?: number; align?: "center" | "start"; other?: string } = {
    portion: 1,
    align: "center",
    other: "",
  }
) {
  const { portion, align, other = "" } = extra;

  const container = document.createElement("div");
  container.classList.add(className);
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.paddingLeft = "5px";
  container.style.paddingRight = "5px";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = align;
  container.style.flex = portion.toString();
  container.style.overflow = "scroll";
  container.style.cssText = container.style.cssText + other;
  return container;
}


function createInfoText() {
  const infoText = document.createElement("p");
  infoText.innerHTML = "Press ESC to exit code editor";
  document.body.appendChild(infoText);
}

function displayStatusError(container: HTMLElement, dbmlError: string) {

  container.innerHTML = "";
  const errorDiv = document.createElement("div");
  errorDiv.textContent = `Error parsing: ${dbmlError}`;
  errorDiv.style.color = "red";
  errorDiv.style.padding = "8px";
  errorDiv.style.borderRadius = "4px";
  errorDiv.style.marginBottom = "10px";
  errorDiv.style.fontFamily = "monospace";

  container.appendChild(errorDiv);
}

function renderExistTableList(container: HTMLElement) {

  // Clear previous contents
  container.innerHTML = "";

  console.log("Rendering existing table list...");
  console.log("TABLE_LIST:", TABLE_LIST);

  const availableTable = document.createElement("ul");
  availableTable.style.paddingLeft = '20px';

  if (TABLE_LIST.length > 0) {
    (TABLE_LIST as SiblingTable[]).forEach((table: SiblingTable) => {
      const li = document.createElement("li");

      const span = document.createElement("span")
      span.innerHTML = table.schemaName + "." + table.name;
      li.appendChild(span);

      const fieldUl = document.createElement("ul");
      fieldUl.style.paddingLeft = '10px';

      const tableField = table.fields || [];
      tableField.forEach((field) => {
        const fieldLi = document.createElement("li");
        fieldLi.textContent = field.name;
        fieldUl.appendChild(fieldLi);
      });

      li.appendChild(fieldUl);
      availableTable.appendChild(li);
    });
  } else {
    console.log("No tables found in TABLE_LIST.");
  }

  container.appendChild(availableTable);
}

function createInputFromat(){
const inputWrapper = document.createElement("div");
inputWrapper.id = "input-wrapper";
inputWrapper.style.display = "flex";
inputWrapper.style.gap = "8px";
inputWrapper.style.margin = "10px 20px";

const input = document.createElement("input");
input.type = "text";
input.placeholder = "Enter format (g.e. dbml)";
input.style.flex = "1";
input.style.padding = "6px 8px";
input.style.fontSize = "14px";
input.style.fontFamily = "monospace";

const button = document.createElement("button");
button.textContent = "Enter";
button.style.padding = "6px 12px";
button.style.fontSize = "14px";
button.style.cursor = "pointer";

button.onclick = () => {
  const value = input.value.trim();
  if (value) {
    console.log("User input:", value);
    if (!availableParsers.includes(value as any)) {
      displayStatusError(existTableContainer, `Invalid format: ${value}`);
      return;
    }
    parser = value as "mysql" | "postgres" | "dbml";
    clearStatusText(existTableContainer);
    existTableContainer.innerHTML = `<div style="font-family: monospace; color: green;">${parser} selected successfully!</div>`;

    setTimeout(() => {
      clearStatusText(existTableContainer);
    }, 1000);

    console.log("Selected parser:", parser);
  }
};

inputWrapper.appendChild(input);
inputWrapper.appendChild(button);
document.body.appendChild(inputWrapper);
}

function clearStatusText(container: HTMLElement) {
  container.innerHTML = "";
}