## Usage
- Install dependencies: `/path_to_E-Farmers/insertions_service$ pip install -r requirements.txt`
- Set up database: see main README
- Migrate the db: `/path_to_E-Farmers/insertions_service$ python3 manage.py migrate`
- Add .env file in `/path_to_E-Farmers/insertions_service/insertions_service` folder (not in the main one, but in the **insertions_service subfolder**)
- Start the django server: `/path_to_E-Farmers/insertions_service$ python3 manage.py runserver `

.env 
```
DATABASE_PASSWORD=password
DATABASE_HOSTNAME=localhost
DATABASE_USER=efarmers
DATABASE_NAME=efarmers
DATABASE_PORT=5432
```
