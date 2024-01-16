import React, { useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

// '/huam/object/:imageid' --For detailed object about image
// '/huam/image/:keyword' --For an array of images

function Search() {
  const [search, setSearch] = useState('');
  // state images array
  const [images, setImages] = useState([]);

  // axios post request to user's gallery
  function postToGallery(artObj) {
    axios.post('/db/art', {
      "art": {
        "title": artObj.title,
        "artist": artObj.people[0].displayname,
        "date": artObj.dated,
        "culture": artObj.culture,
        "imageId": artObj.id,
        "url": artObj.url,
        "imageUrl": artObj.images[0].baseimageurl,
        "isForSale": false, 
        "price": 0,
      }
    }).then(() => {
      console.log('succesfully posted to db');
      // redirect to gallery?
    })
      .catch((err) => {
        console.error('Could not post to gallery ', err);
      });
  }

  function keywordSearch(term) {
    axios(`/huam/image/${term}`)
      .then((response) => {
        // console.log('images: ', response.data);
        setImages(response.data);
      })
      .catch((err) => console.error(err));
  }

  // onClick will call idSearch
  function idSearch(id) {
    axios(`/huam/object/${id}`)
      .then(({ data }) => postToGallery(data[0]))
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          // console.log('keyword: ', search);
          keywordSearch(search);
        }}
      >
        Search by Keyword
      </button>
      <button
        type="button"
        onClick={() => {
          // console.log('imageid: ', search);
          idSearch(search);
        }}
      >
        Search by imageid
      </button>
      <ul>
        {
          images.map((image) => (
            <li
              key={image.id}
            >
              <img
                style={{ width: '250px', height: 'auto' }}
                src={image.baseimageurl}
                id={image.id}
                alt={image.alttext}
              />
              <button
                type="submit"
                onClick={() => idSearch(image.id)}
              >
                ❤️
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Search;
