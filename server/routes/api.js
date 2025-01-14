const express = require('express');

const { getArtImages, getArtObj } = require('../api/huam');

const apiRouter = express.Router();

// Should be used for initial keyword search to return array of art image objects.
// If more information needed,
// Use following route for more detailed art object search by 'imageid' property
apiRouter.get('/huam/image/:keyword', (req, res) => {
  const { keyword } = req.params;

  getArtImages(keyword)
    .then((response) => {
      if (response.data.records.length) {
        res.status(200).send(response.data.records);
      } else {
        console.log(`No images found by search word(s) '${keyword}'`);
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error('Cannot get images by keyword: ', err);
      res.sendStatus(500);
    });
});
// temporary comments to test out new repo
// Should be used to get more detailed information about an image in the above array
// Search by 'imageid' property that will be present on above image object
apiRouter.get('/huam/object/:id', (req, res) => {
  const { id } = req.params;

  getArtObj(id)
    .then((response) => {
      if (response.data.records.length) {
        res.status(200).send(response.data.records);
      } else {
        console.log(`No image found with id ${id}`);
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error('Cannot get ArtObj by id: ', err);
      res.sendStatus(500);
    });
});

module.exports = { apiRouter };
