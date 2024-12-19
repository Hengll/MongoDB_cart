import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, '商品名稱必填'],
    },
    price: {
      type: Number,
      required: [true, '商品價格必填'],
      min: [0, '商品價格格式不正確'],
    },
    category: {
      type: String,
      enum: {
        // 限制欄位只能有陣列內的值
        values: ['遊戲', '音樂', '手機', '衣服'],
        // 錯誤訊息的 {VALUE} 會自動替換成傳入的值
        message: '商品分類錯誤，查無{VALUE}分類',
      },
    },
  },
  {
    // 停用 __v
    versionKey: false,
    // 自動建立 createdAt 和 updatedAt
    timestamps: true,
  },
)

export default model('products', schema)
