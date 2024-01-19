import React, { useState } from 'react';
import axios from 'axios';

function PhotoInfo() {

  const [currPhoto, changePhoto] = useState([])
  function getPhotoInfo(){
    axios('/db/art/')
    .then((results) => {

      // console.log(results.data[0])
      changePhoto(results.data[0])
    })
    .catch((err) => console.error(err))
  }
  getPhotoInfo();
  return (
    <div>
      <h1 id="PhotoInfo">{currPhoto.title}</h1>
      <ul>
        <li>Title:{currPhoto.title}</li>
        <li>Artist:{currPhoto.artist}</li>
        <li>Date:{currPhoto.date}</li>
        <li>Culture:{currPhoto.culture}</li>
        <li>Title Again:{currPhoto.title}</li>
      </ul>
    </div>
  );
}

export default PhotoInfo;
