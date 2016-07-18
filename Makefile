html:
	docker run -v `pwd`:/source jagregory/pandoc index.md -f markdown -t html -s -o index.html -c tufte.css -c latex.css
