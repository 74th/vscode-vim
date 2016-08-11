.SUFFIXES: .png .plantuml
.PHONY: umlbuild
.plantuml.png:
	plantuml -charset UTF-8 $<

umlbuild: moveAndDeleteWord.png cutWord.png
