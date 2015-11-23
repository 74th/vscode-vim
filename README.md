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

## support

* h j k l 0 $ w b tx fx Tx Fx
* i a s o x I A S O X
* d y c dd yy cc Ndd Nyy Ncc D C p P

## never support

* : (you should get use to command palette)
* / ? (you shoud use default search function)
* Ctrl-x Cmd-x Alt-x Meta-x

## future suppprt

* g G
* ; ,
* J
* "xd "xy "xc "xp
* ~
* > <
* % [ ]
* + -
* ...

## low priority

* .
* =
* *
* m `
* q @
* v
* ...

## JISキーボードユーザへ

VSCodeのキーバインドの不具合が見つかっています。tX、fXのアクションや、Insertモード中に入力できない文字があります。
その場合、Ctrl-Spaceのサジェスチョン表示し、その時に入力してください。サジェスチョン表示中はVimStyleでは制御しないようにしています。

## License

MIT License