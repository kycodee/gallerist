import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import AuctionItem from './AuctionItem';

function Auction() {
  const [auctionArray, setAuctionArray] = useState([]);

  const [forSale, setSale] = useState(true);

  function getAuction() {
    return axios
      .get('/db/auction/')
      .then((response) => {
        setAuctionArray(response.data);
      })
      .catch((err) => console.error('Could not GET auction items: ', err));
  }

  useEffect(() => {
    getAuction();
    const intervalId = setInterval(() => {
      axios
        .get('/db/auction/')
        .then(({ data }) => {
          if (auctionArray.length !== data.length) {
            setAuctionArray(data);
          }
        })
        .catch((err) => console.error('Could not GET auction items: ', err));
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!forSale) {
      getAuction();
      setSale(true);
    }
  }, [forSale]);

  const auctionItems = auctionArray.map((art) => (
    <AuctionItem key={art.imageId} art={art} setSale={setSale} />
  ));

  return (
    <Container>
      <Row>{auctionItems}</Row>
    </Container>
  );
}

export default Auction;
