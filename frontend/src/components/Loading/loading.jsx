import React from 'react'
import Lottie, {useLottie} from 'lottie-react';
import animationData from '../../assets/animation/loading.json'
function Loading() {
    let animation = useLottie({animationData: animationData, loop: true, autoPlay: false});
  return (
    <div className='w-[120px] h-[120px] flex items-center justify-center'>
        <div className='w-full h-full'>{animation.View}</div>
    </div>
  )
}

export default Loading;