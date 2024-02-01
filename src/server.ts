import * as dotenv from "dotenv"
import http from "http";
import express, {Express, Request} from "express";
import cors from "cors"
import * as bodyParser from "body-parser"
import {ConnectOptions, Mongoose, connect} from "mongoose";
import EVENTS_LIST from "./assets/events/list.event";
import ErrorHandling from "./assets/errors/ErrorHandling";
import routes from "./routes";

class Server extends ErrorHandling {
    private app: Express = express();
    private DB_URI: string = "mongodb://127.0.0.1:27017";
    private DB_NAME: string = "test_rest_api_db";
    private mongooseOpt: ConnectOptions = {
        dbName: this.DB_NAME,
    };

    constructor() {
        super();

        dotenv.config();
        this.setHTTPServer();
        this.setConfig();
        this.setRoutes();
    }

    private setHTTPServer = (): void => {
        const httpServer = http.createServer(this.app);

        const httpListing = httpServer.listen(process.env.HTTP_SERVER_PORT, async () => {
            await this.mongooseConfig();

            console.log(`Server is listening on ${process.env.HTTP_SERVER_PORT}`);
        });

        httpListing.on(EVENTS_LIST.ERROR, error => this.consoleError(501, error));
    }

    private mongooseConfig = async (): Promise<any> => {
        try {
            const db: Mongoose = await connect(this.DB_URI, this.mongooseOpt);

            if (!db) throw db;

            console.info('database successfully connected');
        } catch (error) {
            this.consoleError(502, error);
        }
    }

    private setConfig = (): void => {
        this.app.use(cors<Request>());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    private setRoutes = (): void => {
        this.app.use(routes);
    }
}

export default Server;