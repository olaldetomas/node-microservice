import { router } from "./router"
import Server from "./server"

/**
 * Create server
 */
new Server(router).start()