const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  numberViews: {
    type: Number,
    default: 0
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  ],
  dislikes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  ],
  images: {
    type: String,
    default: 'https://www.searchenginejournal.com/wp-content/uploads/2020/08/7-ways-a-blog-can-help-your-business-right-now-5f3c06b9eb24e-760x400.webp'
  },
  author: {
    type: String,
    default: 'Admin'
  }
}, {
  timestamps: true,
  // hàm chạy những thuộc tính chưa có trong Schema, nó chỉ chạy khi gọi hàm JSON
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);