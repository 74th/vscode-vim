vim emulator for VSCode

![vimanimetion](https://raw.githubusercontent.com/74th/vscode-vim/master/tutorial/tutorial1.gif)

* GitHub https://github.com/74th/vscode-vim
* Visual Studio Marketplace https://marketplace.visualstudio.com/items/74th.vimStyle

[![Build Status](https://travis-ci.org/74th/vscode-vim.svg?branch=master)](https://travis-ci.org/74th/vscode-vim)
[![Version](http://vsmarketplacebadge.apphb.com/version/74th.vimStyle.svg)](https://marketplace.visualstudio.com/items?itemName=74th.vimStyle)
[![Installs](http://vsmarketplacebadge.apphb.com/installs/74th.vimStyle.svg)](https://marketplace.visualstudio.com/items?itemName=74th.vimStyle)
[![Rating](https://vsmarketplacebadge.apphb.com/rating/74th.vimStyle.svg)](https://marketplace.visualstudio.com/items/74th.vimStyle)

## Require

* v0.3 : Visual Studio Code 1.0.0

## feature

* pure TypeScript vim engine
* [have tests comparing with original vim](https://github.com/74th/vscode-vim/tree/master/test/vim)
* support complex command
* support visual mode

![vimanimetion](https://raw.githubusercontent.com/74th/vscode-vim/master/tutorial/tutorial2.gif)

* support repeat command

![vimanimetion](https://raw.githubusercontent.com/74th/vscode-vim/master/tutorial/tutorial3.gif)

## install

```
ext install vimStyle
```

## support vim commands

* h j k l 0 $ ^ w W b B e E { } [{ ]} tx fx Tx Fx ; , gg G
* Nh Nj Nk Nl Nw NW Nb NB Ne NE N{ N} N[{ N]} Ntx Nfx NTx NFx N; N, NG
* i a s o x r I A S O X gr
* Nx Nr Ngr
* d y c dd yy cc D C p P d$ y$ c$ ...
* Ndd Nyy Ncc
* v V v..d v..c v..r
* .

* [quickref function list is here.](https://github.com/74th/vscode-vim/blob/master/quickref.md)
* If you need Ctrl-D and Ctrl-U for scrolling, you can use [additional scroll key entention](https://marketplace.visualstudio.com/items?itemName=74th.scrollkey).

## support to call VSCode commands from vim keybind

* u : / n N &gt; &lt; %

But they do not behave exactly as vim command, and their supports may be changed.

## settings

If you needs optional settings, please copy belong json and paste to your `settings.json`.

```
// Show mode in status bar (default: true)
"vimStyle.showMode": false,
// changing cursor by mode (default: true)
"vimStyle.changeCursorStyle": false,
// motion with jkl;(default: false)
"vimStyle.useErgonomicKeyForMotion": true,
// default mode (default: "normal")
"vimStyle.defaultMode": "insert",
// disable without to uninstall (default: "true")
"vimStyle.enabled": "false",
// keys go to normal mode from insert mode (default: "" disable)
"vimStyle.imapEsc": "jj",
// some vimrc like settings
"vimStyle.vimrc": [
	"nmap Y y$", //
	"nnoremapmap Y y$", //
]
```

If you would like to use `ctrl+[` instead of `escape`, please add blong setting to your `keybindings.json`.

```
{
	"key": "ctrl+[",
	"command": "vim.Esc",
	"when": "editorTextFocus"
}
```

If you would like more vim flavor, you can use `vim.inNormalMode`, `vim.inInsertMode` and `vim.inVisualMode` to your keyboard shortcuts. For example,

```
// in insert mode
{
	// Ctrl-h : BackSpace
	"key": "ctrl+h", "command": "deleteLeft",
	"when": "editorTextFocus && vim.inInsertMode"
},
{
	// Ctrl-w : delete word
	"key": "ctrl+w", "command": "deleteWordLeft",
	"when": "editorTextFocus && vim.inInsertMode"
},
// in visual mode
{
	// arrow up
	"key": "up", "command": "vim.type-k",
	"when": "editorTextFocus && vim.inVisualMode"
},
{
	// arrow down
	"key": "down", "command": "vim.type-j",
	"when": "editorTextFocus && vim.inVisualMode"
},
{
	// arrow right
	"key": "down", "command": "vim.type-l",
	"when": "editorTextFocus && vim.inVisualMode"
},
{
	// arrow left
	"key": "down", "command": "vim.type-h",
	"when": "editorTextFocus && vim.inVisualMode"
},
```

## support vimrc settings

* `nmap Y y$`
* `nnoremap Y y$`

## never support

* Ctrl-x Cmd-x Alt-x Meta-x

## VimStyle Loadmap

the vim emulator written type script

* [x] basic vim keybinds
* [x] fix word motion bugs
* [x] user keybindings ( nmap )
* [ ] user keybindings ( call vscode function )
* [ ] text object ( diw, di{ ... )
* [ ] resister
* [ ] vim style plugin for chrome browser
* [ ] complete quickref list

## License

MIT License

## contribute

[function list](https://github.com/74th/vscode-vim/blob/master/quickref.md)

```
git clone https://github.com/74th/vscode-vim.git ~/.vscode/extensions/vscode-vim
cd ~/.vscode/extensions/vscode-vim
npm install
npm run-script build
```

## update

### 0.4.6

revert 0.4.2

### 0.4.2

* support `[(`,`[{`,`])`,`]}`

### 0.4.1

* support `{`,`}`

### 0.4.0

* support nmap nnoremap (use like vimrc setting)

### 0.3.13

* support vim mode contexts for keyboard shortcuts #45
* fix word motion bugs #38

### 0.3.12

* support imap ESC keybinding
* support enable setting

### 0.3.11

* [fix #38](https://github.com/74th/vscode-vim/issues/38)
* [fix #39](https://github.com/74th/vscode-vim/issues/39)

### 0.3.10

* [default mode stting #34](https://github.com/74th/vscode-vim/issues/34)
* [fix word motion bug](https://github.com/74th/vscode-vim/issues/35)

### 0.3.9

* support ; ,
* [fix #38](https://github.com/74th/vscode-vim/issues/38)
* [support #31](https://github.com/74th/vscode-vim/issues/31)
* [test to fix #32](https://github.com/74th/vscode-vim/issues/32)

### 0.3.6

* support r gr v..r
* fix visual mode move bug

### 0.3.5

* support VSCode commands from vim keybindings %
* fix some bug

### 0.3.4

* support VSCode commands from vim keybindings : / n N &gt; &lt;

### 0.3.3

* support ^
* change icon

![icon](https://raw.githubusercontent.com/74th/vscode-vim/master/vim.png)

### 0.3.2

* update for vscode 1.0.0
* support repeat command
* support visual line mode
* support tab size

### 0.2.4

* support W B e E

### 0.2.3

* support `useErgonomicKeyForMotion` option : move a cursur by `jkl;`
* support visual mode

### 0.2.2

* fix #21 CR+LF bug

### 0.2.1

* update README

### 0.2.0

* more friendly with VSCode functions
* show block sursor
* bug fix : dfx dFx dtx dTx
* append indents by o O

### 0.1.8

* JISキーボード向けオプション(support Win and Mac Jis keyboard option)
* show suggestion by only alpabet and .
* fix some bugs

### 0.1.7

* gg G

### 0.1.1

pre release!
