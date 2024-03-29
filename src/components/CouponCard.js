import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const CouponCard = ({ title, expiration_date, handleCouponClick, index }) => {
  const date = new Date(expiration_date.seconds*1000)
  const year = date.getFullYear()
  const month =  date.getMonth()
  const day = date.getDate()

  return (
    <Card sx={{
      bgcolor: "#FFC000",
    }}
      component="button"
      onClick={() => handleCouponClick(index)}
      >
      <CardContent>
        <Typography gutterBottom variant='h6' fontWeight="bold">{title}</Typography>
      </CardContent>
      <CardMedia 
        component="img"
        height={140}
        image={'/images/notty-card-2.png'}
        alt='Notty card image'
      />
      <CardContent>
        <Typography sx={{
          display: 'flex',
          justifyContent: 'end'
        }}>
        {`有効期限: ${year}/${month}/${day}`}
        </Typography>
      </CardContent>
    </Card>
  )
}
export default CouponCard