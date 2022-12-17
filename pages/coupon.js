import React, { useEffect, useState } from 'react'
import Header from '../src/components/Header'
import { userAuth } from '../src/firebase/client'
import { useUserData } from '../src/hooks/useStamp'
import { Button, Modal, Box } from '@mui/material'
import RefModal from '../src/components/RefModal'
import CouponCard from '../src/components/CouponCard'
import { NextSeo } from 'next-seo'
import Grid from '@mui/material/Unstable_Grid2'


const Coupon = () => {
  const { userData, getUserData } = useUserData()
  const [open, setOpen] = useState(false)
  const [uid, setUid] = useState()
  
  useEffect(() => {
    userAuth.onAuthStateChanged((user) => {
      if (user){
        setUid(user.uid)
        getUserData(user.uid)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[open])

  const handleClick = (event) => {
    event.preventDefault()
    setOpen(true)
  }

  const handleClose = (event) => {
    event.preventDefault()
    setOpen(false)
  }
  return (
    <>
      <NextSeo 
        title='クーポン'
        description='貯めたスタンプでのっティ無料券を交換できます!'
      />
      <Header />
      <Box sx={{
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-around"}} 
        >
        <h3 >クーポン一覧</h3>
        <Button variant='outlined' onClick={handleClick} sx={{my: 2}}>クーポンを交換する</Button>
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {userData.coupon ? userData.coupon.map((cpn, i) => (
          <Grid key={i} xs={2} sm={4} md={4}>
            <CouponCard title={cpn.name} expiration_date={cpn.expiration_date}/>
          </Grid>
          )): null}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Get-Coupon"
        aria-describedby="Get-Coupon"
      >
        <RefModal stamp={userData.stamp} uid={uid}/>
      </Modal>
    </>
  )
}

export default Coupon