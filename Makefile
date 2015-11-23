build:
	tsc
package: build
	vsce package
release: package
	vsce publish
