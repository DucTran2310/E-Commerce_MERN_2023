import { useEffect, useState, memo } from "react"
import { AiFillStar, AiOutlineMenu } from "react-icons/ai"
import { apiGetProducts } from "~/apis/product"
import ProductRating from "../ProductRating/ProductRating"
import { formatMoney, secondsToHms } from "~/utils/helpers"
import CountDown from "../CountDown/CountDown"
import moment from "moment"
import { useDispatch } from "react-redux"
import { endLoadingCom, loadingCom } from "~/reducers/loadingReducer"

let idInterval

const DealDaily = () => {

  const dispatch = useDispatch()

  const [dealDaily, setDealDaily] = useState(null)
  const [second, setSecond] = useState(0)
  const [minute, setMinute] = useState(0)
  const [hour, setHour] = useState(0)
  const [expireTime, setExpireTime] = useState(false)

  const fetchDealDaily = async () => {
    dispatch(loadingCom())
    const response = await apiGetProducts({ limit: 1, page: Math.round(Math.random() * 10), totalRatings: 5 })
    if (!response.error) {
      setDealDaily(response.object[0])

      const today = `${moment().format('MM/DD/YYYY')} 7:00:00`
      const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000
      const number = secondsToHms(seconds)
      setHour(number.h)
      setMinute(number.m)
      setSecond(number.s)
    } else {
      setHour(0)
      setMinute(59)
      setSecond(59)
    }
    dispatch(endLoadingCom())
  }

  useEffect(() => {
    idInterval && clearInterval(idInterval)
    fetchDealDaily()
  }, [expireTime])

  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setSecond(prev => prev - 1)
      else {
        if (minute > 0) {
          setMinute(prev => prev - 1)
          setSecond(60)
        } else {
          if (hour > 0) {
            setHour(prev => prev - 1)
            setMinute(59)
            setSecond(59)
          } else {
            setExpireTime(!expireTime)
          }
        }
      }
    }, 1000)
    return () => {
      clearInterval(idInterval)
    }
  }, [second, minute, hour, expireTime])

  return (

    dealDaily !== null ?
      <div className="border w-full flex-auto">
        <div className="flex items-center justify-between p-4 w-full">
          <span className="flex-1 flex justify-normal"><AiFillStar size={20} color="#DD1111" /></span>
          <span className="flex-8 font-semibold text-[20px] flex justify-center text-gray-700">DEAL DAILY</span>
          <span className="flex-1"></span>
        </div>
        <div className="w-full flex flex-col items-center pt-8 px-4 gap-2">
          <img
            src={dealDaily?.thumb || ''}
            alt=""
            className="w-full object-contain"
          />
          <span className="line-clamp-1 text-center">{dealDaily?.title}</span>
          <span className="flex h-4"><ProductRating rating={dealDaily?.totalRatings} size={'medium'} /></span>
          <span className="mt-4">{`${formatMoney(dealDaily?.price)} VND`}</span>
        </div>
        <div className="px-4 mt-4">
          <div className="flex justify-center gap-2 items-center mb-4">
            <CountDown unit={'Hour'} number={hour} />
            <CountDown unit={'Minutes'} number={minute} />
            <CountDown unit={'Seconds'} number={second} />
          </div>
          <button
            type="button"
            className="flex gap-2 items-center justify-center w-full bg-main 
            hover:bg-gray-800 text-white font-medium py-2"
          >
            <AiOutlineMenu />
            <span>Options</span>
          </button>
        </div>
      </div>
      : ''

  )
}

export default memo(DealDaily)
