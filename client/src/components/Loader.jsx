import React from 'react'
import { ReactComponent as LoaderSvg } from '../assets/img/loader.svg';

const Loader = ({title}) => {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <LoaderSvg className="w-32 h-32 object-contain" />
    {/* <img src={loader} alt="loader" className="w-32 h-32 object-contain" /> */}
    <h1 className="font-bold text-2xl text-white mt-2">{title || 'Loading'}</h1>
  </div>
  )
}

export default Loader