import {
  generateMatrix,
  generateAxisLabelsX,
  generateAxisLabelsY,
  getNoteName,
} from "./note-utilities.js";

const HIDDEN_CLASS = "hidden";

export class DomReconciler {
  constructor({
    matrixRowsCells,
    toneRowCells,
    keyboardKeys,
    emptyMatrixPlaceholder,
    matrixContainer,
    axisCellsP,
    axisCellsI,
    axisCellsR,
    axisCellsRI,
  }) {
    this.domNodes = {
      matrixRowsCells,
      toneRowCells,
      keyboardKeys,
      emptyMatrixPlaceholder,
      matrixContainer,
      axisCellsP,
      axisCellsI,
      axisCellsR,
      axisCellsRI,
    };
  }

  reconcile = (state) => {
    this._toggleMatrixVisibility(state);
    this._updateToneRow(state);
    this._updateKeyboard(state);
    this._updateMatrix(state);
  };

  _toggleMatrixVisibility = ({ toneRow }) => {
    if (toneRow.length > 0) {
      this.domNodes.emptyMatrixPlaceholder.classList.add(HIDDEN_CLASS);
      this.domNodes.matrixContainer.classList.remove(HIDDEN_CLASS);
    } else {
      this.domNodes.emptyMatrixPlaceholder.classList.remove(HIDDEN_CLASS);
      this.domNodes.matrixContainer.classList.add(HIDDEN_CLASS);
    }
  };

  _updateToneRow = ({ toneRow, noteDisplayType }) => {
    this.domNodes.toneRowCells.forEach((cell, index) => {
      cell.innerText =
        index in toneRow ? getNoteName(toneRow[index], noteDisplayType) : "";
    });
  };

  _updateKeyboard = ({ toneRow, noteDisplayType }) => {
    const disabledClassName = "keyboard-key--disabled";
    this.domNodes.keyboardKeys.forEach((key, index) => {
      if (toneRow.includes(index)) {
        key.classList.add(disabledClassName);
      } else {
        key.classList.remove(disabledClassName);
      }
      key.innerText = getNoteName(index, noteDisplayType);
    });
  };

  _updateMatrix = ({ toneRow, noteDisplayType }) => {
    // TODO:
    // If this function gets the previous state, it can do some smart
    // optimizations around which DOM nodes tlo change.
    const { axisCellsP, axisCellsI, axisCellsR, axisCellsRI } = this.domNodes;
    const xAxis = generateAxisLabelsX(toneRow);
    const yAxis = generateAxisLabelsY(toneRow);
    const matrix = generateMatrix(toneRow);

    this.domNodes.matrixRowsCells.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        cell.innerText = getNoteName(
          matrix[rowIndex][columnIndex],
          noteDisplayType
        );
      });

      axisCellsP[rowIndex].innerHTML = yAxis[rowIndex];
      axisCellsR[rowIndex].innerHTML = yAxis[rowIndex];
      axisCellsI[rowIndex].innerHTML = xAxis[rowIndex];
      axisCellsRI[rowIndex].innerHTML = xAxis[rowIndex];
    });
  };
}
