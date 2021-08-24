docker build --tag my_verdaccio verdaccio 
docker run -d -it --rm --name verdaccio -p 4873:4873 my_verdaccio
docker build --tag my_jupyterlab jupyterlab
docker run -d --name jupyterlab my_jupyterlab
docker cp verdaccio:/verdaccio/storage/ verdaccio-storage/
docker cp jupyterlab:/home/python_dependencies/ python_dependencies/

