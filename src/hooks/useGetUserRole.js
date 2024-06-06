import React, { useEffect, useState } from 'react'

export default function useGetUserRole() {
    const [userInfo, setUserInfo] = useState()

    useEffect(()=>{
        setUserInfo(localStorage.getItem('user'))
    },[])
  return (
    userInfo
  )
}
