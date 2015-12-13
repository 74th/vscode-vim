vim style key-binding for VSCode

* https://github.com/74th/vscode-vim
* https://marketplace.visualstudio.com/items/74th.vimStyle

VSCode key-binding system has some issue. This plugin does not work compltely.

## Require

* VSCode 0.10.1

## install

```
ext install vimStyle
```

### latest version

```
npm install -g typescript
cd ~/.vscode/extensions/
git clone https://github.com/74th/vscode-vim.git
cd vscode-vim
tsc
```

## support

* h j k l 0 $ w b tx fx Tx Fx gg G
* i a s o x I A S O X
* d y c dd yy cc Ndd Nyy Ncc D C p P

## never support

* : (you should get use to command palette)
* / ? (you shoud use default search function)
* Ctrl-x Cmd-x Alt-x Meta-x
* `vimrc`(all settings available in `settings.json`)

A goal of this extension is not to improve vim emulation.

This extension is to become more friendly with vscode and vim-keybinding!

## future suppprt

* ; ,
* J
* { }
* "xd "xy "xc "xp
* v
* ~
* > <
* % [ ]
* + -
* additional key-binding from settings.config
* ...

## low priority

* . (can't do with IntelliSence)
* = (`>Format Code`)
* *
* m `
* q @ (can't do with IntelliSence)
* ...

## JISキーボードユーザへ

VSCodeのキーバインドの不具合が見つかっています。tX、fXのアクションや、Insertモード中に入力できない文字があります。
Windowsの場合は、`settings.json`に`vimStyle.useWinJisKeyboard:true`を設定してください。
Macの場合は、`settings.json`に`vimStyle.useMacJisKeyboard:true`を設定してください。ただし、Macの場合完全には動作しません。

## License

MIT License

## update

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