import { NOTE_DISPLAY_TYPE, ACTION } from "./constants.js";
import { DomReconciler } from "./dom-reconciler.js";
import { domNodes } from "./dom-nodes.js";

const defaultApplicationState = {
  toneRow: [],
  noteDisplayType: NOTE_DISPLAY_TYPE.SHARP,
};

let applicationState = { ...defaultApplicationState };

function reduce(currentState, action) {
  switch (action.type) {
    case ACTION.PRESS_KEY: {
      const pressedKey = Number.parseInt(action.noteNumber);
      const newToneRow = currentState.toneRow.includes(pressedKey)
        ? currentState.toneRow.filter((noteNumber) => pressedKey !== noteNumber)
        : [...currentState.toneRow, pressedKey];

      return { ...currentState, toneRow: newToneRow };
    }
    case ACTION.SET_DISPLAY_NOTE_TYPE: {
      return { ...currentState, noteDisplayType: action.noteDisplayType };
    }
    case ACTION.CLEAR_TONE_ROW: {
      return { ...currentState, toneRow: [] };
    }
  }
}

const reconciler = new DomReconciler(domNodes);

export function dispatch(action) {
  applicationState = reduce(applicationState, action);
  console.log(applicationState);

  reconciler.reconcile(applicationState);
}
