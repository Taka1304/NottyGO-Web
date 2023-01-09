import React, { useEffect, useState } from 'react'
import Header from '../src/components/Layout/Header'
import { userAuth } from '../src/firebase/client'
import { useUserData } from '../src/hooks/useStamp'
import { Button, Modal, Box, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Alert } from '@mui/material'
import RefModal from '../src/components/Modal/RefModal'
import CouponCard from '../src/components/CouponCard'
import { NextSeo } from 'next-seo'
import Grid from '@mui/material/Unstable_Grid2'
import { useCouponData } from '../src/hooks/useCoupon'


const Coupon = () => {
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [uid, setUid] = useState()
  const [cardIndex, setCardIndex] = useState(0)

  const { userData, getUserData } = useUserData()
  const { success, error, useCoupon, resetState } = useCouponData()

  useEffect(() => {
    userAuth.onAuthStateChanged((user) => {
      if (user){
        setUid(user.uid)
        getUserData(user.uid)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[open, dialogOpen])

  const handleClick = (event) => {
    event.preventDefault()
    setOpen(true)
  }

  const handleClose = (event) => {
    event.preventDefault()
    setOpen(false)
  }

  const handleCouponClick = (index) => {
    setCardIndex(index)
    setDialogOpen(true)
  }

  const handleSubmit = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCoupon(uid, userData.coupon[cardIndex])
    setTimeout(() => {
      setDialogOpen(false)
      resetState()
    },1500)
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
      {/* クーポン交換のモーダル */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Get-Coupon"
        aria-describedby="Get-Coupon"
      >
        <RefModal stamp={userData.stamp} uid={uid}/>
      </Modal>
      {/* クーポン一覧が並ぶところ */}
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 16 }} sx={{maxWidth: "100vw", margin: 0}}>
        {userData.coupon ? userData.coupon.map((cpn, i) => (
          <Grid key={i} xs={2} sm={4} md={4}>
            <CouponCard 
            title={cpn.name} 
            expiration_date={cpn.expiration_date}
            handleCouponClick={handleCouponClick}
            index={i}
            />
          </Grid>
          )): null}
      </Grid>
      {/* クーポンクリック時のダイアログ */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          現在は使用できません。
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            試作段階のため、実際には利用できません。ご了承ください。<br />
            使用する を押すとクーポンは無くなります。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>キャンセル</Button>
          <Button onClick={handleSubmit} autoFocus>使用する
          </Button>
        </DialogActions>
        {success && !error && <Alert severity='success'>使用しました!</Alert>}
        {error && !success && <Alert severity='error'>エラーが発生しました</Alert>}
      </Dialog>
    </>
  )
}

export default Coupon