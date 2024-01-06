import { useCallback, useEffect, useState } from "react"
import Masonry from 'react-masonry-css'
import { useParams } from "react-router"
import { useSearchParams } from "react-router-dom"
import { apiGetProducts } from "~/apis/product"
import Breadcrumb from "~/components/Breadcrumb/Breadcrumb"
import InputSelect from "~/components/InputSelect/InputSelect"
import ProductItem from "~/components/ProductItem/ProductItem"
import SearchItem from "~/components/SearchItem/SearchItem"
import { sorts } from "~/utils/constants"
import { capitalizedStr } from "~/utils/helpers"

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
  const [sort, setSort] = useState('')

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

    let priceQuery = {}
    if (queries.from && queries.to) {
      priceQuery = {
        $and: [
          {price: {gte: queries.from}},
          {price: {lte: queries.to}}
        ]
      }
      delete queries.price
      delete queries.from
      delete queries.to
    }
   
    if (queries.from) {
      queries.price = {gte: queries.from}
      delete queries.from
    }
    if (queries.to) {
      queries.price = {lte: queries.to}
      delete queries.to
    }


    if (Object.keys(priceQuery).length > 0) {
      fetchProductByCategory({...priceQuery, ...queries, category: capitalizedStr(category), sort})
    } else if (Object.keys(queries).length === 0) {
      fetchProductByCategory({category: capitalizedStr(category), sort})
    } else if (Object.keys(priceQuery).length === 0 && Object.keys(queries).length > 0) {
      fetchProductByCategory({...queries, category: capitalizedStr(category), sort})
    }
  }, [params, sort])

  // useEffect(() => {
  //   navigate({
  //     pathname: `/${category}`,
  //     search: createSearchParams({sort}).toString()
  //   })
  // }, [sort])

  const changeActiveFilter = useCallback((name) => {
    if (activeClick === name) {
      setActiveClick(null)
    } else {
      setActiveClick(name)
    }
  }, [activeClick])

  const changeValue = useCallback((value) => {
    setSort(value)
  }, [sort])

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
        <div className="w-1/5 flex flex-col gap-3">
          <span className="font-semibold text-sm">Sort by</span>
          <div className="w-full">
            <InputSelect changeValue={changeValue} value={sort} options={sorts}/>
          </div>
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
