## Stack y librerías utilizadas, y decisiones tomadas

### La parte de Python

- Para realizar el API REST he utilizado *Flask*, porque es más ligero y tiene menos "overhead" que Django.
- Para la base de datos he utilizado SQLlite3, y para gestionar la conexión desde Flask, flask-sqlalchemy.
- Para obtener datos de la API de GeoNames, he encontrado una libería de Python que funciona bien, y no requiere ningún tipo de autenticación, y parece que tiene llamadas ilimitadas. [pgeocode](https://pypi.org/project/pgeocode/)
- Esta API sólo tiene un endpoint, */findcity*, y sólo implementa el método GET, aunque en realidad hace un UPDATE si un usuario ya registrado introduce un cp distinto. No me convence el haber utilizado este único endpoint con sólo método GET, pero era una decisión rápida.


### La parte de Typecript
- He usado NodeJs, y el framework de express para realizar la API rest
- [Prisma.io](https://www.prisma.io/) como ORM para gestionar la conexión a sqlite.
- Los dos endpoints solicitados son:
    - GET */api/:cp/findAll*
    - DELETE */api/:cp/deleteAll*

### Base de Datos
- Al ser una prueba, he querido implementar la base de datos en SQLite, con la cual nunca había trabajado, pero he leído que está bien para hacer desarrollos en local. Después he leído que para conexiones desde distintas aplicaciones, no debería utilizarse en entornos de desarrollo, ya que al no haber un servidor, sino un simple fichero en local, no se asegura que las conexiones paralelas se gestionen correctamente y pueden darse problemas de concurrencia [aqui](https://www.sqlite.org/faq.html#q5) . Haciendo pruebas en mi maquina no ha habido problemas escribiendo y leyendo desde las distintas apps, por lo que he decidido dejarlo así, y no hacer
- El fichero **database_schema.txt** muestra el esquema de las 2 tablas creadas.
- Como *foreign key* en la tabla Localizaciones he utilizado el username de la tabla Users. Para ello, he hecho que el campo User.username sea único. Es más óptimo haber utilizado el *primary key* (User.id), ya que las búsquedas son más rápidas, pero me resultaba más expresivo asociar el localización al nombre del usuario.


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
Requititos: Tener instalado npm, npx, tsc, prisma
En la linea de comandos, dentro de la carpeta /ts_project, ejecutar:
- npm install
- npx prisma
- tsc
- node dist/app.js


