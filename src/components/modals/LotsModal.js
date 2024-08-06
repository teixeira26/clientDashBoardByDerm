import React, { useEffect, useState } from 'react'
import ModalCloseButton from '../Buttons/ModalCloseButton'
import { BACKEND_URL } from '../../constants/constants'

const LotsModal = ({setExpandModal, product}) => {
  const {id} = product

  const [lots, setLots] = useState([])


  useEffect(() => {
    const fetchLots = async () => {
      const res = await fetch(`${BACKEND_URL}/lots/getAll/${id}`)
      const data = await res.json()
      setLots(data)
    }

    fetchLots()
  }, [])

  console.log(lots)

  

  return (
    <div className="absolute w-full h-screen left-0 top-0 flex justify-center items-center">
			<div className="bg-[#00000070] w-full h-full fixed left-0 top-0 z-[1000]" onClick={() => setExpandModal(false)} ></div>

            <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[500px] h-[500px] bg-white rounded-lg z-[1000] p-4">
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <div className='w-full flex justify-end'><ModalCloseButton onClick={setExpandModal}/></div>
                  <div className="w-full h-full flex justify-center items-center">
                    { lots.map((lot, index) => (
                      <div key={index} className="bg-orange-500 rounded-lg m-4">
                        <p className="text-white p-4">Lot ID: {lot.LotId}</p>

                      </div>
                    ))}
                  </div>
                </div>
            </div>
		</div>
  )
}

export default LotsModal