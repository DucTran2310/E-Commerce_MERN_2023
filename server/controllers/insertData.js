const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const data = require('../../data/products.json')
const categoryData = require('../../data/cate-brand.js')
const ProductCategory = require('../models/productCategory')
const slugify = require('slugify')

const fn = async (product) => {
  await Product.create({
    title: product?.title,
    slug: slugify(product?.title) + Math.round(Math.random() * 100) + '',
    description: product?.description,
    brand: product?.brand,
    // price: Math.round(Number(product?.price?.match(/\d/g).join('')) / 100),
    price: product?.price,
    category: product?.category,
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 1000),
    images: product?.images,
    color: product?.variants?.find(el => el.label === 'Color')?.variants[0],
    thumb: product?.thumb,
    totalRatings: product?.totalRatings
  })
}

const insertProduct = asyncHandler(async (req, res) => {
  const promises = []
  for (let product of data) promises.push(fn(product))
  await Promise.all(promises)
  return res.json('Create done!!!')
})

const fn2 = async (cate) => {
  await ProductCategory.create({
    title: cate?.cate,
    brand: cate?.brand
  })
}

const insertCategory = asyncHandler(async (req, res) => {
  const promises = []
  for (let cate of categoryData) promises.push(fn2(cate))
  await Promise.all(promises)
  return res.json('Create category done!!!')
})

module.exports = {
  insertProduct,
  insertCategory
}