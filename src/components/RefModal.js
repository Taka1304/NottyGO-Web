import { forwardRef } from 'react'
import CouponModal from "./CouponModal"

// refを渡すためのHOC
const RefModal = forwardRef(({stamp, uid}, ref) => {
  return <CouponModal stamp={stamp} uid={uid} fref={ref} />
})
RefModal.displayName = 'RefModal'
export default RefModal