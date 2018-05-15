import React from 'react';

const GMap = (props) => {
  // let mapLink= `https://www.google.com/maps/embed/v1/place?key=AIzaSyDfVc7Wl0xQOdHnSm30Yk2lZtcBTPEZtjM&q=place_id:${props.id}`;
  let mapLink= `https://www.google.com/maps/embed/v1/place?key=AIzaSyDfVc7Wl0xQOdHnSm30Yk2lZtcBTPEZtjM&q=place_id:ChIJcUlD0eOAhYARucGJj8eN9I8`;
  
  return (
    
    <div className="staticMap">
      <iframe
        frameBorder="0" 
        style={{border: 0}}
        src={mapLink}
        allowFullScreen
        
      >
      </iframe>
    </div>
  )
}

export default GMap;
window.GMap = GMap;