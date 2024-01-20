const axios = require('axios');
// const path = require('path');
require('dotenv').config();

const { APIKEY } = process.env;

// import db exports, or perhaps in route file

// Initial api request for images results with a user-supplied keyword
const getArtImages = (keyword) => axios(
  `https://api.harvardartmuseums.org/image?q=${keyword}&apikey=${APIKEY}&sort=random`,
);
  // .then((data) => data.records)
  // .catch((err) => console.error(err));

// After DB functions are imported, create document for each artwork
/**
  imageid
  alttext
  baseimageurl
*/

// Secondary api request for full object associated with imageid from above image objects
const getArtObj = (imageid) => axios(
  `https://api.harvardartmuseums.org/object?q=images.imageid:${imageid}&apikey=${APIKEY}`,
);
  // .then((data) => data.records)
  // .catch((err) => console.error(err));

//   /**
//     images.baseimageurl
//     images.description
//     century, culture
//     people.displayname
//     people.displaydate
//   */

module.exports = { getArtImages, getArtObj };
