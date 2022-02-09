const { Router } = require("express")
const fs = require('fs')
const router = Router()

router.get('/test', (req, res) => {
  res.json("alksdma")
})

router.get('/error', function (req, res, next) {
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      console.log(err)
      next(err)
    } else {
      res.send(data)
    }
  })
})

export { router }