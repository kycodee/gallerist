import React from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

function AuctionItem({ art, setSale }) {
  // const [hover, setHover] = useState(false);
  // const onHover = () => setHover(true);
  // const onLeave = () => setHover(false);

  function bidClick(event) {
    axios
      .put(`/db/art/${event.target.value}`, {
        isForSale: false,
        price: 0,
      })
      .then(() => setSale(false))
      .catch((err) => console.error('Could not Put update on artwork: ', err));
  }

  function payOwner() {
    axios
      .put(`/db/giveMoney/${art.userGallery.name}`, {
        price: art.price,
      })
      .then(() => {
        axios
          .put('/db/deductWallet/', {
            price: art.price,
          })
          .catch((err) => console.error('Could not deduct from wallet: '.err));
      })
      .catch((err) => console.error('Could not pay owner: ', err));
  }

  return (
    <Col>
      <Card style={{ width: '20rem' }}>
        <Card.Img
          variant="top"
          alt={art.title}
          // style={{ width: '250px', height: 'auto' }}
          src={art.imageUrl}
        />
        <Card.Body>
          <Card.Title>{art.title}</Card.Title>
          <Card.Text>{art.artist}</Card.Text>
          <Button
            onClick={(e) => {
              bidClick(e);
              payOwner();
            }}
            value={art.imageId}
            variant="outline-dark"
          >
            {`Buy from ${art.userGallery.name} for $${art.price}`}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
// {/* <div>
// {hover ? <div>{art.title}</div> : <div> </div>}
// <img
//   style={{ width: '250px', height: 'auto' }}
//   src={art.imageUrl}
//   onMouseEnter={onHover}
//   onMouseLeave={onLeave}
//   alt={art.title}
// />
// <button onClick={bidClick} value={art.imageId} type="button">
//   Buy
// </button>
// </div> */}

export default AuctionItem;
