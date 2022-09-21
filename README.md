# E-Farmers

This web app is made for people that wish to sell and delivery their own fresh home-farm products to other people in their neighborhood.
This is a project made for the course of *Laboratory of Advanced Programming* at **La Sapienza University**.

## Authors

Florin Cuconasu \
Antonio Grieco \
Marco Settanni \
Davide Bazzana \
Andrea Nardocci

## Functionalities
- Registration & login
- Publish a new insertion
- Add boxes to insertions
- View the index of insertions
- Show the details of an insertion
- Delete an insertion

## Usage in local
The usage in **local** of each microservice is described in each respective microservice directory.

### Postgres database set up
If the database is hosted locally, then the following steps must be done:
1) Install postgres on your machine: `sudo apt-get install postgresql-12`
2) Login into postgres user: `sudo -u postgres -i`
3) Create the new database called efarmers: `createdb efarmers`
4) Open the postgres database (the postgres db contains all the roles and permissions granted to each role): `psql`
5) Create a new user (~role) called efarmers: `CREATE USER efarmers;` or `CREATE ROLE efarmers LOGIN;`
6) Set the password of the user efarmers to "password": `ALTER ROLE efarmers PASSWORD 'password';`

## Usage Docker
In order to start the entire application you need to execute the following command in the main directory (the same of the docker-compose file):
`docker-compose up`


### Remember 
Add a .env file in the main directory (the same of the docker-compose file):

.env 
```
DATABASE_PASSWORD=password
DATABASE_HOSTNAME=db
DATABASE_USER=efarmers
DATABASE_NAME=efarmers
DATABASE_PORT=5432
REACT_APP_API_USERS=http://localhost:8080/api/
REACT_APP_API_INSERTIONS=http://localhost:8081/api/
REACT_APP_API_SUBSCRIPTION=http://localhost:5000/
```
