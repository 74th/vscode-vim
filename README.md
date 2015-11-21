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

* i,a,I,A
* h,j,k,l,0,$,Nh,Nj,Nk,Nl

## never support

* : (you should get use to command palette)
* /,? (you shoud use default search function)
* Ctrl-x,Cmd-x,Alt-x,Meta-x

## future suppprt

* x,d,y,c,p
* dd,yy,pp,
* "xd,"xy,"xc,"xp
* f,t,;,,
* w,b
* g
* ~
* >,<
* %,[,]
* +,-
* ...

## low priority

* .
* =
* *
* m,`
* q,@
* v
* ...