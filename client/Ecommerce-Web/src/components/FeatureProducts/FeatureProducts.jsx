import { useEffect, useState } from "react"
import { apiGetProducts } from "~/apis/product"
import ProductCard from "../ProductCard/ProductCard"
import feature1 from '~/assets/images/feature1.png'
import feature2 from '~/assets/images/feature2.png'
import feature3 from '~/assets/images/feature3.png'
import feature4 from '~/assets/images/feature4.png'

const FeatureProducts = () => {

  const [products, setProducts] = useState(null)

  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 9, totalRatings: 5 })
    if (!response.error) setProducts(response.object)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="w-full">
      <h3
        className="text-[20px] font-semibold py-[15px] border-b-2 border-main"
      >
        FEATURED PRODUCTS
      </h3>
      <div className="flex flex-wrap mt-[15px] mx-[-10px]">
        {
          products?.map(el => (
            <ProductCard
              key={el._id}
              image={el.thumb}
              title={el.title}
              totalRatings={el.totalRatings}
              price={el.price}
            />
          ))
        }
      </div>
      <div className="flex justify-between">
        <img
          src={feature1}
          alt="feature"
          className="w-[50%] object-contain"
        />
        <div className="flex flex-col justify-between gap-4 w-[24%]">
          <img
            src={feature2}
            alt="feature"
          />
          <img
            src={feature3}
            alt="feature"
          />
        </div>
        <img
          src={feature4}
          alt="feature"
          className="w-[24%] object-contain"
        />
      </div>
    </div>
  )
}

export default FeatureProducts
