import { useParams } from "react-router"

const DetailProduct = () => {

  const { pid, title } = useParams()

  return (
    <div>
      DetailProduct
    </div>
  )
}

export default DetailProduct
