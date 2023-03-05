# Matrix Maker

This is a 12-tone matrix generator written in vanilla JavaScript and plain CSS.

## Generating the grid with Emmet

Hand-coding the HTML for the matrix would be tedious. I used Emmet abbreviations to generate the necessary markup. I've included the abbreviations below so that I can quickly regenerate the grid if I need to make changes to it in the future. Copy and paste them into the `#matrix-wrapper` element then tab expand the abbreviations.

```txt
.matrix-wrapper__row.matrix-wrapper__row--top>.axis-corner+.axis.axis--x[data-axis="I"]>.axis-cell[data-axis-cell="$@0"]*12^.axis-corner

.matrix-wrapper__row.matrix-wrapper__row--middle>.axis.axis--y[data-axis="P"]>.axis-cell[data-axis-cell="$@0"]*12^.matrix#matrix>(.matrix-row[data-matrix-row="$@0"]*12>.matrix-cell[data-matrix-cell-column="$@0"]*12)^.axis.axis--y[data-axis="R"]>.axis-cell[data-axis-cell="$@0"]*12

.matrix-wrapper__row.matrix-wrapper__row--bottom>.axis-corner+.axis.axis--x[data-axis="RI"]>.axis-cell[data-axis-cell="$@0"]*12^.axis-corner
```
