import http from 'http'
import morgan from "morgan"
import * as defaults from "../configs/defaults"
import express, { Router } from 'express';

export default class Server {
  private app = express();
  private config = defaults;
  private apiRoutes: Router;
  private LISTEN_SERVER_FORMAT: string = "Server listen on port %d"

  constructor(apiRoutes: Router) {
    this.apiRoutes = apiRoutes
  }

  start(): void {
    /**
     * Middleware configuration
     */
    this.configMiddlewares()
    /**
     * Run server
     */
    this.runServer()
  }

  private configMiddlewares() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan('dev'))

    this.app.get('/ping', (req, res) => res.status(200).send('pong'))

    this.app.use(this.apiRoutes)

    this.app.use(function (err, req, res, next) {
      console.error(err.stack)
      res.status(500).json(err)
    })

  }

  private runServer(): void {
    const { port, host } = this.config.server
    http.createServer(this.app).listen(port, host, () => {
      console.log(this.LISTEN_SERVER_FORMAT, port);
    });
  }
}