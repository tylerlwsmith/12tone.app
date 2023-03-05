import { NOTE_DISPLAY_TYPE, ACTION } from "./constants.js";
import { queryAppDomNodes } from "./dom-nodes.js";
import { DomReconciler } from "./dom-reconciler.js";

class App {
  constructor(domNodes) {
    this._reconciler = new DomReconciler(domNodes);
    this._applicationState = this._getDefaultApplicationState();
    this._domNodes = domNodes;
  }

  initialize = () => {
    this._addKeyboardClickHandlers();
    this._addResetButtonHandler();
    this._addDisplayNoteTypeSelectHandler();
  };

  _getDefaultApplicationState = () => {
    return {
      toneRow: [],
      noteDisplayType: NOTE_DISPLAY_TYPE.SHARP,
    };
  };

  _addKeyboardClickHandlers = () => {
    this._domNodes.keyboardKeys.forEach((key) => {
      key.addEventListener("click", (event) =>
        this._dispatch({
          type: ACTION.PRESS_KEY,
          noteNumber: event.target.dataset.keyboardKey,
        })
      );
    });
  };

  _addResetButtonHandler = () => {
    this._domNodes.clearToneRowButton.addEventListener("click", () => {
      this._dispatch({ type: ACTION.CLEAR_TONE_ROW });
    });
  };

  _addDisplayNoteTypeSelectHandler = () => {
    this._domNodes.noteDisplayTypeSelect.addEventListener("change", (event) => {
      this._dispatch({
        type: ACTION.SET_NOTE_DISPLAY_TYPE,
        noteDisplayType: event.target.value,
      });
    });
  };

  _appStateReducer = (currentState, action) => {
    switch (action.type) {
      case ACTION.PRESS_KEY: {
        const pressedKey = Number.parseInt(action.noteNumber);
        const newToneRow = currentState.toneRow.includes(pressedKey)
          ? currentState.toneRow.filter(
              (noteNumber) => pressedKey !== noteNumber
            )
          : [...currentState.toneRow, pressedKey];

        return { ...currentState, toneRow: newToneRow };
      }
      case ACTION.SET_NOTE_DISPLAY_TYPE: {
        return { ...currentState, noteDisplayType: action.noteDisplayType };
      }
      case ACTION.CLEAR_TONE_ROW: {
        return { ...currentState, toneRow: [] };
      }
    }
  };

  _dispatch = (action) => {
    this._applicationState = this._appStateReducer(
      this._applicationState,
      action
    );

    this._reconciler.reconcile(this._applicationState);
  };
}

const appDomNodes = queryAppDomNodes();
const app = new App(appDomNodes);

app.initialize();
