import { forwardRef } from 'react'
import CouponModal from "./CouponModal"
import StampModal from './StampModal'

// refを渡すためのHOC
const RefStampModal = forwardRef(({flag}, ref) => {
  return <StampModal flag={flag} fref={ref}/>
})
RefStampModal.displayName = 'RefStampModal'
export default RefStampModal