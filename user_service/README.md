## Usage
- Install dependencies: `/path/to/E-Farmers/user_service$ pip install -r requirements.txt`
- Set up database: see main README
- Migrate the db: `/path/to/E-Farmers/user_service$ python3 manage.py migrate`
- Add .env file in `/path/to/E-Farmers/user_service/user_service` folder
- Start the django server: `/path/to/E-Farmers/user_service$ python3 manage.py runserver 0.0.0.0:8080`

.env 
```
DATABASE_PASSWORD=password
DATABASE_HOSTNAME=localhost
DATABASE_USER=efarmers
DATABASE_NAME=efarmers
DATABASE_PORT=5432
```