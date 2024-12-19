import Product from '../models/product.js'
import { StatusCodes } from 'http-status-codes'

export const create = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(StatusCodes.BAD_REQUEST).json({
      success: true,
      message: '',
      result: product,
    })
  } catch (err) {
    console.log(err)

    if (err.name === 'ValidationError') {
      const key = Object.keys(err.errors)[0]
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: err.errors[key].message,
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤',
      })
    }
  }
}

export const get = async (req, res) => {
  try {
    // category == 音樂 && price = 1900
    // const products = await Product.find({
    //   category: '音樂',
    //   price: 1900,
    // })

    // category == 音樂 && price >= 1000
    // const products = await Product.find({
    //   category: '音樂',
    //   price: {
    //     $gte: 1000,
    //   },
    // })

    // category == 音樂 || price >= 1000
    // const products = await Product.find({
    //   $or: [
    //     { category: '音樂' },
    //     {
    //       price: {
    //         $gte: 1000,
    //       },
    //     },
    //   ],
    // })

    // 搜尋 name 有包含 iPhone 不分大小寫
    // const products = await Product.find({
    //   name: /iPhone/i,
    // })

    // .sort({ 欄位: 順序 })
    // 1 = 小到大
    // -1 = 大到小
    // .limit() 限制資料筆數
    // .skip() 跳過幾筆資料
    // const products = await Product.find().sort({ price: -1 }).limit(2).skip(3)
    console.log(req.query)
    const products = await Product.find().sort({
      // 以變數做物件的 key 使用 []
      [req.query.sortBy || 'createdAt']: req.query.sort * 1 || 1,
    })

    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: products,
    })
  } catch (err) {
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤',
    })
  }
}
