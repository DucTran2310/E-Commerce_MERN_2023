import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router"
import { apiGetProducts } from "~/apis/product"
import Breadcrumb from "~/components/Breadcrumb/Breadcrumb"
import Masonry from 'react-masonry-css'
import ProductItem from "~/components/ProductItem/ProductItem"
import SearchItem from "~/components/SearchItem/SearchItem"
import { capitalizedStr } from "~/utils/helpers"
import { useSearchParams } from "react-router-dom"

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
}

const Products = () => {

  const { category } = useParams()
  const [params] = useSearchParams()

  const [products, setProducts] = useState(null)
  const [activeClick, setActiveClick] = useState(null)

  const fetchProductByCategory = async (queries) => {
    const response = await apiGetProducts(queries)
    if (!response.error) {
      setProducts(response.object)
    }
  }

  useEffect(() => {
    let param = []
    for (let i of params.entries()) {
      param.push(i)
    }
    const queries = {}
    for (let i of params) {
      queries[i[0]] = i[1]
    }

    console.log('VVVqueries', queries)

    if (Object.keys(queries).length === 0) {
      fetchProductByCategory({category: capitalizedStr(category)})
    } else {
      fetchProductByCategory(queries)
    }
  }, [params])

  const changeActiveFilter = useCallback((name) => {
    if (activeClick === name) {
      setActiveClick(null)
    } else {
      setActiveClick(name)
    }
  }, [activeClick])

  return (
    <div className="w-full">
      <div className="h-[81px] flex items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase"> {category}</h3>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className="w-main border p-4 flex justify-between mt-8 m-auto">
        <div className="w-4/5 flex-auto flex flex-col gap-3">
          <span className="font-semibold text-sm">Filter by</span>
          <div className="flex items-center gap-4">
            <SearchItem
              name='Price'
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
              type='input'
            />
            <SearchItem
              name='Color'
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
            />
          </div>
        </div>
        <div className="w-1/5 flex">
          Sort by
        </div>
      </div>
      <div className="mt-8 w-main m-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex m-[-10px]"
          columnClassName="my-masonry-grid_column"
        >
          {
            products?.map(el => (
              <ProductItem
                key={el._id}
                pid={el.id}
                productData={el}
              />
            ))
          }
        </Masonry>
      </div>
    </div>
  )
}

export default Products
