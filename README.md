## Stack y librerías utilizadas, y decisiones tomadas

### La parte de Python

- Para realizar el API REST he utilizado *Flask*, porque es más ligero y tiene menos "overhead" que Django.
- Para la base de datos he utilizado SQLlite3, y para gestionar la conexión desde Flask, flask-sqlalchemy.
- Para obtener datos de la API de GeoNames, he encontrado una libería de Python que funciona bien, y no requiere ningún tipo de autenticación, y parece que tiene llamadas ilimitadas. [pgeocode](https://pypi.org/project/pgeocode/)
- Esta API sólo tiene un endpoint, */findcity*, y sólo implementa el método GET, aunque en realidad hace un UPDATE si un usuario ya registrado introduce un cp distinto. No me convence el haber utilizado este único endpoint con sólo método GET, pero era una decisión rápida.


### La parte de Typecript
- He usado NodeJs, y el framework de express para realizar la API rest
- He utilizado [Prisma.io](https://www.prisma.io/) como ORM para gestionar la conexión a sqlite.
- Los dos endpoints solicitados son:
    - GET */api/:cp/findAll*
    - DELETE */api/:cp/deleteAll*

- No habia visto una línea de Java en mi vida, y he intentado aprenderlo  para implementar los endpoints opcionales que se solicitaban en este lenguaje. Tras haber hecho unos intentos con Spring Boot, y ver que me iba a suponer más días poder dominar Java, he decidido hacer los endpoints en Typescript (que tampoco había usado nunca, al igual que Flask).

- Los otros endpoints implementados son:
    - GET */api/usuariosporcp*
    - GET */api/estadisticos*

- He realizado algunos tests con **Mocha** como framework, **chai** como librería de aserciones y **supertest** para simular la conexion a la app. He de decir que también es la primera vez que hago tests, ya que en mi actual empresa no se hacen. 

Todos los endpoints devuelven un json, con esta estructura:
{ "error": _
  "description": _
  "data": _
}

Ahora mismo sólo hay 3 tipos de error, y 0 significa que no hay error. Si devuelve error, data vuelve vacío.



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

### La parte de Typescript
Requisitos: Tener instalado npm, npx, tsc, prisma
En la linea de comandos, dentro de la carpeta /ts_project, ejecutar:
- npm install
- npm run dev para ejecutar la app en modo development
- npm run test para correr los tests

- En esta app hay los siguientes endopoints:
    - GET */api/:cp/findAll* - Devuelve todos los usuarios que están en el cp introducido
    - DELETE */api/:cp/deleteAll* - Borra todos los registros con ese cp
    - GET */api/usuariosporcp* - Devuelve los usuarios totales por cp, ordenados de mayor a menor
    - GET */api/estadisticos* - Devuelve varios datos: cp con más usuarios, cp con menos usuarios, promedio de usuarios por cp, y desviacion tipica del promedio de usuarios por cp.
