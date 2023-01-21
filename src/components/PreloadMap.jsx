import React from 'react'
import mp4 from '../assets/video/map.mp4';
import webm from '../assets/video/map.webm';

const PreloadMap = () => {
  return (
    <div aria-hidden="true" className='d-flex flex-column justify-content-center align-items-center h-100'>
        <video width={350} autoPlay="autoplay" muted loop>
            <source src={mp4} type='video/mp4' />
            <source src={webm} type='video/webm' />
        </video>
        <p>Cargando mapa...</p>
    </div>
  )
}

export default PreloadMap