import React, { useContext } from 'react'
import Skeleton from 'react-loading-skeleton';
import { dcPointsGraphicContext } from '../../contexts/dcPointsContext';

export default function DcPointsList({title, list}) {
    const {setDashboardStep} = useContext(dcPointsGraphicContext)
  return (
    <div
    className=" overflow-y-scroll w-full rounded-[4px] max-h-[60vh] flex justify-start gap-2 flex-col shadow pb-5 styledScrollBar"
    id="right-box"
  >
    <div className='flex justify-between items-center pr-4'>
    <p className="font-semibold leading-none tracking-tight px-6 pt-6 pb-6">
      {title}
    </p>
    <div className='cursor-pointer hover:bg-[#00000025]' onClick={()=>setDashboardStep(0)}>
    <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 4V7C15 8.10457 15.8954 9 17 9H20M9 4V7C9 8.10457 8.10457 9 7 9H4M15 20V17C15 15.8954 15.8954 15 17 15H20M9 20V17C9 15.8954 8.10457 15 7 15H4"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
    </div>
    
    </div>
    <hr />
    {list ? (
      <div className="px-6">
        {list.map((x, index) => {
          return (
            <div className="" key={index}>
              <div className="grid grid-cols-6 pt-6 pb-2 gap-4">
               
              <p className={`font-semibold leading-none tracking-tight  ${index === 0 && 'text-green-600 font-bold'} ${index === 1 && 'text-orange-600 font-bold'} ${index === 2 && 'text-gray-600 font-bold'}`}>
                  {index+1}º
                </p>
                <p className="font-semibold leading-none tracking-tight  col-span-3">
                  {x.item}
                </p>
                <p className="font-semibold leading-none tracking-tight">
                  {x.totalCantidad}
                </p>
                <p className={`font-semibold leading-none tracking-tight ${x.totalMesAnterior > x.totalCantidad && 'text-red-500'} ${x.totalMesAnterior < x.totalCantidad && x.totalMesAnterior !== 0 && 'text-green-500'}`}>
                  {x.totalMesAnterior === 0 ? '-' : `${x.totalMesAnterior > x.totalCantidad? '-' : '+'}${ Math.ceil((x.totalMesAnterior * 100) / x.totalCantidad)}%`}
                </p>
              </div>

              <p>{x.comentarios}</p>
             
            </div>
          );
        })}
      </div>
    ) : (
      <div className="px-4 w-100% pb-4">
        <Skeleton width={"100%"} height={"60vh"}></Skeleton>
      </div>
    )}
  </div>

  )
}
