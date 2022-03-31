# Insertions service

## Functionalities
- Publish a new insertion
- View the index of insertions
- Show the details of an insertion
- Delete an insertion

## Structure

#### Django project
Just one: `insertions_service`

#### Project apps
- `insertions_manager`: handles the requests that manipulate the models. The publishing and deletion of an insertion happen here.
- `insertions_viewer`: all the requests that ask for the visualization of insertions go here. Insertions index, show, edit and delete pages are generated here.

## Usage
- Install dependencies: `/path/to/E-Farmers/insertions_service$ pip install -r requirements.txt`
- Create a database in MongoDB called 'insertions'
- Check if the `mongod` service is up and running (`systemctl status mongod`) if not, start it: `sudo systemctl start mongod`
- Migrate the db: `/path/to/E-Farmers/insertions_service$ python3 manage.py migrate`
- Start the django server: `/path/to/E-Farmers/insertions_service$ python3 manage.py runserver`
