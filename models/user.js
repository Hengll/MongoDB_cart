import { Schema, model, ObjectId } from 'mongoose'

const cartSchema = new Schema({
  product: {
    // mongoDB 的 id
    type: ObjectId,
    // id 來源是 products
    ref: 'products',
    require: [true, '購物車商品 ID 必填'],
  },
  quantity: {
    type: Number,
    require: [true, '購物車商品數量必填'],
  },
})

const schema = new Schema(
  {
    account: {
      type: String,
      required: [true, '帳號必填'],
      unique: true,
    },
    cart: {
      type: [cartSchema],
    },
  },
  {
    // 停用 __v
    versionKey: false,
  },
)

export default model('users', schema)
