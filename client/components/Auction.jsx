import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import AuctionItem from './AuctionItem';

function Auction() {
  const [auctionArray, setAuctionArray] = useState([]);
  const [wallet, setWallet] = useState(0);

  const [forSale, setSale] = useState(true);

  function getWallet() {
    axios.get('/db/user/')
      .then(({ data }) => {
        setWallet(data.wallet);
      })
      .catch((err) => console.error('Could not GET wallet amount: ', err));
  }
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
    getWallet();
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
      getWallet();
      setSale(true);
    }
  }, [forSale]);

  const auctionItems = auctionArray.map((art) => (
    <AuctionItem key={art.imageId} art={art} setSale={setSale} />
  ));

  return (
    <Container>
      <Row>
        <h3>{`Your Wallet: $${wallet}`}</h3>
      </Row>
      <Row>{auctionItems}</Row>
    </Container>
  );
}

export default Auction;
