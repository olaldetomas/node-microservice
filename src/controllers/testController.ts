import { NextFunction, Request, Response } from "express"
const fs = require('fs')

const getUser = async (req: Request, res: Response) => {
  res.status(200).send('OK!')
}

const getError = async (req: Request, res: Response, next: NextFunction) => {
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      console.log(err)
      next(err)
    }
  })
}

export {
  getUser,
  getError
}