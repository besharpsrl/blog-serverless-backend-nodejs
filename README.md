# Express Serverless Project

This application is a base project for an Express Serverless backend application, using AWS as Cloud Provider.

By running this project you will have a CRUD application by Express as NodeJs web application framework.

The whole project is written using TypeScript to obtain all the advantages with respect to write it with old vanilla JavaScript.

In this project we will use ```tsoa``` to register our REST routes and to obtain validation without using boilerplate code.

As all good CRUD services, we need a data source to manage our data.
To manage database object we are going to use Sequelize as ORM.

## Project setup

Run ```npm install``` and install all the necessary dependencies.

To deploy the application on your AWS account you should install Serverless framework by running:

    npm install -g serverless

## Local testing
Before running our functions, we need to setup the database.
You can run the docker-compose file to create a container with a Postgres database already setupped.

When the container is up, run the migration file to initialize correctly the database:

    npm run migrate-db-local
Since we can't directly test Lambda functions on out local machine, we can use the ```serverless-offline``` plugin to achieve this goal.
Please run the following command to start the local test suite:

    npm run start
    
Keep in mind that all the API has `/api/{NODE_ENV}` as root prefix

## Serverless file

[Serverless framework](https://github.com/serverless/serverless) comes in our help to easly manage our cloud infrastracture.

Thanks to our configuration we will have an API Gateway with a resource which proxies to our express routes

Please take a look at serverless.yml file and the documentation for further details.

## AWS configuration

Please be sure to have installed aws cli and configured it with your credentials.

This example project uses Aurora Serverless ad RDBMS and a Secret Manager where credentials are stored.

To create/update the Serverless infrastructure on your account, please run:

    npm run deploy-dev