import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import GalleryListItem from './GalleryListItem';

function Gallery() {
  // use useState to define an images array and method to store and update gallery images
  // use useState to define a user array and set the values on the array
  const [images, setImages] = useState([]);
  const [usersArray, setUsersArray] = useState([]);
  // send a request to get all users in the db
  const getAllUsers = () => {
    axios('/db/users/')
      .then((users) => {
        setUsersArray(users.data);
      })
      .catch((err) => console.log(err));
  };
  // use an axios request to get the 25? most recent saved images from art db
  const get25RecentImages = () => {
    axios('/db/art')
      .then((art) => {
        // console.log(art);
        setImages(art.data);
      })
      .catch((err) => console.log(err));
  };
  // use an axios request to get a list of filtered images from art db based on friends or some key
  // pass in a word to filter by, possibly a friend's username
  const getFilteredImages = (filter) => {
    axios(`/db/art/${filter}`)
      .then((art) => {
        setImages(art.data);
      })
      .catch((err) => console.log('get filtered images failed', err));
  };
  // put the initial db request into useEffect to auto render images when you get to page
  useEffect(() => {
    get25RecentImages();
    getAllUsers();
  }, []);
  // added temporary hardcoded option for Artie McBuyer for dropdown list to test
  return (
    <Container>
      <Row>
        <Col md={10}>
          <h1><strong>Gallery</strong></h1>
        </Col>
        <Col md="auto">
          <div className="users">
            <h3 className="section-header text-center">Users</h3>
            <Form.Select onChange={(e) => getFilteredImages(e.target.value)}>
              <option value="" key="54321">All</option>
              {
          usersArray.map((user, i) => (
            <option
              value={user.name}
              key={`${user.googleId}-${i}`}
            >
              {user.name}
            </option>
          ))
        }
            </Form.Select>
          </div>
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

export default Gallery;
