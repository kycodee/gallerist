import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import GalleryListItem from './GalleryListItem';

function PalGallery() {
  const { user } = useParams();
  // use useState to define an images array and method to store and update gallery images
  // use useState to define a user array and set the values on the array
  const [images, setImages] = useState([]);

  // use an axios request to get a list of filtered images from art db based on friends or some key
  // pass in a word to filter by, possibly a friend's username
  const getFilteredImages = useCallback(
    (filter) => {
      axios(`/db/art/${filter}`)
        .then((art) => {
          setImages(art.data);
        })
        .catch((err) => console.log('get filtered images failed', err));
    },
    [images],
  );

  // put the initial db request into useEffect to auto render images when you get to page
  useEffect(() => {
    getFilteredImages(user);
  }, []);

  return (
    <Container>
      <Row>
        <Col md={10}>
          <h1><strong>{`${user}'s Gallery`}</strong></h1>
        </Col>
      </Row>
      <Row>
        {images.map((image) => (
          <Col>
            <GalleryListItem
              image={image}
              key={`${image.imageId}-${image.date}`}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PalGallery;
