import { memo, useEffect, useRef } from 'react'
import logo from '@assets/images/logo.png'
import { voteOptions } from '~/utils/constants'
import { AiFillStar } from 'react-icons/ai'
import { Button } from '@mui/material'

const VoteOption = ({ nameProduct }) => {

  const modalRef = useRef()

  useEffect(() => {
    modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [])

  return (
    <div
      onClick={e => e.stopPropagation()}
      ref={modalRef}
      className='bg-white w-[700px] flex-col p-4 gap-4 flex items-center justify-center'
    >
      <img src={logo} alt='logo' className='w-[300px] my-8 object-contain' />
      <h2 className='text-center text-medium text-lg'>{`Voting product ${nameProduct}`}</h2>
      <textarea
        className='form-textarea w-full placeholder:italic placeholder:text-xs placeholder:text-gray-500 text-sm'
        placeholder='Type something'
      />
      <div className='w-full flex flex-col gap-4'>
        <p>How do you like this product?</p>
        <div className='flex justify-center gap-4 items-center'>
          {
            voteOptions.map(el => (
              <div key={el.id}
                className='w-[1000px] bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md p-4 h-[100px] flex items-center justify-center flex-col gap-2'>
                <div className='flex items-center justify-center'>
                  <span>{`${el.id}`}</span>
                  <AiFillStar color='gray' />
                </div>
                <span>{el.text}</span>
              </div>
            ))
          }
        </div>
      </div>
      <Button variant='contained'>Submit</Button>
    </div>
  )
}

export default memo(VoteOption)
