import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getCategoriesAction } from "~/actions/appActions"
import { string_to_slug } from "~/utils/helpers"

const Sidebar = () => {

  const {categories} = useSelector(state => state.appReducer)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategoriesAction())
  }, [])

  return (
    <div className="flex flex-col border">
      {
        categories?.map(el => (
          <NavLink
            key={string_to_slug(el.title)}
            to={string_to_slug(el.title)}
            className={({isActive}) => isActive 
              ? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main' 
              : 'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
          }
          >
            {el.title}
          </NavLink>
        ))
      }
    </div>
  )
}

export default Sidebar