Step 1: Clone the repository (https://github.com/darpanchelani/myStore.git)

Step 2: run npm install in frontend and backend folders

Step 3: run npm start in backend

Step 4: run npm start in frontend

// You can also check endpoint in given postman collections 
 to get the product by id: http://localhost:5000/products/12

 to update the price value by id: 
 http://localhost:5000/products/12
  write in body: 
  {
  "current_price": {
    "value": 110.30,
    "currency_code": "AUS"
  }
}

in headers:
 Content Type : application/json
