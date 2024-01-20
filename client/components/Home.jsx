import React from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Login from './Login';

function Home() {
  return (
    <Container
      className="home"
      align="center"
      style={{ paddingTop: '100px' }}
    >
      <Card
        className="home-card"
        style={{ width: '25rem' }}
      >
        <Card.Img
          variant="top"
          src="https://www.researchgate.net/profile/Dominik-Markowski-2/publication/301670799/figure/fig1/AS:668987461476355@1536510448133/Warhol-Andy-Colored-Mona-Lisa.jpg"
          alt="Warhol Mona Lisa"
        />
        <Card.Body>
          <Card.Title
            className="card-title"
          >
            <strong>GLLRST</strong>
          </Card.Title>
          <Login />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;
