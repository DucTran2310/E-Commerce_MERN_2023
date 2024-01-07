import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { setShowModal } from '~/reducers/appReducer'

const Modal = ({ children }) => {

  const dispatch = useDispatch()

  return (
    <div
      onClick={() => dispatch(setShowModal({ isShowModal: false, modalChildren: null }))}
      className='absolute inset-0 z-50 bg-overlay flex items-center justify-center'
    >
      {children}
    </div>
  )
}

export default memo(Modal)
