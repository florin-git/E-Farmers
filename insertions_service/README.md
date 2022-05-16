# Insertions service

## Functionalities
- Publish a new insertion
- Add boxes to insertions
- View the index of insertions
- Show the details of an insertion
- Delete an insertion

## Usage
- Install dependencies: `/path/to/E-Farmers/insertions_service$ pip install -r requirements.txt`
- Set up database: see next section
- Migrate the db: `/path/to/E-Farmers/insertions_service$ python3 manage.py migrate`
- Start the django server: `/path/to/E-Farmers/insertions_service$ python3 manage.py runserver`

## Postgres database set up
If the database is hosted locally, then the following steps must be done:
1) Install postgres on your machine: `sudo apt-get install postgresql-12`
2) Login into postgres user: `sudo -u postgres -i`
3) Create the new database called efarmers: `createdb efarmers`
4) Open the postgres database (the postgres db contains all the roles and permissions granted to each role): `psql`
5) Create a new user (~role) called efarmers: `CREATE USER efarmers;` or `CREATE ROLE efarmers LOGIN;`
6) Set the password of the user efarmers to "password": `ALTER ROLE efarmers PASSWORD 'password';`

## Remember 
Add a .env files on main directory as u see :

.env 
```
    DATABASE_PASSWORD=password
    DATABASE_HOSTNAME=localhost
```
