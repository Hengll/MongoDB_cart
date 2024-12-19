import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import routerProduct from './routes/products.js'
import routerUser from './routes/user.js'

mongoose
  .connect(process.env.BD_URL)
  .then(() => {
    console.log('資料庫連線成功')
  })
  .catch((err) => {
    console.log(err)
    console.log('資料庫連線失敗')
  })

const app = express()

app.use(express.json())
// 處理 express.json() 的錯誤，可能是 json 格式不對
// 處理 middleware 的錯誤 function 必須要直接放在下面，且要有四個參數
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: '資料格式錯誤',
  })
})

app.use('/product', routerProduct)
app.use('/user', routerUser)

app.listen(4000, () => {
  console.log('伺服器啟動')
})
