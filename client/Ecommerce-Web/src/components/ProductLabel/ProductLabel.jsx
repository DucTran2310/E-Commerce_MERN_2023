
const ProductLabel = (props) => {

  const {isNew} = props

  return (
    <div className="w-full flex items-center justify-end">
      <div className={`${isNew ? 'bg-red-500' : 'bg-blue-500'} text-white px-2 py-1 relative w-[70px] h-[25px] flex items-center justify-center`}>
        <span className="relative z-10 font-semibold font-s text-xs">{isNew ? 'New' : 'Trending'}</span>
        <span className="before:w-[6px] before:h-[6px] before:rounded-[6px] before:bg-white before:absolute before:left-0 before:top-[10px] before:z-10" />
        <span className={`after:w-0 after:h-0 after:border-10 after:border-solid after:border-[10px] 
              after:border-transparent after:border-t-[13px] after:border-b-[12px] after:border-transparent 
              after:content-[''] after:absolute after:top-0 after:right-0 after:left-[-20px] after:text-center 
              after:border-r-[10px] after:border-r-[solid] ${isNew ? 'after:border-r-[#f63b6a]' : 'after:border-r-[#3b82f6]'}`}
        />
      </div>
    </div>
  )
}

export default ProductLabel
