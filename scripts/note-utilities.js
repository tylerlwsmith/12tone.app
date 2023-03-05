import { NOTE_DISPLAY_TYPE as DISPLAY_TYPE } from "./constants.js";

export function getNoteName(noteNumber, noteDisplayType) {
  if (noteNumber === null) return "";

  const sharp = DISPLAY_TYPE.SHARP;
  const flat = DISPLAY_TYPE.FLAT;
  const number = DISPLAY_TYPE.NUMBER;

  return {
    [sharp]: ["C", `C♯`, "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"],
    [flat]: ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"],
    [number]: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
  }[noteDisplayType][noteNumber];
}

export function addNote(note, interval) {
  return (note + interval) % 12;
}

export function getInterval(firstNote, secondNote) {
  const resetInterval = 12 - firstNote;
  return addNote(resetInterval, secondNote);
}

export function getMatrixNote(primeZeroStartNote, rowStartNote, currentNote) {
  if (
    primeZeroStartNote === null ||
    rowStartNote === null ||
    currentNote === null
  )
    return null;

  return addNote(getInterval(rowStartNote, primeZeroStartNote), currentNote);
}

export function generateMatrix(toneRow) {
  const fullToneRow = toneRow.concat(new Array(12 - toneRow.length).fill(null));
  const primeZero = toneRow[0];

  const matrix = fullToneRow.map((rowStartNote) => {
    return fullToneRow.map((currentNote) =>
      getMatrixNote(primeZero, rowStartNote, currentNote)
    );
  });

  return matrix;
}

export function generateAxisLabelsX(toneRow) {
  const fullToneRow = toneRow.concat(new Array(12 - toneRow.length).fill(null));
  const primeZero = toneRow[0];

  return fullToneRow.map((note) =>
    note !== null ? getInterval(primeZero, note) : null
  );
}

export function generateAxisLabelsY(toneRow) {
  const fullToneRow = toneRow.concat(new Array(12 - toneRow.length).fill(null));
  const primeZero = toneRow[0];

  return fullToneRow.map((note) =>
    note !== null ? getInterval(note, primeZero) : null
  );
}
