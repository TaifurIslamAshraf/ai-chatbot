'use client'

import { TypeAnimation } from "react-type-animation"

const TypingAnim = () => {
  return (
   <div>
     <TypeAnimation
  sequence={[
    // Same substring at the start will only be typed once, initially
    'Make Your Won Character With AI',
    1000,
    'And Chat With Character',
    1000,
    'Have A Fun',
    1000,

  ]}
  speed={50}
  className="text-lg md:text-2xl lg:text-3xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text font-extrabold inline-block"
  repeat={Infinity}
/>
   </div>
  )
}

export default TypingAnim