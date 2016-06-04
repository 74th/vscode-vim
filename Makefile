PHONY:clean test testOriginalVim testNeoVim build tslint release buildcontainer testincontainer

MOCHA=./node_modules/mocha/bin/mocha
TSC=./node_modules/typescript/bin/tsc
TSLINT=./node_modules/tslint/bin/tslint

test: build tslint
	cd out;../$(MOCHA) -g VimStyle
	
testOriginalVim: build
	cd out;../$(MOCHA) -g OriginalVim
	
testNeoVim: build
	cd out;../$(MOCHA) -g NeoVim
	
build: node_modules
	$(TSC)

tslint: build
	$(TSLINT) src/**/**.ts

release: test
	vsce package
	vsce publish

release-avoid-tests: build tslint
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
