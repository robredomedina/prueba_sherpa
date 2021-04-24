## Stack y librerías utilizadas

### La parte de Python

- Para realizar el API REST he utilizado *Flask*, porque es más ligero y tiene menos "overhead" que Django.
- Para la base de datos he utilizado SQLlite3, y para gestionar la conexión desde Flask, flask-sqlalchemy.
- Para obtener datos de la API de GeoNames, he encontrado una libería de Python que funciona bien, y no requiere ningún tipo de autenticación, y parece que tiene llamadas ilimitadas. *pgeocode*

### La parte de JS

- He usado NodeJs, y el framework de express para realizar la API rest
- Nodemon para refrescar la app cada vez que hay cambios en un fichero
- Sqlite3 para gestionar la conexión  a la base de datos



## Como arrancar la app

### La parte de Python
En la linea de comandos, ejecutar:

- pip3 install -r requirements.txt
- flask run
- Esta app sólo tiene un endoint **/findcity**
- para buscar la ciudad hay que añadir los param username y cp: 
    - */findcity?username=ejemplo&cp=00000*

### La parte de JS
En la linea de comandos, dentro de la carpeta /ts_endpoints, ejecutar:
- npm init -y
- npm install
- (de momento, y al estar en desarrollo) npm start
- Aquí hay _ endopoints:
    - /api/:cp/findAll - Devuelve todos los usuarios que están en el cp introducido
    - /api/:cp/deleteAll - Borra todos los registros con ese cp

### La parte de Typescript
En la linea de comandos, dentro de la carpeta /ts_project, ejecutar:
- npm init -y
- npm install
- tsc
- node dist/app.js
