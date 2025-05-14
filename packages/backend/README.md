# Instalação e Execução da API

Este guia explica como configurar e rodar a API em um ambiente Python utilizando `poetry` para gestão de dependências.

## Requisitos

Certifique-se de ter instalado:
- Python 3.13
- `pipx` para instalação isolada de ferramentas
- `poetry` para gestão de dependências

## Instalação

1. Instale o `pipx`:
   ```sh
   pip install --user pipx
   pipx ensurepath
   ```

2. Instale o `poetry`:
   ```sh
   pipx install poetry
   ```

3. Adicione o plugin de shell do `poetry`:
   ```sh
   poetry self add poetry-plugin-shell
   ```

4. Crie um ambiente virtual e ative-o:
   ```sh
   poetry shell
   ```

5. Certifique-se de que está utilizando a versão correta do Python:
   ```sh
   poetry python install 3.13
   poetry env use 3.13
   ```

6. Instale as dependências do projeto:
   ```sh
   poetry install
   ```

## Execução da API

Para rodar a API, utilize o seguinte comando:

```sh
task run
```

Agora sua API está rodando e pronta para uso!

