import { useEffect, useState } from "react"
import { apiGetCategories } from "~/apis/app"

const Sidebar = () => {

  const [categories, setCategories] = useState(null)

  const fetchCategories = async () => {
    const response = await apiGetCategories()

    if (response?.success) {
      setCategories(response?.object)
    }
      console.log('RESPONSE: ', response)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  console.log('VVVCATE', categories)
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar