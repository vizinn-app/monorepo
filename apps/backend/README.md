# API Installation and Execution

This guide explains how to set up and run the API in a Python environment using `poetry` for dependency management.

## Requirements

Make sure you have the following installed:
- Python 3.13
- `pipx` for isolated tool installation
- `poetry` for dependency management

## Installation

1. Install `pipx`:
   ```sh
   pip install --user pipx
   pipx ensurepath
   ```

2. Install `poetry`:
   ```sh
   pipx install poetry
   ```

3. Add the poetry shell plugin:
   ```sh
   poetry self add poetry-plugin-shell
   ```

4. Create a virtual environment and activate it:
   ```sh
   poetry shell
   ```

5. Make sure you're using the correct Python version:
   ```sh
   poetry python install 3.13
   poetry env use 3.13
   ```

6. Install project dependencies:
   ```sh
   poetry install
   ```

## Running the API

To run the API, use the following command:

```sh
task run
```

Now your API is running and ready to use!

