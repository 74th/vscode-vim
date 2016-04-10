vim emulator for VSCode

![vimanimetion](https://raw.githubusercontent.com/74th/vscode-vim/master/tutorial/tutorial1.gif)

* https://github.com/74th/vscode-vim
* https://marketplace.visualstudio.com/items/74th.vimStyle

[![Build Status](https://travis-ci.org/74th/vscode-vim.svg?branch=master)](https://travis-ci.org/74th/vscode-vim)

## Require

* v0.3 : Visual Studio Code 0.10.12 ( [available in Insiders build](https://code.visualstudio.com/insiders) )
* v~0.2(released) : Visual Studio Code 0.10.1

## install

```
ext install vimStyle
```

If you want to use latest version, you can use [VSCode insiders build](https://code.visualstudio.com/insiders) and exec following commands.

```
git clone https://github.com/74th/vscode-vim.git ~/.vscode-insiders/extensions/vscode-vim
cd ~/.vscode-insiders/extensions/vscode-vim
npm install
npm run-script build
```

## feature

* pure TypeScript vim engine
* [have tests comparing with original vim](https://github.com/74th/vscode-vim/tree/master/test/vim)
* support complex command
* support visual mode

![vimanimetion](https://raw.githubusercontent.com/74th/vscode-vim/master/tutorial/tutorial2.gif)

* support repeat command

![vimanimetion](https://raw.githubusercontent.com/74th/vscode-vim/master/tutorial/tutorial3.gif)

## support

* h j k l 0 $ w W b B e E tx fx Tx Fx gg G
* Nh Nj Nk Nl Nw NW Nb NB Ne NE Ntx Nfx NTx NFx NG
* i a s o x I A S O X
* Nx
* d y c dd yy cc D C p P
* Ndd Nyy Ncc
* v V
* .

## settings

If you needs optional settings, please copy belong json and paste to your `settings.json`.

```
// Show mode in status bar (default: true)
"vimStyle.showMode": false,
// motion with jkl;(default: false)
"vimStyle.useErgonomicKeyForMotion": true,
```

## never support

* : (you should get use to command palette)
* / ? (you shoud use default search function)
* Ctrl-x Cmd-x Alt-x Meta-x
* `vimrc`(all settings available in `settings.json`)
* q @ (can't use with IntelliSence)

A goal of this extension is not to improve vim emulation.

This extension is to become more friendly with vscode and vim-keybinding!

## future suppprt

* r
* ; ,
* J
* { }
* "xd "xy "xc "xp
* ~
* % [ ]
* + -
* additional key-binding from settings.json
* ...

## low priority

* = (`>Format Code`)
* > <(can use `Tab` and  `Shift-Tab`)
* *
* m `
* ...

## License

MIT License

## update

### 0.3.0

* update for vscode 0.10.12
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

release!
