This is imported from [quickref.txt](https://github.com/vim/vim/blob/master/runtime/doc/quickref.txt).

## Left-right motions

|VimStyle class|key|function|
|---|---|---|---|
|RightMotion|`Nh`|left (also: CTRL-H, &lt;BS&gt;, or &lt;Left&gt; key)|
|RightMotion|`Nl`|right (also: &lt;Space&gt; or &lt;Right&gt; key)|
|FirstCharacterInLineMotion|`0`|to first character in the line (also: &lt;Home&gt; key)|
|FirstCharactorMotion|`^`|to first non-blank character in the line|
|LastCharacterInLineMotion(partial)|`N$`|to the last character in the line (N-1 lines lower) (also: &lt;End&gt; key)|
||`g0`|to first character in screen line (differs from "0" when lines wrap)|
||`g^`|to first non-blank character in screen line (differs from "^" when lines wrap)|
||`Ng$`|to last character in screen line (differs from "$" when lines wrap)|
||`gm`|to middle of the screen line|
||`N|`|to column N (default: 1)|
|FindCharacterMotion|`Nf{char}`|to the Nth occurrence of {char} to the right|
|FindCharacterMotion|`NF{char}`|to the Nth occurrence of {char} to the left|
|FindCharacterMotion|`Nt{char}`|till before the Nth occurrence of {char} to the right|
|FindCharacterMotion|`NT{char}`|till before the Nth occurrence of {char} to the left|
|FindCharacterMotion|`N;`|repeat the last "f", "F", "t", or "T" N times|
|FindCharacterMotion|`N,`|repeat the last "f", "F", "t", or "T" N times in opposite direction|

## Up-down motions

|VimStyle class|key|function|
|---|---|---|---|
|DownMotion|`Nk`|up N lines (also: CTRL-P and &lt;Up&gt;)|
|DownMotion|`Nj`|down N lines (also: CTRL-J, CTRL-N, &lt;NL&gt;, and &lt;Down&gt;)|
||`N-`|up N lines, on the first non-blank character|
||`N+`|down N lines, on the first non-blank character (also: CTRL-M and &lt;CR&gt;)|
||`N_`|down N-1 lines, on the first non-blank character|
|FirstCharacterMotion|`NG`|goto line N (default: last line), on the first non-blank character|
|FirstCharacterMotion|`Ngg`|goto line N (default: first line), on the first non-blank character|
||`N%`|goto line N percentage down in the file; N must be given, otherwise it is the &#124;%&#124; command|
||`Ngk`|up N screen lines (differs from "k" when line wraps)|
||`Ngj`|down N screen lines (differs from "j" when line wraps)|

## Text object motions

|VimStyle class|key|function|
|---|---|---|
|WordMotion|`Nw`|N words forward|
|WordMotion|`NW`|N blank-separated |WORD|s forward|
|WordMotion|`Ne`|forward to the end of the Nth word|
|WordMotion|`NE`|forward to the end of the Nth blank-separated |WORD||
|WordMotion|`Nb`|N words backward|
|WordMotion|`NB`|N blank-separated |WORD|s backward|
||`Nge`|backward to the end of the Nth word|
||`NgE`|backward to the end of the Nth blank-separated |WORD||
||`N)`|N sentences forward|
||`N(`|N sentences backward|
|ParagraphMotion|`N}`|N paragraphs forward|
|ParagraphMotion|`N{`|N paragraphs backward|
||`N]]`|N sections forward, at start of section|
||`N[[`|N sections backward, at start of section|
||`N][`|N sections forward, at end of section|
||`N[]`|N sections backward, at end of section|
|BrancketMotion|`N[(`|N times back to unclosed '('|
|BrancketMotion|`N[{`|N times back to unclosed '{'|
||`N[m`|N times back to start of method (for Java)|
||`N[M`|N times back to end of method (for Java)|
|BrancketMotion|`N])`|N times forward to unclosed ')'|
|BrancketMotion|`N]}`|N times forward to unclosed '}'|
||`N]m`|N times forward to start of method (for Java)|
||`N]M`|N times forward to end of method (for Java)|
||`N[#`|N times back to unclosed "#if" or "#else"|
||`N]#`|N times forward to unclosed "#else" or "#endif"|
||`N[*`|N times back to start of comment "/*"|
||`N]*`|N times forward to end of comment "*/"|

## Pattern searches

|VimStyle class|key|function|
|---|---|---|
||`N/{pattern}[/[offset]]&lt;CR&gt;`|search forward for the Nth occurrence of {pattern}|
||`N?{pattern}[?[offset]]&lt;CR&gt;`|search backward for the Nth occurrence of {pattern}|
||`N/&lt;CR&gt;`|repeat last search, in the forward direction|
||`N?&lt;CR&gt;`|repeat last search, in the backward direction|
|VSCode next match find|`Nn`|repeat last search|
|VSCode prefious match find|`NN`|repeat last search, in opposite direction|
||`N*`|search forward for the identifier under the cursor|
||`N#`|search backward for the identifier under the cursor|
||`Ng*`|like "*", but also find partial matches|
||`Ng#`|like "#", but also find partial matches|
||`gd`|goto local declaration of identifier under the cursor|
||`gD`|goto global declaration of identifier under the cursor|

## Marks and motions

|VimStyle class|key|function|
|---|---|---|
||`m{a-zA-Z}`|mark current position with mark {a-zA-Z}|
||``{a-z}`|go to mark {a-z} within current file|
||``{A-Z}`|go to mark {A-Z} in any file|
||``{0-9}`|go to the position where Vim was previously exited|
||``` `` ```|go to the position before the last jump|
||``` `"```|go to the position when last editing this file|
||``` `[```|go to the start of the previously operated or put text|
||``` `]```|go to the end of the previously operated or put text|
||``` `&lt;```|go to the start of the (previous) Visual area|
||``` `&gt;```|go to the end of the (previous) Visual area|
||``` `.```|go to the position of the last change in this file|
||`'{a-zA-Z0-9[]'"&lt;&gt;.}`| same as ``` `, ```but on the first non-blank in the line|
||`NCTRL-O`|go to Nth older position in jump list|
||`NCTRL-I`|go to Nth newer position in jump list|

## Various motions

|VimStyle class|key|function|
|---|---|---|
||`%`|find the next brace, bracket, comment, or "#if"/ "#else"/"#endif" in this line and go to its match|
||`NH`|go to the Nth line in the window, on the first non-blank|
||`M`|go to the middle line in the window, on the first non-blank|
||`NL`|go to the Nth line from the bottom, on the first non-blank|
||`Ngo`|go to Nth byte in the buffer|

## Scrolling

|VimStyle class|key|function|
|---|---|---|
||`NCTRL-E`|window N lines downwards (default: 1)|
||`NCTRL-D`|window N lines Downwards (default: 1/2 window)|
||`NCTRL-F`|window N pages Forwards (downwards)|
||`NCTRL-Y`|window N lines upwards (default: 1)|
||`NCTRL-U`|window N lines Upwards (default: 1/2 window)|
||`NCTRL-B`|window N pages Backwards (upwards)|
||`z&lt;CR&gt;`or`zt`|redraw, current line at top of window|
||`z.`| or zzredraw, current line at center of window|
||`z-`| or zbredraw, current line at bottom of window|
||`Nzh`|These only work when 'wrap' is off: scroll screen N characters to the right|
||`Nzl`|These only work when 'wrap' is off: scroll screen N characters to the left|
||`NzH`|These only work when 'wrap' is off: scroll screen half a screenwidth to the right|
||`NzL`|These only work when 'wrap' is off: scroll screen half a screenwidth to the left|

## Inserting text

|VimStyle class|key|function|
|---|---|---|
|InsertTextAction(except N)|`Na`|append text after the cursor (N times)|
|InsertTextAction(except N)|`NA`|append text at the end of the line (N times)|
|InsertTextAction(except N)|`Ni`|insert text before the cursor (N times) (also: &lt;Insert&gt;)|
|InsertTextAction(except N)|`NI`|insert text before the first non-blank in the line (N times)|
||`NgI`|insert text in column 1 (N times)|
|OpenNewLineAndAppendTextAction(except N)|`No`|open a new line below the current line, append text (N times)|
|OpenNewLineAndAppendTextAction(except N)|`NO`|open a new line above the current line, append text (N times)|
||in Visual block mode: `I`|insert the same text in front of all the selected lines|
||in Visual block mode: `A`|append the same text after all the selected lines|

## Deleting text

|VimStyle class|key|function|
|---|---|---|
|DeleteYankChangeAction|`Nx`|delete N characters under and after the cursor|
||`N&lt;Del&gt;`|delete N characters under and after the cursor|
|DeleteYankChangeAction|`NX`|delete N characters before the cursor|
|DeleteYankChangeAction|`Nd{motion}`|delete the text that is moved over with {motion}|
|DeleteYankChangeHighlightedTextAction,<br />DeleteYankChangeHighlightedLineAction|`{visual}d`|delete the highlighted text|
|DeleteYankChangeAction|`Ndd`|delete N lines|
|DeleteYankChangeAction|`ND`|delete to the end of the line (and N-1 more lines)|
||`NJ`|join N-1 lines (delete &lt;EOL&gt;s)|
||`{visual}J`|join the highlighted lines|
||`NgJ`|like "J", but without inserting spaces|
||`{visual}gJ`|like "{visual}J", but without inserting spaces|

## Copying and moving text

|VimStyle class|key|function|
|---|---|---|
||`"{char}`|use register {char} for the next delete, yank, or put|
|DeleteYankChangeAction|`Ny{motion}`|yank the text moved over with {motion} into a register|
||`{visual}y`|yank the highlighted text into a register|
|DeleteYankChangeAction|`Nyy`|yank N lines into a register|
|DeleteYankChangeAction|`NY`|yank N lines into a register|
|PutRegisterAction|`Np`|put a register after the cursor position (N times)|
|PutRegisterAction|`NP`|put a register before the cursor position (N times)|
||`N]p`|like p, but adjust indent to current line|
||`N[p`|like P, but adjust indent to current line|
||`Ngp`|like p, but leave cursor after the new text|
||`NgP`|like P, but leave cursor after the new text|

## Changing text

|VimStyle class|key|function|
|---|---|---|
||`Nr{char}`|replace N characters with {char}|
||`Ngr{char}`|replace N characters without affecting layout|
||`NR`|enter Replace mode (repeat the entered text N times)|
||`NgR`|enter virtual Replace mode: Like Replace mode but without affecting layout|
||`{visual}r{char}`|in Visual block mode: Replace each char of the selected text with {char}|
|DeleteYankChangeAction|`Nc{motion}`|change the text that is moved over with {motion}|
|DeleteYankChangeAction|`{visual}c`|change the highlighted text|
|DeleteYankChangeAction|`Ncc`|change N lines|
|DeleteYankChangeAction|`NS`|change N lines|
|DeleteYankChangeAction|`NC`|change to the end of the line (and N-1 more lines)|
|DeleteYankChangeAction|`Ns`|change N characters|
|DeleteYankChangeAction|`{visual}c`|in Visual block mode: Change each of the selected lines with the entered text|
|DeleteYankChangeAction|`{visual}C`|in Visual block mode: Change each of the selected lines until end-of-line with the entered text|
||`N  ~`|switch case for N characters and advance cursor|
||`{visual}~`|switch case for highlighted text|
||`{visual}u`|make highlighted text lowercase|
||`{visual}U`|make highlighted text uppercase|
||`g~{motion}`|switch case for the text that is moved over with {motion}|
||`gu{motion}`|make the text that is moved over with {motion} lowercase|
||`gU{motion}`|make the text that is moved over with {motion} uppercase|
||`{visual}g?`|perform rot13 encoding on highlighted text|
||`g?{motion}`|perform rot13 encoding on the text that is moved over with {motion}|
||`NCTRL-A`|add N to the number at or after the cursor|
||`NCTRL-X`|subtract N from the number at or after the cursor|
||`N&lt;{motion}`|move the lines that are moved over with {motion} one shiftwidth left|
|vscode indent|`N&lt;&lt;`|move N lines one shiftwidth left|
||`N&gt;{motion}`|move the lines that are moved over with {motion} one shiftwidth right|
|vscode outdent|`N&gt;&gt;`|move N lines one shiftwidth right|
||`Ngq{motion}`|format the lines that are moved over with {motion} to 'textwidth' length|

## Complex changes

|VimStyle class|key|function|
|---|---|---|
||`N!{motion}{command}&lt;CR&gt;`|filter the lines that are moved over through {command}|
||`N!!{command}&lt;CR&gt;`|filter N lines through {command}|
||`{visual}!{command}&lt;CR&gt;`|filter the highlighted lines through {command}|
||`N={motion}`|filter the lines that are moved over through 'equalprg'|
||`N==`|filter N lines through 'equalprg'|
||`{visual}=`|filter the highlighted lines through 'equalprg'|

## Visual mode

list of Visual mode commands.

|VimStyle class|key|function|
|---|---|---|
|StartVisualModeAction|`v`|start highlighting characters  }  move cursor and use|
|StartVisualLineModeAction|`V`|start highlighting linewise    }  operator to affect|
||`CTRL-V`|start highlighting blockwise   }  highlighted text|
||`o`|exchange cursor position with start of highlighting|
||`gv`|start highlighting on previous visual area|
||`v`|highlight characters or stop highlighting|
||`V`|highlight linewise or stop highlighting|
||`CTRL-V`|highlight blockwise or stop highlighting|

## Text objects (only in Visual mode or after an operator)

|VimStyle class|key|function|
|---|---|---|
||`Naw`|Select "a word"|
||`Niw`|Select "inner word"|
||`NaW`|Select "a |WORD|"|
||`NiW`|Select "inner |WORD|"|
||`Nas`|Select "a sentence"|
||`Nis`|Select "inner sentence"|
||`Nap`|Select "a paragraph"|
||`Nip`|Select "inner paragraph"|
||`Nab`|Select "a block" (from "[(" to "])")|
||`Nib`|Select "inner block" (from "[(" to "])")|
||`NaB`|Select "a Block" (from "[{" to "]}")|
||`NiB`|Select "inner Block" (from "[{" to "]}")|
||`Na&gt;`|Select "a &lt;&gt; block"|
||`Ni&gt;`|Select "inner &lt;&gt; block"|
||`Nat`|Select "a tag block" (from &lt;aaa&gt; to &lt;/aaa&gt;)|
||`Nit`|Select "inner tag block" (from &lt;aaa&gt; to &lt;/aaa&gt;)|
||`Na'`|Select "a single quoted string"|
||`Ni'`|Select "inner single quoted string"|
||`Na"`|Select "a double quoted string"|
||`Ni"`|Select "inner double quoted string"|
||```Na` ```|Select "a backward quoted string"|
||```Ni` ```|Select "inner backward quoted string"|

## Repeating commands

|VimStyle class|key|function|
|---|---|---|
|RepeatLastChangeAction(implemented except N)|`N.`|repeat last change (with count replaced with N)|
||`q{a-z}`|record typed characters into register {a-z}|
||`q{A-Z}`|record typed characters, appended to register {a-z}|
||`q`|stop recording|
||`N@{a-z}`|execute the contents of register {a-z} (N times)|
||`N@@`|   repeat previous @{a-z} (N times)|
||`Ngs`|goto Sleep for N seconds|
