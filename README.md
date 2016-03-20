vim style key-binding for VSCode

* https://github.com/74th/vscode-vim
* https://marketplace.visualstudio.com/items/74th.vimStyle

[![Build Status](https://travis-ci.org/74th/vscode-vim.svg?branch=master)](https://travis-ci.org/74th/vscode-vim)

## Require

* v0.3 : Visual Studio Code 0.10.11

## install

```
ext install vimStyle
```

## support

* h j k l 0 $ w W b B e E tx fx Tx Fx gg G
* Nh Nj Nk Nl Nw NW Nb NB Ne NE Ntx Nfx NTx NFx NG
* i a s o x I A S O X
* Nx
* d y c dd yy cc D C p P 
* Ndd Nyy Ncc
* v

## settings

If you needs optional settings, please copy belong json and paste to your `settings.json`.

```
// Show mode in status bar (default: false)
"vimStyle.showMode": true,
// Windows JIS Keyboard(default: false)
"vimStyle.useWinJisKeyboard": true,
// Mac JIS Keyboard(default: false)
"vimStyle.useMacJisKeyboard": true,
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
* V
* { }
* "xd "xy "xc "xp
* ~
* % [ ]
* + -
* additional key-binding from settings.json
* ...

## low priority

* . (can't do with IntelliSence)
* = (`>Format Code`)
* > <(can use `Tab` and  `Shift-Tab`)
* *
* m `
* ...

## JISキーボードユーザへ

VSCodeのキーバインドの不具合が見つかっています。tX、fXのアクションできない文字があります。
Windowsの場合は、`settings.json`に`vimStyle.useWinJisKeyboard:true`を設定してください。
Macの場合は、`settings.json`に`vimStyle.useMacJisKeyboard:true`を設定してください。ただし、Macの場合完全には動作しません。

## License

MIT License

## update

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
