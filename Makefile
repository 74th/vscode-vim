.PHONY:clean test build tslint

test: build tslint
	tslint src/**/**.ts
	cd out;mocha -g VimStyle
	
OriginalVimTest: build
	cd out;mocha -g OriginalVim
	
NeoVimTest: build
	cd out;mocha -g NeoVim
	
build: node_modules
	tsc
	
release: build
	vsce package
	vsce publish
	
install:node_modules

node_modules:
	npm install
	
clean:
	rm -rf out
	rm -f *.vsix 