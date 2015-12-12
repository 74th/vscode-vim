.PHONY:clean test build tslint
test: build tslint
	tslint src/**/**.ts
	cd out;mocha -g VimStyle
OriginalVimTest: build
	cd out;mocha -g OriginalVim
NeoVimTest: build
	cd out;mocha -g NeoVim
build:
	tsc
release: build
	vsce package
	vsce publish
clean:
	rm -rf out
	rm -f *.vsix
