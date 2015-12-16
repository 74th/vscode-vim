PHONY:clean test build tslint

test: build tslint
	tslint src/**/**.ts
	cd out;mocha -g VimStyle
	
OriginalVimTest: build
	cd out;mocha -g OriginalVim
	
NeoVimTest: build
	cd out;mocha -g NeoVim
	
build: node_modules
	tsc

release: test
	vsce package
	vsce publish
	
install:node_modules

node_modules:
	npm install
	
clean:
	rm -rf out
	rm -f *.vsix
buildcontainer:
	cd testcontainer;docker build -t vscode-vim .
testincontainer:
	docker run -it -v `pwd`:/root/ vscode-vim tsc
	docker run -it -v `pwd`:/root/ -w /root/out/test/ vscode-vim mocha -g VimStyle .