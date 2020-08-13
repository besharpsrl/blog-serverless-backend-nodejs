# Express Serverless Project

This is a base project for an Express Serverless backend application, using AWS as Cloud Provider.

By running this project you will have a CRUD application by Express as NodeJs web application framework.
It is written in TypeScript to obtain all the advantages with respect to vanilla JavaScript.

In this project we will use ```tsoa``` to register our Express routes and to obtain validation without using boilerplate code.

As all good CRUD services, we need a data source to manage our data.
To manage database object we are going to use Sequelize as ORM.

## Project setup

Run ```npm install``` and install all the necessary dependencies.

To test and deploy the application on your AWS account you should install Serverless framework by running:

    npm install -g serverless

## Local testing
Before running locally our functions, we need to setup the database.
You can run the docker-compose file to create a container with a Postgres database.

    docker-compose up

When the container is up, run the migration file to correctly initialize the database:

    npm run migrate-db-local
    
Since we can't directly test Lambda functions on our local machine, we can use the ```serverless-offline``` plugin to achieve this goal.
Run the following command to emulate locally AWS Lambda and API Gateway:

    npm run start
    
Keep in mind that all the API has `/{NODE_ENV}/api` as root prefix

## Serverless file

[Serverless framework](https://github.com/serverless/serverless) comes in our help to easily manage our cloud infrastructure.

Thanks to the configuration defined in the serverless.yml file, we are going to create an API Gateway with single resource which proxies the API calls to the proper Express route.


## AWS configuration

Please be sure to have installed AWS CLI and configured it with your credentials.

This example project uses Aurora Serverless as RDBMS and a Secret Manager where credentials are stored.

To create/update the Serverless infrastructure on your account, run the command:

    npm run deploy-dev