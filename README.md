vim style key-binding for VSCode

## Require

* VSCode 0.10.1
* typescrpt ```npm install -g typescript```

## install

### windows

```
git clone https://github.com/74th/vscode-vim.git %USERPROFILE%\.vscode\extensions\vscode-vim
cd %USERPROFILE%\.vscode\extensions\vscode-vim
tsc
```
### Mac,Linux

```
git clone https://github.com/74th/vscode-vim.git $HOME/.vscode/extensions/vscode-vim
cd $HOME/.vscode/extensions/vscode-vim
tsc
``` 

## support

* h j k l 0 $ Nh Nj Nk Nl t f T F
* i a s o x I A S O X Nx NX
* d y c dd yy cc Ndd Nyy Ncc D C p P

## never support

* : (you should get use to command palette)
* / ? (you shoud use default search function)
* Ctrl-x Cmd-x Alt-x Meta-x

## future suppprt

* w b
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

キーバインドの不具合が見つかっています。tX、fXのアクションや、Insertモード中に入力できない文字があります。
Ctrl-Spaceのサジェスチョン表示中はVimStyleでは制御しないようにしているため、その表示中に入力してください。