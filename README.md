# Matrix Maker

This is a 12-tone matrix generator written in vanilla JavaScript and plain CSS.

## Generating the grid with Emmet

Hand-coding the HTML for the matrix would be tedious. I used Emmet abbreviations to generate the necessary markup. I've included the abbreviations below so that I can quickly regenerate the grid if I need to make changes to it in the future. Copy and paste them into the main `#matrix` element then tab expand the abbreviations.

```txt
.axis-row>.axis-corner+.axis-cell[data-axis-cell-top="$@0"]*12+.axis-corner

<!-- begin matrix-->

.matrix-row[data-matrix-row="$@0"]*12>.axis-cell[data-axis-cell-left="$@0"]+.matrix-cell[data-matrix-cell-column="$@0"]*12+.axis-cell[data-axis-cell-right="$@0"]

<!-- end matrix -->

.axis-row>.axis-corner+.axis-cell[data-axis-cell-bottom="$@0"]*12+.axis-corner
```
