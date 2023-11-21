import { memo } from 'react'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'

const SearchItem = (props) => {

  const {
    name,
    activeClick,
    changeActiveFilter
  } = props

  return (
    <div 
      className='p-3 text-gray-500 text-xs gap-6 relative border border-gray-800 flex justify-between items-center cursor-pointer'
      onClick={() => changeActiveFilter(name)}
    >
      <span>{name}</span>
      <KeyboardArrowDownOutlinedIcon />
      {
        activeClick === name && 
        <div className='absolute top-full left-0 w-fit p-4 bg-red-500'>
          content
        </div>
      }
    </div>
  )
}

export default memo(SearchItem)