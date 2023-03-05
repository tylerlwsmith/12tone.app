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
    this.toggleMatrixVisibility(state.toneRow);
    this.updateToneRow(state.toneRow);
    this.updateKeyboard(state.toneRow);
  };

  toggleMatrixVisibility = (toneRow) => {
    if (toneRow.length > 0) {
      this.domNodes.emptyMatrixPlaceholder.classList.add(HIDDEN_CLASS);
      this.domNodes.matrixContainer.classList.remove(HIDDEN_CLASS);
    } else {
      this.domNodes.emptyMatrixPlaceholder.classList.remove(HIDDEN_CLASS);
      this.domNodes.matrixContainer.classList.add(HIDDEN_CLASS);
    }
  };

  updateToneRow = (toneRow) => {
    this.domNodes.toneRowCells.forEach((cell, index) => {
      cell.innerText = index in toneRow ? toneRow[index] : "";
    });
  };

  updateKeyboard = (toneRow) => {
    const disabledClassName = "keyboard-key--disabled";
    this.domNodes.keyboardKeys.forEach((key, index) => {
      if (toneRow.includes(index)) {
        key.classList.add(disabledClassName);
      } else {
        key.classList.remove(disabledClassName);
      }
    });
  };
}
