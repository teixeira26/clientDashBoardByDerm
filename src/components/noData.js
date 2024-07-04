import React from 'react'
import myAnimation from '../grafic.json';
import Lottie from 'lottie-react';

export default function NoData() {
  return (
    <div className='w-[calc(100vw-64px)] md:w-full md:h-full flex flex-col justify-center items-center font-semibold'>
    <p className='text-center mr-[8px]'>Tadavia no hay Información relacionada con este periodo.</p>
    <div className='mt-0 md:mt-[-100px] flex justify-center items-center'>
    <Lottie
      animationData={myAnimation}
      loop={true}
      autoplay={true}
      style={{ width: '60%', height: '40%', }}
    />
    </div>

  </div>
  )
}
