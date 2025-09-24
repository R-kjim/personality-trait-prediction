# Makefile

VENV_NAME = .venv
PYTHON = $(VENV_NAME)/bin/python
PIP = $(VENV_NAME)/bin/pip
UVICORN = $(VENV_NAME)/bin/uvicorn
APP_MODULE = app.app:app

.PHONY: env run clean

# Create virtual environment if it doesn't exist
env:
	@if [ ! -d "$(VENV_NAME)" ]; then \
		echo "Creating virtual environment..."; \
		python3 -m venv $(VENV_NAME); \
		$(PIP) install --upgrade pip; \
		$(PIP) install -r requirements.txt; \
	else \
		echo "Virtual environment already exists."; \
	fi

# Start the FastAPI app
run: env
	@echo "Starting FastAPI with Uvicorn..."
	$(UVICORN) $(APP_MODULE) --reload

# Clean environment
clean:
	rm -rf $(VENV_NAME)
	find . -type d -name "__pycache__" -exec rm -r {} +
