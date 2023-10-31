import { useParams } from "react-router"

const DetailProduct = () => {

  const { pid, title } = useParams()
  console.log('VVVPID: ', pid, title)

  return (
    <div>
      DetailProduct
    </div>
  )
}

export default DetailProduct
