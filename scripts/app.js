import { dispatch } from "./state-reducer.js";
import { ACTION } from "./constants.js";
import { domNodes } from "./dom-nodes.js";

domNodes.keyboardKeys.forEach((key) => {
  key.addEventListener("click", (event) =>
    dispatch({
      type: ACTION.PRESS_KEY,
      noteNumber: event.target.dataset.keyboardKey,
    })
  );
});
