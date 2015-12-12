.PHONY:clean test build tslint
test: build tslint
	tslint src/**/**.ts
	cd out;mocha
build:
	tsc
package: build
	vsce package
release: package
	vsce publish
clean:
	rm -rf out
