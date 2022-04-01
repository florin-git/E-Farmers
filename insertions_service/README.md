# Insertions service

## Functionalities
- Publish a new insertion
- Add boxes to insertions
- View the index of insertions
- Show the details of an insertion
- Delete an insertion

## Structure

#### Django projects
Just one: `insertions_service`

#### Project apps
Just one: `insertions_manager`

## Usage
- Install dependencies: `/path/to/E-Farmers/insertions_service$ pip install -r requirements.txt`
- Create a database in MongoDB called 'insertions'
- Check if the `mongod` service is up and running (`systemctl status mongod`) if not, start it: `sudo systemctl start mongod`
- Migrate the db: `/path/to/E-Farmers/insertions_service$ python3 manage.py migrate`
- Start the django server: `/path/to/E-Farmers/insertions_service$ python3 manage.py runserver`
