# E-Farmers

This web app is made for people that wish to sell and delivery their own fresh home-farm products to other people in their neighborhood.
This is a project made for the course of *Laboratory of Advanced Programming* at **La Sapienza University**.

Documentation can be found at the following [link](https://github.com/florin-git/E-Farmers/blob/main/documentation/E-farmers%20documentation.pdf).

## Authors


| **Name and Surname** | **Linkedin** | **GitHub** |
| :---: | :---: | :---: |
| `Florin Cuconasu ` | [![name](https://github.com/nardoz-dev/projectName/blob/main/docs/sharedpictures/LogoIn.png)](https://www.linkedin.com/in/florin-cuconasu/) | [![name](https://github.com/nardoz-dev/projectName/blob/main/docs/sharedpictures/GitHubLogo.png)](https://github.com/florin-git) |
| `Antonio Grieco ` | [![name](https://github.com/nardoz-dev/projectName/blob/main/docs/sharedpictures/LogoIn.png)]() | [![name](https://github.com/nardoz-dev/projectName/blob/main/docs/sharedpictures/GitHubLogo.png)](https://github.com/AGrieco96) |
| `Marco Settanni ` | [![name](https://github.com/nardoz-dev/projectName/blob/main/docs/sharedpictures/LogoIn.png)](https://www.linkedin.com/in/marcosettanni/) | [![name](https://github.com/nardoz-dev/projectName/blob/main/docs/sharedpictures/GitHubLogo.png)](https://github.com/Marco7years) |
| `Davide Bazzana ` | [![name](https://github.com/nardoz-dev/projectName/blob/main/docs/sharedpictures/LogoIn.png)]() | [![name](https://github.com/nardoz-dev/projectName/blob/main/docs/sharedpictures/GitHubLogo.png)](https://github.com/davidebazzana) |
| `Andrea Nardocci ` | [![name](https://github.com/nardoz-dev/projectName/blob/main/docs/sharedpictures/LogoIn.png)](https://www.linkedin.com/in/andrea-nardocci) | [![name](https://github.com/nardoz-dev/projectName/blob/main/docs/sharedpictures/GitHubLogo.png)](https://github.com/nardoz-dev) |


## Functionalities
**User Microservice**
- Authentication
- Reviews
- Badges
- Delivery Service

**Insertion Microservice**
- Selling Foodstuffs Boxes
- Calendar
- Book Foodstuffs Boxes

**Shopping Cart Microservice**
- Buying Foodstuffs Boxes

**Payments & Orders Microservice**
- Perform Payments via Stripe API
- Check Out Orders

**Subscription Microservice**
- Subscription to Farmer
- Notification Mechanism


## Usage in local
The usage in **local** of each microservice is described on readme, located in each respective microservice directory.

### Postgres database set up
If the database is hosted locally, then the following steps must be done:
1) Install postgres on your machine: `sudo apt-get install postgresql-13`
2) Login into postgres user: `sudo -u postgres -i`
3) Create the new database called efarmers: `createdb efarmers`
4) Open the postgres database (the postgres db contains all the roles and permissions granted to each role): `psql`
5) Create a new user (~role) called efarmers: `CREATE USER efarmers;` or `CREATE ROLE efarmers LOGIN;`
6) Set the password of the user efarmers to "password": `ALTER ROLE efarmers PASSWORD 'password';`

## Usage Docker
**Installation Part**
- Ubuntu : https://docs.docker.com/engine/install/ubuntu/
- Windows : https://docs.docker.com/desktop/install/windows-install/

**Start services**

In order to start the entire application you need to execute the following command in the main directory (the same of the docker-compose file):
```
docker-compose up
```


### Remember 
Add a .env file in the main directory (the same of the docker-compose file).

This is how it should be the .env 

.env 
```
DATABASE_PASSWORD=password
DATABASE_HOSTNAME=db
DATABASE_USER=efarmers
DATABASE_NAME=efarmers
DATABASE_PORT=5432

REACT_APP_API_USERS=http://localhost:8080/api/
REACT_APP_API_INSERTIONS=http://localhost:8081/api/
REACT_APP_API_CART=http://localhost:8082/api/
REACT_APP_API_PAYMENTS_ORDERS=http://localhost:8083/api
REACT_APP_API_SUBSCRIPTION=http://localhost:5000/

REACT_APP_GOOGLE_API_TOKEN=<YOUR_GOOGLE_API_TOKEN_FOR_OAUTH>
```
