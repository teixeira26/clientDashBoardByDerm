import React from 'react'
import myAnimation from '../programmer.json';
import Lottie from 'lottie-react';

export default function DcPointsGraphic() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center font-semibold'>
      <p className=''>En construcción</p>
    <Lottie
        animationData={myAnimation}
        loop={true}
        autoplay={true}
        style={{ width: '60%', height: '40%', }}
      />
    </div>
  )
}
