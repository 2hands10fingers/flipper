import React from 'react';

export default function Image({image, title}) {

  return (
  <div className="card--pic-container">
    <img src={image} alt={title} className="card--img" />
  </div>
  )
}