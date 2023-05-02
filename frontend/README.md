## Usage
- Install node modules: `npm i`
- Start node server for React: `npm start`

If you want to test the frontend in local, you have to add a *.env* file in the frontend folder.

.env 
```
REACT_APP_API_USERS=http://localhost:8080/api/
REACT_APP_API_INSERTIONS=http://localhost:8081/api/
REACT_APP_API_CART=http://localhost:8082/api/
REACT_APP_API_PAYMENTS_ORDERS=http://localhost:8083/api
REACT_APP_API_SUBSCRIPTION=http://localhost:5000/

REACT_APP_GOOGLE_API_TOKEN=<YOUR_GOOGLE_API_TOKEN_FOR_OAUTH>
```
