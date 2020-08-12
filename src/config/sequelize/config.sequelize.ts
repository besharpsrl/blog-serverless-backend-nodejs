import {environment} from "../../environments/environment";
import { Sequelize } from "sequelize";
import {GetSecretValueResponse} from "aws-sdk/clients/secretsmanager";
import {InitModel} from "./init.model";
const AWS = require('aws-sdk');

export class ConfigSequelize{
    private static _instance: ConfigSequelize = null;
    public sequelize: Sequelize = null;

    constructor() {
        if (!ConfigSequelize._instance) {
            console.log("creating instance ConfigSequelize");
            ConfigSequelize._instance = this;
        }else{
            console.log("retrieve instance ConfigSequelize");
            return ConfigSequelize._instance
        }
    }

    public static getInstance(){
        return ConfigSequelize._instance;
    }

    public async setupConnection(){
        if(this.sequelize){
            return;
        }

        if(environment.isLocal){
            this.sequelize = new Sequelize('postgresql://postgres:postgres@localhost:5432/postgres');
        }else{
            await this.setupAwsConnection()
        }

        console.log("Connection to database concluded");

        InitModel(this.sequelize);
    }

    private async setupAwsConnection(){
        console.log("Connecting to RDS");

        try{
            const resp = await this.getSecret();

            this.sequelize = new Sequelize(environment.rds.database, resp.username, resp.password, {
                host: environment.rds.hostname,
                dialect: 'postgres'
            });
        } catch (e) {
            console.error(e);
            throw e
        }

        console.log("Connected to RDS successfully");
    }

    private async getSecret() {
        const secretsManager = new AWS.SecretsManager({
            region: environment.region
        });

        try {
            const resp = await new Promise<GetSecretValueResponse>((resolve, reject) => {
                secretsManager.getSecretValue({SecretId: environment.rds.secretId}, (err, data) => {
                if (err){
                    return reject(err)
                }
                else{
                    return resolve(data)
                }
            })});

            console.log("RDS secrets correctly retrieved");

            const jsonResp = JSON.parse(resp.SecretString);
            return {
                username: jsonResp.username,
                password: jsonResp.password
            }
        }
        catch(error){
            console.log(error)
        }
    }
}
