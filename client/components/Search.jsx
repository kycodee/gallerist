import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

// react bootstrap components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

import SearchItem from './SearchItem';

// '/huam/object/:imageid' --For detailed object about image
// '/huam/image/:keyword' --For an array of images

function Search() {
  const [search, setSearch] = useState('');
  // state images array
  const [images, setImages] = useState([]);

  // Modal state for 404 errors
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // axios post request to user's gallery
  function postToGallery(artObj) {
    axios.post('/db/art', {
      art: {
        title: artObj.title,
        artist: artObj.people[0].displayname,
        date: artObj.dated,
        culture: artObj.culture,
        imageId: artObj.id,
        url: artObj.url,
        imageUrl: artObj.images[0].baseimageurl,
        isForSale: false,
        price: 0,
      },
    }).then(() => {
      console.log('succesfully posted to db');
      // redirect to gallery?
    })
      .catch((err) => {
        console.error('Could not post to gallery ', err);
      });
  }

  // search by keyword
  function keywordSearch(term) {
    axios(`/huam/image/${term}`)
      .then((response) => {
        // console.log(response.data);
        setImages(response.data);
      })
      .catch((err) => console.error(err));
  }

  // handleClick will call idSearch
  function idSearch(id) {
    axios(`/huam/object/${id}`)
      .then(({ data }) => {
        // console.log(data);
        if (data[0].images.length === 0) {
          // console.log(': (');
          // alert('Sorry this piece is no longer available');
          handleShow();
        }
        return postToGallery(data[0]);
      })
      .catch((err) => console.error(err));
  }
  // handleClick function allows ability to pass down idSearch as props using useCallback
  const handleClick = useCallback((id) => {
    idSearch(id);
  });

  useEffect(() => {
    keywordSearch('abstract');
  }, []);

  return (
    <Container className="search">
      <input
        type="text"
        value={search}
        onKeyDown={(e) => {
          if (search.length > 0 && e.key === 'Enter') {
            keywordSearch(search);
            setSearch('');
          }
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => {
          // console.log('keyword: ', search);
          if (search.length > 0) {
            keywordSearch(search);
          }
          setSearch('');
        }}
      >
        🔍
      </Button>
      <br />
      <Row align="center" gap={3} style={{ listStyleType: 'none', paddingTop: '20px' }}>
        {
          images.map((image) => (
            <SearchItem
              image={image}
              key={image.id}
              idSearch={handleClick}
            />
          ))
        }
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Sorry, this piece is no longer available.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Search;
