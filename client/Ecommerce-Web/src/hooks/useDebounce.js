import { useEffect, useState } from "react"

const useDebounce = (value, ms) => {

  const [debounceValue, setDebounceValue] = useState('')

  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      setDebounceValue(value)
    }, ms)

    return () => {
      clearTimeout(setTimeOutId)
    }

  }, [value, ms])

  return debounceValue
}

export default useDebounce

// Khi mà nhập thay đổi giá thì sẽ gọi API
// Vấn đề: gọi API liên tục theo mỗi lượt nhập
// resolve: chỉ call API khi mà người dùng nhập xong
// Thời gian onChange

// Tách price thành 2 phần
// 1. biến để phục vụ UI, gõ tới đâu thì lưu tới đó => UI render
// 2. biến dùng call API => setTimeout => biến sẽ gán sau 1 khoảng thời gian

