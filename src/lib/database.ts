import { MongoClient } from "mongodb";
import chalk from 'chalk';


class Database {

    async init() {
        const MONGO_DB = process.env.DATABASE || 'mongodb://localhost:27017/GamesGG';
        const client = await MongoClient.connect(
            MONGO_DB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        const db= client.db();

        if(client.isConnected()){
            console.log("CONECTADO A BD ");
            console.log(`STATUS ${chalk.greenBright('ONLINE')}`)
            console.log(`DATBASE ${chalk.greenBright(db.databaseName)}`)
        }

        return db;
    }
}

export default Database;