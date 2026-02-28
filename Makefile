.PHONY: install-playwright build-fixture test-e2e clean-fixture

FIXTURE_SOURCE = tests/fixture-site/source
FIXTURE_BUILD  = tests/fixture-site/_build/html

install-playwright:
	python3 -m playwright install chromium

build-fixture:
	sphinx-build -b html $(FIXTURE_SOURCE) $(FIXTURE_BUILD) -W

test-e2e: install-playwright
	python3 -m pytest tests/ -v --browser chromium

clean-fixture:
	rm -rf tests/fixture-site/_build
