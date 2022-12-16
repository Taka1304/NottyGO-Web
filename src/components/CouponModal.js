import React,{ useEffect, useState } from 'react'
import { Alert, TextField, Button, Box, Typography } from '@mui/material'
import styled from 'styled-components'
import { useCoupon } from '../hooks/useCoupon'


const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100vw - 10px)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const InputField = styled.div`
  display: flex;
  flex-direction: row;
`

const CouponModal = ({stamp, uid, fref}) => {

  const [count, setCount] = useState(0)
  const [nowStamp, setNowStamp] = useState(stamp)
  const { success, error, getCoupon } = useCoupon()

  const handleClick = (value, e) => {
    e.preventDefault()
    if (count+value >= 0 && count+value <= stamp / 7){
      setCount(count + value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (count === 0) {
      window.alert("交換する数を入力してください")
      return
    }
      getCoupon(uid, count)
    if (success) setNowStamp(nowStamp - 7*count)
  }

  isNaN(count) ? setCount(0) : null
  
  useEffect(() => {
    setNowStamp(stamp)
  },[stamp])

  return (
    <Box sx={style} ref={fref} tabIndex={0}>
      <Typography variant='h4' sx={{justifyContent: "center", color: "black", display: "flex", }}>クーポン交換</Typography>
      {<Typography sx={{color: "black"}}>現在スタンプを{nowStamp}個持っています</Typography>}
      <Typography sx={{color: "black"}}>スタンプ7個でバス無料券を1つ交換できます</Typography>
      {nowStamp < 7 ? <Alert severity='error'>スタンプが不足しています</Alert>:
      <div>
        <InputField>
          <Button variant='outlined' onClick={(e) => handleClick(-1, e)}>-1</Button>
          <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={count}
            onChange={(e) => setCount(Math.min(Number(e.target.value),Math.floor(stamp / 7)))}/>
          <Button variant='outlined' onClick={(e) => handleClick(1, e)}>+1</Button>
        </InputField>
        <Button variant='contained' color="success" onClick={handleSubmit} sx={{mt: 2, justifyContent: "center"}}>交換する</Button>
        {success && !error ? <Alert severity='success'>クーポンを交換しました!</Alert>: null}
        {error && !success ? <Alert severity='error'>交換に失敗しました。時間を置いて再度お試しください。</Alert>: null}
      </div>}
    </Box>
  )
}

export default CouponModal