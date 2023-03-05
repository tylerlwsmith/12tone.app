const getDomElement = (selector) => document.querySelector(selector);
const getDomElements = (selector) => [...document.querySelectorAll(selector)];

const axisElements = getDomElements("[data-axis]").reduce(
  (axisDictionary, axisElement) => {
    return {
      ...axisDictionary,
      [axisElement.dataset.axis]: axisElement,
    };
  },
  {}
);

export const domNodes = {
  keyboardKeys: getDomElements(`[data-keyboard-key]`),
  matrixRows: getDomElements("#matrix-rows [data-matrix-row]"),
  emptyMatrixPlaceholder: getDomElement("#empty-matrix-placeholder"),
  matrixContainer: getDomElement("#matrix-container"),
  axes: {
    top: axisElements.top,
    bottom: axisElements.bottom,
    left: axisElements.left,
    right: axisElements.right,
  },
};
