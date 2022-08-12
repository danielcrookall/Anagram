# Contributor Setup

1. Run npm install.
2. Create a file named .env in the server directory and copy the following:

```
   ATLAS_URI=mongodb+srv://<username>:<password>@cluster0.cpycr.mongodb.net/CPSC455?retryWrites=true&w=majority
```
3. Please replace \<username> and \<password> with your username and password from your database user from MongoDB.

To create a database user, navigate to the project "Project0" on MongoDB. Then navigate to the "Database Access" tab, and click "Add new database user".

Note to not use a password that you would normally use with other apps.

4. To start the server locally, run ```npm run start``` in the server directory. Create a .env file in the client and set the following variables:
```
REACT_APP_BASE_FE_URL=http://localhost:3000
REACT_APP_BASE_BE_URL=http://localhost:5000
```

# Description of App

A social media web application where users can upload images and have them classified into different categories using Google’s Cloud Vision API. 


