import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect } from 'react'

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100vw - 20px)',
  minWidth: "300px",
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const SuccessMotion = () => {
  return(
    <div id="successAnime" className="animated image" style={{display: 'flex',flexDirection: 'column', justfiContent: 'center'}}>
      <Typography
        variant='h4'
        sx={{
          fontWeight: "bold",
          color: "#f44336"
        }}
      >
        成功！
      </Typography>
      <Image src="/images/icon-removebg-preview.png" alt="スタンプ獲得" width="200px" height="200px"/>
    </div>
  )  
}

const FailureMotion = () => {
  return (
    <div id='failureAnime' className="animated-failure failure">
      <Typography
      variant='h5'
      sx={{
        color: "#2196f3"
      }}
      >
        失敗しました……
      </Typography>
      <Image src="/images/notty_c_bg.png" alt="スタンプ獲得 失敗" width="155px" height="200px" />
    </div>
  )
}

const StampModal = ({ flag, fref }) => {
  return (
    <Box ref={fref} tabIndex={0} sx={style}>
      {flag ? <SuccessMotion /> : <FailureMotion />}
    </Box>
  )
}

export default StampModal