import * as dotenv from "dotenv"
import http from "http";
import {ListenOptions} from "net";
import express, {Express, Request} from "express";
import cors from "cors"
import * as bodyParser from "body-parser"
import {ConnectOptions, Mongoose, connect} from "mongoose";
import {address} from "ip";
import {resolve} from "path";
import {STAR, STATIC} from "./routes/api/v1/list.routes.v1";
import {ERROR_EVENT} from "./assets/events/list.event";
import ErrorHandling from "./assets/errors/ErrorHandling";
import routes from "./routes";
import notExistedRoute from "./middleware/notExistedRoute.middleware";

class Server extends ErrorHandling {
    private app: Express = express();
    private ipv4: string = address();
    private port: number = 5000;
    private listenOptions: ListenOptions = {host: this.ipv4, port: this.port};
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
        this.setErrorHandler();
    }

    private setHTTPServer = (): void => {
        const httpServer = http.createServer(this.app);

        const httpListing = httpServer.listen(this.listenOptions, async () => {
            await this.mongooseConfig();

            console.log(`Server is listening on http://${this.ipv4}:${this.port}`);
        });

        httpListing.on(ERROR_EVENT, error => this.consoleError(501, error));
    };

    private mongooseConfig =  async (): Promise<any> => {
        try {
            const db: Mongoose = await connect(this.DB_URI, this.mongooseOpt);

            if (!db) throw db;

            console.info('database successfully connected');
        } catch (error) {
            this.consoleError(502, error);
        }
    };

    private setConfig = (): void => {
        this.app.use(cors<Request>());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    };

    private setRoutes = (): void => {
        this.app.use(routes);
        this.app.use(STATIC, express.static(resolve(__dirname, "public")));
        this.app.use(STAR, notExistedRoute);
    };

    private setErrorHandler = (): void => {
        this.app.use(this.errorControllerMiddleware);
    }
}

export default Server;