.SUFFIXES: .png .plantuml
.PHONY: umlbuild
.plantuml.png:
	plantuml -charset UTF-8 $<

umlbuild: moveWord.png changeWord.png deleteWord.png deleteEndOfWord.png
