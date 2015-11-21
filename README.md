vim style key-binding for VSCode

## Require

* VSCode 0.10.1
* typescrpt ```npm install -g typescript```
* and OpenVim https://github.com/mattn/vscode-openvim

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

* i
* h,j,k,l,Nh,Nj,Nk,Nl

## never support

* : (you should get use to command palette)

## future suppprt

* a
* d
* I,A
* f,t
* Ctrl-U,Ctrl-D
* ...