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

* i a I A x Nx
* dd Ndd p P
* h j k l 0 $ Nh Nj Nk Nl

## never support

* : (you should get use to command palette)
* / ? (you shoud use default search function)
* Ctrl-x Cmd-x Alt-x Meta-x

## future suppprt

* y c p
* f t ; ,
* w b
* o O
* dd yy cc
* "xd "xy "xc "xp
* g
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