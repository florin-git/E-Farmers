
# Insertions service

This branch contains all the part related to the Insertions, but integrated with the Frontend via ReactJS.

Now, all you could have done in Django is possibile through a Frontend interface. For doing this, I had to modify the structure of the backend in order to allow the communication to the frontened; therefore, I have replaced almost all methods, in particular in `view.py`, with those presented in the [Rest Framework](https://www.django-rest-framework.org/) .


## Functionalities


- Publish a new insertion
- Add boxes to insertions
- View the index of insertions
- Show the details of an insertion
- Delete an insertion


## Structure

#### Django projects

`insertions_service`
-  `insertions_manager`

#### Principal Api Backend

- api/insertions/
- api/insertions/\<str:insertion_id\>
- insertions/\<str:insertion_id\>/boxes
  

#### Frontend Pages

- insertions/
- insertions/new
- insertions/:insertion_id
- insertions/:insertion_id/boxes

# Usage

  

## Django

- Install dependencies: `/path/to/E-Farmers/insertions_service$ pip install -r requirements.txt`

  

- Create a database in MongoDB called 'insertions'

  

- Check if the `mongod` service is up and running (`systemctl status mongod`) if not, start it: `sudo systemctl start mongod`

  

- Migrate the db: `/path/to/E-Farmers/insertions_service$ python3 manage.py migrate`

  

- Start the django server: `/path/to/E-Farmers/insertions_service$ python3 manage.py runserver`

  

## React

- Make sure you have install and setup ReactJS. Please follow this [tutorial](https://e-farmers.atlassian.net/wiki/spaces/EF/pages/4554753/Setup+ReactJS?atlOrigin=eyJpIjoiMmQ5MDM3YmZlMGNkNDYzNThlNjMyNjk0ODUwYWY2NDQiLCJwIjoiaiJ9).

  

- All the needed npm packages should be installed, but if you have some problems you can find the packages I installed in the file `react_packages.txt`. I used React v **17.0.0**.

  

- Start React server (you have to be in the `frontened` folder): `npm start`

## Best Practises
I strongly suggest to install the following VSCode Extensions:
- **Better Commens**: Improve your code commenting by annotating with alert, informational, TODOs, etc. When you find an additional * to my comments it is because they are highlighted.
- **ES7+ React/Redux/React-Native snippets**: React Snippets. For example, if you want to create a new Component the only thing you need to do is to write `rsf` and press enter.
- **Prettier - Code formatter**: Simply press `CTRL + S` and your code is formatted in a nice way. If it does not work with a particular language, then go to your `settings.json` file of VSCode and add this line: 
`"[your_language]": {"editor.defaultFormatter": "esbenp.prettier-vscode"}`
Let's say React you want to add React, then you simply add the following line:
 `"[javascriptreact]": {"editor.defaultFormatter": "esbenp.prettier-vscode"}`