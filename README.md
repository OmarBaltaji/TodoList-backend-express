# Pre-requisites:
- Make sure you have Node JS installed on your machine
- Then run the following commands:

## npm:
``` 
git clone https://github.com/OmarBaltaji/TodoList-MERN.git 
```
```
cd TodoList-backend-express
```
```
npm install
```

## .env file:
- Copy .env.example to .env
- Go to mongodb.com and sign in
- Then navigate to Cloud -> Atlas
- Create a new Cluster (You can follow the documentation here: https://docs.atlas.mongodb.com/tutorial/create-new-cluster)
- Click on Network Access and Add IP Address (You can add your current IP Address)
- Click on Database Access and Add New Database User, choose authentication method as Password, write username and password, and make sure that the Database User Privileges is set to Read and write to any database. Then Add User.
- Then go back to Clusters and click connect on your newly created cluster. Choose the connect your application option and copy the connection string to .env ATLAS_URI variable (Make sure to change the 'password' and 'dbname' to your own password and database name)

## Creating the database:
- In the cluster dashboard navigate Collections and Create Database. (make sure the database name here matches with the ATLAS_URI dbname in the .env file)

## Running the server:
```
cd TodoList-backend-express
```
```
npm run start
```