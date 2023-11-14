import useBreadcrumbs from 'use-react-router-breadcrumbs'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import { Link } from 'react-router-dom'

const Breadcrumb = (props) => {

  const {title, category} = props

  const routes = [
    {path: "/:category", breadcrumb: category},
    {path: "/", breadcrumb: "Home"},
    {path: "/:category/:pid/:title", breadcrumb: title}
  ]

  const breadcrumb = useBreadcrumbs(routes)
 
  return (
    <div className='text-sm flex items-center gap-1'>
      {
        breadcrumb?.filter(el => !el.match.route === false)?.map(({match, breadcrumb}, index, self) => (
          <Link key={match.pathname} to={match.pathname}
            className='flex items-center gap-1 hover:text-main'
          >
            <span className='capitalize'>{breadcrumb}</span>
          {
            index !== self.length - 1 && <ChevronRightOutlinedIcon />
          }
          </Link>
        ))
      }
    </div>
  )
}

export default Breadcrumb
