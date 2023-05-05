# SmartMat

## Description

The purpose of the project is to make an application that makes it easier for people to throw less food away. A core functionality in the application, is generating recipes based on the groceryitems a user has in his fridge, and their expiration dates. This will allow the user to eat the food he already has, and the food that will soon expire.
Food production consumes energy and releases CO2 into the atmosphere. If people use less food, there will be less pollution. Also, the app-user will save money from the food they don’t need to buy. 


## Technologies
- The Vue.js Framework 
- MySQL - PHPMyAdmin
- SpringBoot 
- H2 Database Engine - In-memory database for testing
- JWT - Authentication for REST APIs
- Swagger - API documentation
- Docker


## How to run and install the project backend





## How to run and install the project frontend
### The technologies needed to run the program are:

- Node.js - can be installed [here](https://nodejs.org/en/download)

### To be certain you have Node.js installed, run this command:
```sh
- node -v
```


### Do the same for NPM:
```sh
- npm -v
```

### Use this command to install Vue:

```sh
- npm install vue
```

### After installing Vue, the frontend project can be cloned. Run this command in the terminal:

```sh
git clone git@gitlab.stud.idi.ntnu.no:idatt2106-v21-09/frontend.git
```

### To download the necessary dependencies, run this command while inside the project:


```sh
npm install
```

### To start the application, type this command:

```sh
npm run dev
```

## Navigating the application
The first thing the user sees when he starts the application, is the welcome page. He can then choose to either log in, if the user already exists in the database, or register. When he registers, he can either join an existing household (if he has the invitation code), or create a new one. Either way, new users can join his household later if he chooses to invite them.

When the user is “in” his household, he can begin to administer his fridge and shoppinglist. He can also choose to have recipes generated for him based on the grocery items in his fridge. He can update his personal information, and general information regarding the household. 

Images for groceryitems and groceries makes it easier for the user to navigate the application. 


## Tests

The backend-project has tests that can be run in the terminal with this command:

```sh
mvn clean test
```


The frontend-project has tests that can be run in the terminal with this command:
```sh
npm run test:unit
```


## CI/CD

Both frontend and backend has a ".gitlab-ci.yml" file.. This file controls Continous Integration for the projects. It manages the pipeline which holds the jobs for GitLab to run.

The backend pipeline has these stages:
- build
- test


The frontend pipeline has these stages:
- build
- test


## Team Members
- Bjørn-Johnny Bendixen
- Håkon Hansen Bergrem
- Teodor Birkeland
- Christoffer Brevik
- Arnold Sverre Hansen
- Hadar Hayat
