PHONY:clean test testOriginalVim testNeoVim build tslint release buildcontainer testincontainer

MOCHA=./node_modules/mocha/bin/mocha --require source-map-support/register
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
	cd testcontainer/centos7;docker build -t vscode-vim-centos7 .
	cd testcontainer/ubuntu1604;docker build -t vscode-vim-ubuntu1604 .
testincontainer-originalvim-centos7:
	docker run -it -v `pwd`:/root/ -w /root/out/ vscode-vim-centos7 vim --version
	docker run -it -v `pwd`:/root/ -w /root/out/ vscode-vim-centos7 ../$(MOCHA) -g OriginalVim
testincontainer-originalvim-ubuntu1604:
	docker run -it -v `pwd`:/root/ -w /root/out/ vscode-vim-ubuntu1604 vim --version
	docker run -it -v `pwd`:/root/ -w /root/out/ vscode-vim-ubuntu1604 ../$(MOCHA) -g OriginalVim
