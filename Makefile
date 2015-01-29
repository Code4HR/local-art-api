test:
	@node node_modules/lab/bin/lab
test-cov:
	@node node_modules/lab/bin/lab -t 100
test-cov-html:
	@node node_modules/lab/bin/lab -r html -o coverage.html
lint:
	@node node_modules/jshint/bin/jshint ./*.js test/*.js

.PHONY: test test-cov test-cov-html lint
