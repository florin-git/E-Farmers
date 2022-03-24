# Insertions service

The service is (for now) divided into two apps: insertion_viewer and insertion_manager.
The service uses Djongo to map the models to the documents in the MongoDB database.

## Functionalities
- View the insertions

## Pages
- /insertions/ 
- /insertions/generate_test_insertions

## Testing
Since there is no way to create new insertions as a user, a dedicated page has been developed in order to initialize the database with two examples of insertion: 'Zucchine' and 'Melanzane'.
This page is temporary, as soon as the creation of an insertion will be developed this page can be deleted.

## Usage
- Create a database in MongoDB called 'insertions'
- Start the django server
- Navigate to /insertions/generate_test_insertions in order to initialize the database with insertions example
- Navigate to /insertions/, the list of insertions found in the database is displayed