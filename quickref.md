This is imported from [quickref.txt](https://github.com/vim/vim/blob/master/runtime/doc/quickref.txt).

## Left-right motions

|status|tests|key|function|
|---||---|---|
|complete||`Nh`|left (also: CTRL-H, <BS>, or <Left> key)|
|complete||`Nl`|right (also: <Space> or <Right> key)|
|complete||`0`|to first character in the line (also: <Home> key)|
|complete||`^`|to first non-blank character in the line|
|partial||`N$`|to the last character in the line (N-1 lines lower) (also: <End> key)|
|||`g0`|to first character in screen line (differs from "0" when lines wrap)|
|||`g^`|to first non-blank character in screen line (differs from "^" when lines wrap)|
|||`Ng$`|to last character in screen line (differs from "$" when lines wrap)|
|||`gm`|to middle of the screen line|
|||`N|`|to column N (default: 1)|
|complete||`Nf{char}`|to the Nth occurrence of {char} to the right|
|complete||`NF{char}`|to the Nth occurrence of {char} to the left|
|complete||`Nt{char}`|till before the Nth occurrence of {char} to the right|
|complete||`NT{char}`|till before the Nth occurrence of {char} to the left|
|||`N;`|repeat the last "f", "F", "t", or "T" N times|
|||`N,`|repeat the last "f", "F", "t", or "T" N times in opposite direction|

## Up-down motions

|status|tests|key|function|
|---||---|---|
|complete||`Nk`|up N lines (also: CTRL-P and <Up>)|
|complete||`Nj`|down N lines (also: CTRL-J, CTRL-N, <NL>, and <Down>)|
|||`N-`|up N lines, on the first non-blank character|
|||`N+`|down N lines, on the first non-blank character (also: CTRL-M and <CR>)|
|||`N_`|down N-1 lines, on the first non-blank character|
|?||`NG`|goto line N (default: last line), on the first non-blank character|
|?||`Ngg`|goto line N (default: first line), on the first non-blank character|
|||`N%`|goto line N percentage down in the file; N must be given, otherwise it is the |%| command|
|||`Ngk`|up N screen lines (differs from "k" when line wraps)|
|||`Ngj`|down N screen lines (differs from "j" when line wraps)|

## Text object motions

|status|tests|key|function|
|---||---|---|
|complete||`Nw`|N words forward|
|complete||`NW`|N blank-separated |WORD|s forward|
|complete||`Ne`|forward to the end of the Nth word|
|complete||`NE`|forward to the end of the Nth blank-separated |WORD||
|complete||`Nb`|N words backward|
|complete||`NB`|N blank-separated |WORD|s backward|
|||`Nge`|backward to the end of the Nth word|
|||`NgE`|backward to the end of the Nth blank-separated |WORD||
|||`N)`|N sentences forward|
|||`N(`|N sentences backward|
|||`N}`|N paragraphs forward|
|||`N{`|N paragraphs backward|
|||`N]]`|N sections forward, at start of section|
|||`N[[`|N sections backward, at start of section|
|||`N][`|N sections forward, at end of section|
|||`N[]`|N sections backward, at end of section|
|||`N[(`|N times back to unclosed '('|
|||`N[{`|N times back to unclosed '{'|
|||`N[m`|N times back to start of method (for Java)|
|||`N[M`|N times back to end of method (for Java)|
|||`N])`|N times forward to unclosed ')'|
|||`N]}`|N times forward to unclosed '}'|
|||`N]m`|N times forward to start of method (for Java)|
|||`N]M`|N times forward to end of method (for Java)|
|||`N[#`|N times back to unclosed "#if" or "#else"|
|||`N]#`|N times forward to unclosed "#else" or "#endif"|
|||`N[*`|N times back to start of comment "/*"|
|||`N]*`|N times forward to end of comment "*/"|

## Pattern searches

|status|tests|key|function|
|---||---|---|
|||`N/{pattern}[/[offset]]<CR>`|search forward for the Nth occurrence of {pattern}|
|||`N?{pattern}[?[offset]]<CR>`|search backward for the Nth occurrence of {pattern}|
|||`N/<CR>`|repeat last search, in the forward direction|
|||`N?<CR>`|repeat last search, in the backward direction|
|||`Nn`|repeat last search|
|||`NN`|repeat last search, in opposite direction|
|||`N*`|search forward for the identifier under the cursor|
|||`N#`|search backward for the identifier under the cursor|
|||`Ng*`|like "*", but also find partial matches|
|||`Ng#`|like "#", but also find partial matches|
|||`gd`|goto local declaration of identifier under the cursor|
|||`gD`|goto global declaration of identifier under the cursor|

## Marks and motions

|status|tests|key|function|
|---||---|---|
|||`m{a-zA-Z}`|mark current position with mark {a-zA-Z}|
|||``{a-z}`|go to mark {a-z} within current file|
|||``{A-Z}`|go to mark {A-Z} in any file|
|||``{0-9}`|go to the position where Vim was previously exited|
|||``` `` ```|go to the position before the last jump|
|||``` `"```|go to the position when last editing this file|
|||``` `[```|go to the start of the previously operated or put text|
|||``` `]```|go to the end of the previously operated or put text|
|||``` `<```|go to the start of the (previous) Visual area|
|||``` `>```|go to the end of the (previous) Visual area|
|||``` `.```|go to the position of the last change in this file|
|||`'{a-zA-Z0-9[]'"<>.}`| same as ``` `, ```but on the first non-blank in the line|
|||`NCTRL-O`|go to Nth older position in jump list|
|||`NCTRL-I`|go to Nth newer position in jump list|

## Various motions

|status|tests|key|function|
|---||---|---|
|||`%`|find the next brace, bracket, comment, or "#if"/ "#else"/"#endif" in this line and go to its match|
|||`NH`|go to the Nth line in the window, on the first non-blank|
|||`M`|go to the middle line in the window, on the first non-blank|
|||`NL`|go to the Nth line from the bottom, on the first non-blank|
|||`Ngo`|go to Nth byte in the buffer|

## Scrolling

|status|tests|key|function|
|---||---|---|
|||`NCTRL-E`|window N lines downwards (default: 1)|
|||`NCTRL-D`|window N lines Downwards (default: 1/2 window)|
|||`NCTRL-F`|window N pages Forwards (downwards)|
|||`NCTRL-Y`|window N lines upwards (default: 1)|
|||`NCTRL-U`|window N lines Upwards (default: 1/2 window)|
|||`NCTRL-B`|window N pages Backwards (upwards)|
|||`z<CR>`or`zt`|redraw, current line at top of window|
|||`z.`| or zzredraw, current line at center of window|
|||`z-`| or zbredraw, current line at bottom of window|
|||`Nzh`|These only work when 'wrap' is off: scroll screen N characters to the right|
|||`Nzl`|These only work when 'wrap' is off: scroll screen N characters to the left|
|||`NzH`|These only work when 'wrap' is off: scroll screen half a screenwidth to the right|
|||`NzL`|These only work when 'wrap' is off: scroll screen half a screenwidth to the left|

## Inserting text

|status|tests|key|function|
|---||---|---|
|complete except N||`Na`|append text after the cursor (N times)|
|complete except N||`NA`|append text at the end of the line (N times)|
|complete except N||`Ni`|insert text before the cursor (N times) (also: <Insert>)|
|complete except N||`NI`|insert text before the first non-blank in the line (N times)|
|||`NgI`|insert text in column 1 (N times)|
|complete except N||`No`|open a new line below the current line, append text (N times)|
|complete except N||`NO`|open a new line above the current line, append text (N times)|
|||in Visual block mode: `I`|insert the same text in front of all the selected lines|
|||in Visual block mode: `A`|append the same text after all the selected lines|

## Deleting text

|status|tests|key|function|
|---||---|---|
|complete||`Nx`|delete N characters under and after the cursor|
|||`N<Del>`|delete N characters under and after the cursor|
|||`NX`|delete N characters before the cursor|
|complete||`Nd{motion}`|delete the text that is moved over with {motion}|
|complete||`{visual}d`|delete the highlighted text|
|complete||`Ndd`|delete N lines|
|complete||`ND`|delete to the end of the line (and N-1 more lines)|
|||`NJ`|join N-1 lines (delete <EOL>s)|
|||`{visual}J`|join the highlighted lines|
|||`NgJ`|like "J", but without inserting spaces|
|||`{visual}gJ`|like "{visual}J", but without inserting spaces|

## Copying and moving text

|status|tests|key|function|
|---||---|---|
|||`"{char}`|use register {char} for the next delete, yank, or put|
|complete||`Ny{motion}`|yank the text moved over with {motion} into a register|
|complete||`{visual}y`|yank the highlighted text into a register|
|complete||`Nyy`|yank N lines into a register|
|complete||`NY`|yank N lines into a register|
|complete||`Np`|put a register after the cursor position (N times)|
|complete||`NP`|put a register before the cursor position (N times)|
|||`N]p`|like p, but adjust indent to current line|
|||`N[p`|like P, but adjust indent to current line|
|||`Ngp`|like p, but leave cursor after the new text|
|||`NgP`|like P, but leave cursor after the new text|

## Changing text

|status|tests|key|function|
|---||---|---|
|||`Nr{char}`|replace N characters with {char}|
|||`Ngr{char}`|replace N characters without affecting layout|
|||`NR`|enter Replace mode (repeat the entered text N times)|
|||`NgR`|enter virtual Replace mode: Like Replace mode but without affecting layout|
|||`{visual}r{char}`|in Visual block mode: Replace each char of the selected text with {char}|
|||`Nc{motion}`|change the text that is moved over with {motion}|
|||`{visual}c`|change the highlighted text|
|||`Ncc`|change N lines|
|||`NS`|change N lines|
|||`NC`|change to the end of the line (and N-1 more lines)|
|||`Ns`|change N characters|
|||`{visual}c`|in Visual block mode: Change each of the selected lines with the entered text|
|||`{visual}C`|in Visual block mode: Change each of the selected lines until end-of-line with the entered text|
|||`N  ~`|switch case for N characters and advance cursor|
|||`{visual}~`|switch case for highlighted text|
|||`{visual}u`|make highlighted text lowercase|
|||`{visual}U`|make highlighted text uppercase|
|||`g~{motion}`|switch case for the text that is moved over with {motion}|
|||`gu{motion}`|make the text that is moved over with {motion} lowercase|
|||`gU{motion}`|make the text that is moved over with {motion} uppercase|
|||`{visual}g?`|perform rot13 encoding on highlighted text|
|||`g?{motion}`|perform rot13 encoding on the text that is moved over with {motion}|
|||`NCTRL-A`|add N to the number at or after the cursor|
|||`NCTRL-X`|subtract N from the number at or after the cursor|
|||`N<{motion}`|move the lines that are moved over with {motion} one shiftwidth left|
|||`N<<`|move N lines one shiftwidth left|
|||`N>{motion}`|move the lines that are moved over with {motion} one shiftwidth right|
|||`N>>`|move N lines one shiftwidth right|
|||`Ngq{motion}`|format the lines that are moved over with {motion} to 'textwidth' length|

## Complex changes

|status|tests|key|function|
|---||---|---|
|||`N!{motion}{command}<CR>`|filter the lines that are moved over through {command}|
|||`N!!{command}<CR>`|filter N lines through {command}|
|||`{visual}!{command}<CR>`|filter the highlighted lines through {command}|
|||`N={motion}`|filter the lines that are moved over through 'equalprg'|
|||`N==`|filter N lines through 'equalprg'|
|||`{visual}=`|filter the highlighted lines through 'equalprg'|

## Visual mode

list of Visual mode commands.

|status|tests|key|function|
|---||---|---|
|||`v`|start highlighting characters  }  move cursor and use|
|||`V`|start highlighting linewise    }  operator to affect|
|||`CTRL-V`|start highlighting blockwise   }  highlighted text|
|||`o`|exchange cursor position with start of highlighting|
|||`gv`|start highlighting on previous visual area|
|||`v`|highlight characters or stop highlighting|
|||`V`|highlight linewise or stop highlighting|
|||`CTRL-V`|highlight blockwise or stop highlighting|

## Text objects (only in Visual mode or after an operator)

|status|tests|key|function|
|---||---|---|
|||`Naw`|Select "a word"|
|||`Niw`|Select "inner word"|
|||`NaW`|Select "a |WORD|"|
|||`NiW`|Select "inner |WORD|"|
|||`Nas`|Select "a sentence"|
|||`Nis`|Select "inner sentence"|
|||`Nap`|Select "a paragraph"|
|||`Nip`|Select "inner paragraph"|
|||`Nab`|Select "a block" (from "[(" to "])")|
|||`Nib`|Select "inner block" (from "[(" to "])")|
|||`NaB`|Select "a Block" (from "[{" to "]}")|
|||`NiB`|Select "inner Block" (from "[{" to "]}")|
|||`Na>`|Select "a <> block"|
|||`Ni>`|Select "inner <> block"|
|||`Nat`|Select "a tag block" (from <aaa> to </aaa>)|
|||`Nit`|Select "inner tag block" (from <aaa> to </aaa>)|
|||`Na'`|Select "a single quoted string"|
|||`Ni'`|Select "inner single quoted string"|
|||`Na"`|Select "a double quoted string"|
|||`Ni"`|Select "inner double quoted string"|
|||```Na` ```|Select "a backward quoted string"|
|||```Ni` ```|Select "inner backward quoted string"|

## Repeating commands

|status|tests|key|function|
|---||---|---|
|partial||`N.`|repeat last change (with count replaced with N)|
|||`q{a-z}`|record typed characters into register {a-z}|
|||`q{A-Z}`|record typed characters, appended to register {a-z}|
|||`q`|stop recording|
|||`N@{a-z}`|execute the contents of register {a-z} (N times)|
|||`N@@`|   repeat previous @{a-z} (N times)|
|||`Ngs`|goto Sleep for N seconds|
