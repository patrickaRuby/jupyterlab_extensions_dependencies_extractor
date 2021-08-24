FROM jupyter/scipy-notebook:latest
USER root
RUN apt update
# DONT FORGET TO UPDATE IP OF REGISTRY - TO HOST IP
RUN jlpm config set registry http://192.168.0.192:4873/
RUN npm config set registry=http://192.168.0.192:4873/

RUN mkdir /home/python_dependencies
RUN echo 8

#IFRAME
ADD jupyterlab_iframe /home/jupyterlab_extensions/jupyterlab_iframe
WORKDIR /home/jupyterlab_extensions/jupyterlab_iframe
RUN pip download -d /home/python_dependencies .[dev] 
WORKDIR /home/jupyterlab_extensions/jupyterlab_iframe/js
RUN npm i . 
RUN npm run build:all
WORKDIR /home/jupyterlab_extensions/jupyterlab_iframe
RUN pip install .[dev]
WORKDIR /home/jupyterlab_extensions/jupyterlab_iframe/js
RUN jupyter labextension install . 
RUN jupyter serverextension enable --py jupyterlab_iframe

#DEBUGGER
RUN pip download -d /home/python_dependencies xeus-python ptvsd notebook
RUN pip install xeus-python ptvsd notebook
RUN jupyter labextension install @jupyterlab/debugger
RUN chmod -R 777 .

#FORMATER
RUN pip download -d /home/python_dependencies jupyterlab_code_formatter black
RUN pip install jupyterlab_code_formatter black

# LSP 
RUN pip download -d /home/python_dependencies jupyterlab-lsp
RUN pip install jupyterlab-lsp
RUN pip download -d /home/python_dependencies 'python-lsp-server[all]'
RUN pip install 'python-lsp-server[all]'


#SNIPPETS
RUN jupyter labextension install jupyterlab-code-snippets
RUN pip download -d /home/python_dependencies jupyterlab-code-snippets
RUN pip install jupyterlab-code-snippets
