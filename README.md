# Matrix Maker

This project is a 12-tone matrix generator written in vanilla JavaScript and plain CSS. I built this as a [React Native app](https://play.google.com/store/apps/details?id=com.deadhandmedia.matrixmaker&hl=en_US&gl=US) around 2 years before creating this repo, and I was able to reuse a lot of code from that project.

## Generating the grid with Emmet

Hand-coding the HTML for the matrix would be tedious. I used Emmet abbreviations to generate the necessary markup. I've included the abbreviations below so that I can quickly regenerate the grid if I need to make changes to it in the future. Copy and paste them into the `#matrix-container` element then tab expand the abbreviations.

```txt
.matrix-container__row.matrix-container__row--top>.axis-corner+.axis.axis--x[data-axis="I"]>.axis-cell[data-axis-cell="$@0"]*12^.axis-corner

.matrix-container__row.matrix-container__row--middle>.axis.axis--y[data-axis="P"]>.axis-cell[data-axis-cell="$@0"]*12^.matrix-rows#matrix-rows>(.matrix-row[data-matrix-row="$@0"]*12>.matrix-cell[data-matrix-cell-column="$@0"]*12)^.axis.axis--y[data-axis="R"]>.axis-cell[data-axis-cell="$@0"]*12

.matrix-container__row.matrix-container__row--bottom>.axis-corner+.axis.axis--x[data-axis="RI"]>.axis-cell[data-axis-cell="$@0"]*12^.axis-corner
```
