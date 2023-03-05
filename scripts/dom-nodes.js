import { MATRIX_AXIS } from "./constants.js";

export function queryAppDomNodes() {
  const getDomElement = (selector) => document.querySelector(selector);
  const getDomElements = (selector) => [...document.querySelectorAll(selector)];

  const axisElements = getDomElements("[data-axis]").reduce(
    (axisDictionary, axisElement) => {
      return {
        ...axisDictionary,
        [axisElement.dataset.axis]: [...axisElement.children],
      };
    },
    {}
  );

  return {
    matrixRowsCells: getDomElements("#matrix-rows [data-matrix-row]").map(
      (row) => [...row.children]
    ),
    toneRowCells: getDomElements("#tone-row [data-tone-row-cell]"),
    keyboardKeys: getDomElements(`[data-keyboard-key]`),
    emptyMatrixPlaceholder: getDomElement("#empty-matrix-placeholder"),
    matrixContainer: getDomElement("#matrix-container"),
    noteDisplayTypeSelect: getDomElement("#note-display-type-select"),
    clearToneRowButton: getDomElement("#clear-tone-row-button"),
    axisCellsP: axisElements[MATRIX_AXIS.P],
    axisCellsI: axisElements[MATRIX_AXIS.I],
    axisCellsR: axisElements[MATRIX_AXIS.R],
    axisCellsRI: axisElements[MATRIX_AXIS.RI],
  };
}
