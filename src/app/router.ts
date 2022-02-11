import { getError, getUser } from "../controllers/testController"

const { Router } = require("express")

const router = Router()

router.get('/test', getUser)

router.get('/error', getError)

export { router }