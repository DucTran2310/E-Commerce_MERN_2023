import { memo, useEffect, useState } from 'react'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { colors } from '~/utils/constants'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { apiGetProducts } from '~/apis/product'
import { formatMoney } from '~/utils/helpers'

const SearchItem = (props) => {

  const {
    name,
    activeClick,
    changeActiveFilter,
    type = 'checkbox'
  } = props

  const navigate = useNavigate()
  const { category } = useParams()

  const [selected, setSelected] = useState([])
  const [bestPrice, setBestPrice] = useState(null)
  const [price, setPrice] = useState([0, 0])

  useEffect(() => {
    if (selected.length > 0) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: selected.join(',')
        }).toString()
      })
    } else {
      navigate(`/${category}`)
    }
  }, [selected])

  const fetchBestPriceProduct = async () => {
    const response = await apiGetProducts({ sort: '-price', limit: 1 })
    if (!response.error) {
      setBestPrice(formatMoney(response.object[0]?.price))
    }
  }

  useEffect(() => {
    if (type === 'input') fetchBestPriceProduct()
  }, [type])

  useEffect(() => {
    // const validPrice = price.filter(el => +el > 0)

    // if (price[0] > 0) {
    //   navigate({
    //     pathname: `/${category}`,
    //     search: createSearchParams(price).toString()
    //   })
    // } else {
    //   navigate(`/${category}`)
    // }
  }, [price])

  const handleSelect = (e) => {
    const alreadyEl = selected.find(el => el === e.target.value)
    if (alreadyEl) {
      setSelected(prev => prev.filter(el => el !== e.target.value))
    } else {
      setSelected(prev => [...prev, e.target.value])
    }
    changeActiveFilter(null)
  }

  return (
    <div
      className='p-3 text-gray-500 text-xs gap-6 relative border border-gray-800 flex justify-between items-center cursor-pointer z-10'
      onClick={() => changeActiveFilter(name)}
    >
      <span className='capitalize'>{name}</span>
      <KeyboardArrowDownOutlinedIcon />
      {
        activeClick === name &&
        <div className='absolute top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[150px]'>
          {
            type === 'checkbox' &&
            <div className=''>
              <div className='p-4 items-center flex justify-between gap-8 border-b'>
                <span className='whitespace-nowrap'>{`${selected.length} selected`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelected([])
                  }}
                  className='underline cursor-pointer hover:text-main'
                >
                  Reset
                </span>
              </div>
              <div onClick={(e) => e.stopPropagation()} className='flex flex-col gap-3 mt-4'>
                {
                  colors.map((el, index) => (
                    <div key={index} className='flex items-center gap-4'>
                      <input
                        type='checkbox'
                        name={el}
                        className='form-checkbox'
                        value={el}
                        id={el}
                        onChange={handleSelect}
                        checked={selected.some(selectedItem => selectedItem === el)}
                      />
                      <label htmlFor={el} className='capitalize text-gray-700'>{el}</label>
                    </div>
                  ))
                }
              </div>
            </div>
          }
          {
            type === 'input' &&
            <div onClick={e => e.stopPropagation()} >
              <div className='p-4 items-center flex justify-between gap-8 border-b'>
                <span className='whitespace-nowrap'>
                  {`The highest price is ${bestPrice} VND`}
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelected([])
                  }}
                  className='underline cursor-pointer hover:text-main'
                >
                  Reset
                </span>
              </div>
              <div className='flex items-center p-2 gap-2'>
                <div className='flex items-center gap-2'>
                  <label htmlFor='from'>From</label>
                  <input
                    className='form-input'
                    type='number'
                    id='from'
                    value={price[0]}
                    onChange={e => setPrice(prev => prev.map((el, index) => index === 0 ? e.target.value : el))}
                  />
                </div>
                <div className='flex items-center gap-2'>
                  <label htmlFor='from'>To</label>
                  <input
                    className='form-input'
                    type='number'
                    id='to'
                    value={price[1]}
                    onChange={e => setPrice(prev => prev.map((el, index) => index === 1 ? e.target.value : el))}
                  />
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default memo(SearchItem)