import http from 'http'
import morgan from "morgan"
import * as defaults from "../../configs/defaults"
import pingRequest from '../controllers/pingController'
import express, { Router } from 'express';
import { Express } from 'express-serve-static-core'

export default class Server {
  private app = express()
  private server: any
  private config = defaults
  private apiRoutes: Router
  private LISTEN_SERVER_FORMAT: string = "Server listen on port %d"

  constructor(apiRoutes: Router) {
    this.apiRoutes = apiRoutes
  }

  start(): void {
    // Middleware configuration
    this.configMiddlewares()
    //Run server
    this.runServer()
  }

  private configMiddlewares(): void {
    /**
     * Middlewares
     */
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan('dev'))
    /**
     * Routes
     */
    this.app.get('/ping', pingRequest)
    this.app.use(this.apiRoutes)
  }

  private runServer(): void {
    const { port, host } = this.config.server
    this.server = this.app.listen(port, host, () => {
      console.log(this.LISTEN_SERVER_FORMAT, port);
    });
  }

  getApp(): Express {
    return this.app
  }

  destroy(): void {
    var connections = {}
    this.server.on('connection', function (conn) {
      var key = conn.remoteAddress + ':' + conn.remotePort;
      connections[key] = conn;
      conn.on('close', function () {
        delete connections[key]
      })
    })

    this.server.close();
    for (var key in connections) {
      connections[key].destroy()
    }
  }
}