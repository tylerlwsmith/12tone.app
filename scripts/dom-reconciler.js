import {
  generateMatrix,
  generateAxisLabelsX,
  generateAxisLabelsY,
  getNoteName,
} from "./note-utilities.js";
import { MATRIX_AXIS as AXIS } from "./constants.js";

const HIDDEN_CLASS = "hidden";

export class DomReconciler {
  constructor({
    matrixRowsCells,
    toneRowCells,
    keyboardKeys,
    emptyMatrixPlaceholder,
    matrixContainer,
    noteDisplayTypeSelect,
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
      noteDisplayTypeSelect,
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
    this._updateDisplayNoteTypeSelect(state);
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
    // optimizations around which DOM nodes to change.
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

      axisCellsP[rowIndex].innerHTML = this._axisHTML(yAxis[rowIndex], AXIS.P);
      axisCellsR[rowIndex].innerHTML = this._axisHTML(yAxis[rowIndex], AXIS.R);
      axisCellsI[rowIndex].innerHTML = this._axisHTML(xAxis[rowIndex], AXIS.I);
      axisCellsRI[rowIndex].innerHTML = this._axisHTML(
        xAxis[rowIndex],
        AXIS.RI
      );
    });
  };

  _updateDisplayNoteTypeSelect = ({ noteDisplayType }) => {
    this.domNodes.noteDisplayTypeSelect.value = noteDisplayType;
  };

  _axisHTML = (number, axisLabel) => {
    return number !== null
      ? `
        <div>
          <strong>${axisLabel}</strong><sub>${number}</sub>
        </div>
        `
      : "";
  };
}
