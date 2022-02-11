import { router } from "./app/router"
import Server from "./app/server"

/**
 * Create server
 */
const server = new Server(router)
server.start()