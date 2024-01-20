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
  // use useState to define a user array of cultures to sort by
  const [images, setImages] = useState([]);
  const [usersArray, setUsersArray] = useState([]);
  const [cultures, setCulturesArray] = useState([]);
  const [currUser, setCurrUser] = useState('');
  // add in a curr user to state for accessing user in culture/user sort
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
        const newCults = art.data.reduce((acc, curr) => {
          if (!acc.includes(curr.culture)) {
            acc.push(curr.culture);
          }
          return acc;
        }, []);
        setImages(art.data);
        setCulturesArray(newCults);
      })
      .catch((err) => console.log(err));
  };
  // use an axios request to get a list of filtered images from art db based on user
  const getFilteredImages = (filter) => {
    setCurrUser(filter);
    axios(`/db/art/${filter}`)
      .then((art) => {
        setImages(art.data);
      })
      .catch((err) => console.log('get filtered images failed', err));
  };
  // send a request to filter by culture
  const getImagesByCulture = (filter) => {
    if (!filter) {
      get25RecentImages();
    } else {
      axios(`/db/culture/${filter}`)
        .then((art) => {
          setImages(art.data);
        })
        .catch((err) => console.log('get images by culture failed', err));
    }
  };
  const userList = usersArray.map((user, i) => (
    <option
      value={user.name}
      key={`${user.googleId}-${i}`}
    >
      {user.name}
    </option>
  ));
  // create the option tags for cultures dropdown
  const culturesList = cultures.map((culture, i) => (
    <option
      value={culture}
      key={`${culture}-${i}`}
    >
      {culture}
    </option>
  ));
  // put the initial db request into useEffect to auto render images when you get to page
  useEffect(() => {
    get25RecentImages();
    getAllUsers();
  }, []);

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1><strong>Gallery</strong></h1>
        </Col>
        <Col md="auto">
          <div className="users">
            <h3 className="section-header text-center">Users</h3>
            <Form.Select onChange={(e) => getFilteredImages(e.target.value)}>
              <option value="" key="54321">All</option>
              {userList}
            </Form.Select>
          </div>
        </Col>
        <Col md={2}>
          <div className="culture">
            <h3 className="section-header text-center">Cultures</h3>
            <Form.Select onChange={(e) => getImagesByCulture(e.target.value)}>
              <option value="" key="296573">All</option>
              {culturesList}
            </Form.Select>
          </div>
        </Col>
      </Row>
      <Row>
        {images.map((image, i) => (
          <Col>
            <GalleryListItem
              image={image}
              key={`${image.imageId}-${i}`}
            />
          </Col>
        ))}
      </Row>
    </Container>

  );
}

export default Gallery;
