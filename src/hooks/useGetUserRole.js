import React, { useEffect, useState } from 'react'

export default function useGetUserRole() {
    const [userInfo, setUserInfo] = useState()

    useEffect(()=>{
        console.log(localStorage.getItem('user'))
    },[])
  return (
    [userInfo, setUserInfo]
  )
}
