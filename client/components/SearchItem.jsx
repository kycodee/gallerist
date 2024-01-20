import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

function SearchItem({ image, idSearch }) {
  return (
    <Col
      key={image.id}
    >
      <a href={image.baseimageurl}>
        <Image
          style={{ width: '300px', height: 'auto' }}
          src={image.baseimageurl}
          id={image.id}
          alt={image.alttext}
        />
      </a>
      <br />
      <Button
        variant="outline"
        type="submit"
        onClick={() => {
          idSearch(image.id);
        }}
        style={{ paddingBottom: '20px' }}
      >
        ❤️
      </Button>
    </Col>
  );
}

SearchItem.propTypes = {
  image: PropTypes.object.isRequired,
  idSearch: PropTypes.func,
};

export default SearchItem;
