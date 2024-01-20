import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

function Profile() {
  // Initialize three main parts of profile page
  const [name, setName] = useState('');
  const [friends, setFriends] = useState([]);
  const [gallery, setGallery] = useState([]);

  const [reload, setReload] = useState(false);

  // Get request to return User profile, sets name and friends State
  function getProfile() {
    return axios
      .get('/db/user/')
      .then(({ data }) => {
        setName(data.name);
        setFriends(data.friends);
      })
      .catch((err) => console.error('Could not GET user profile: ', err));
  }

  // Get request to return Art documents connected to User, sets gallery State
  function getUserGallery() {
    return axios
      .get('/db/userArt/')
      .then(({ data }) => {
        setGallery(data);
      })
      .catch((err) => console.error('Could not Get art by user: ', err));
  }

  // Initializing state on first render
  useEffect(() => {
    getProfile();
    getUserGallery();
  }, []);

  // Re-render component when User document changes, i.e. friend deleted
  useEffect(() => {
    if (reload) {
      getProfile();
    }
  }, [reload]);

  // const [price, setPrice] = useState(0);

  // Updates art object by changing isForSale field to true
  function putSale(event) {
    // setPrice(prompt('Set a price:'));
    axios
      .put(`/db/art/${event.target.value}`, {
        isForSale: true,
      })
      .then(() => getUserGallery())
      .catch((err) => console.error('Could not Put update on artwork: ', err));
  }

  function unlistSale(event) {
    axios
      .put(`/db/art/${event.target.value}`, {
        isForSale: false,
      })
      .then(() => getUserGallery())
      .catch((err) => console.error('Could not Put update on artwork: ', err));
  }

  // Delete friend from friends' array on User document
  function unFriend(event) {
    axios
      .put('/db/unfriend/', { friend: event.target.value })
      .then(() => setReload(true))
      .catch((err) => console.error('Could not unfriend: ', err));
  }

  // Deletes art object, then updates gallery State by invoking getUserGallery
  function deleteArt(event) {
    axios
      .delete(`/db/art/${event.target.value}`)
      .then(() => getUserGallery())
      .catch((err) => console.error('Could not Delete art: ', err));
  }

  // Iterate over friends array, could be improved by linking to friend's gallery perhaps
  // Returns a ListGroup of Friends, with X button to 'unfriend'
  const friendsDiv = friends.length ? (
    <ListGroup>
      {friends.map((pal, i) => (
        <ListGroup.Item key={`${pal}-${i}`}>
          <Container>
            <Row>
              <Col sm="2">
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  value={pal}
                  onClick={unFriend}
                >
                  ❌
                </Button>
              </Col>
              <Col sm="10">
                <Link to={`/home/palGal/${pal}`}>{pal}</Link>
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>
      ))}
    </ListGroup>
  ) : (
    <ListGroup>
      <ListGroup.Item>You have no friends.</ListGroup.Item>
    </ListGroup>
  );

  // Iterates over gallery array, creates react-bootstrap Accordion Component
  // Each Item of Accordion is a ListGroup, each ListGroup.Item is art title and artist
  // with a couple of buttons to sell at auction, or delete, links to image url
  const artDiv = gallery ? (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Artworks:</Accordion.Header>
        <Accordion.Body>
          <ListGroup>
            {gallery
              .filter((art) => !art.isForSale)
              .map((art, i) => (
                <ListGroup.Item key={`${art}-${i}`}>
                  <Container>
                    <Row>
                      <Col sm="10">
                        <Row>
                          <Link to={`/home/art/${art.imageId}`}><strong>{art.title}</strong></Link>
                        </Row>
                        <Row>
                          {art.artist}
                        </Row>
                      </Col>
                      <Col sm="1">
                        <Button
                          variant="outline-success"
                          type="button"
                          value={art.imageId}
                          onClick={putSale}
                        >
                          Sell
                        </Button>
                      </Col>
                      <Col sm="1">
                        <Button
                          variant="outline"
                          type="button"
                          value={art.imageId}
                          onClick={deleteArt}
                        >
                          ❌
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Art For Sale:</Accordion.Header>
        <Accordion.Body>
          <ListGroup>
            {gallery
              .filter((art) => art.isForSale)
              .map((art, i) => (
                <ListGroup.Item key={`${art}-${i}`}>
                  <Container>
                    <Row>
                      <Col sm="10">
                        <Row>
                          <Link to={`/home/art/${art.imageId}`}><strong>{art.title}</strong></Link>
                        </Row>
                        <Row>
                          {art.artist}
                        </Row>
                      </Col>
                      <Col sm="1">
                        <Button
                          variant="outline-warning"
                          type="button"
                          value={art.imageId}
                          onClick={unlistSale}
                        >
                          Unlist
                        </Button>
                      </Col>
                      <Col sm="1">
                        <Button
                          variant="outline"
                          type="button"
                          value={art.imageId}
                          onClick={deleteArt}
                        >
                          ❌
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  ) : (
    <ListGroup>
      <ListGroup.Item>You have 0 artworks.</ListGroup.Item>
    </ListGroup>
  );

  return (
    <Container>
      <Row>
        <Col sm="5">
          <h2>
            <strong>{name}</strong>
          </h2>
          <br />
        </Col>
        <Col sm="7">
          <h3>Friends:</h3>
          {friendsDiv}
        </Col>
      </Row>
      <Row>
        <Container>
          <h3>Gallery:</h3>
          {artDiv}
        </Container>
      </Row>
    </Container>
  );
}

export default Profile;
