import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

function GalleryListItem({ image }) {
  // add a friend to users friend array
  function addFriend(e) {
    // console.log(e.target.value)
    axios.put('/db/friends/', { friend: e.target.value })
      .then(() => console.log('added friend!'))
      .catch((err) => console.log(err, 'friend not added'));
  }

  return (
    <Container>
      <Row>
        <Col>
          <div>
            <Image
              className="gallery-image"
              style={{ width: '250px', height: 'auto' }}
              src={image.imageUrl}
              id={image.imageId}
              alt={image.title}
            />
            <br />
            <div className="gallery-title">
              {' '}
              {image.title}
            </div>
            <div>
              Owner:
              {' '}
              {image.userGallery.name}
            </div>
            <Button variant="secondary" value={image.userGallery.name} onClick={addFriend}>
              Add Friend
            </Button>
          </div>
          <Link to={`/home/art/${image.imageId}`}>Click here for more details...</Link>
          <br />
        </Col>
      </Row>

    </Container>

  );
}

export default GalleryListItem;
