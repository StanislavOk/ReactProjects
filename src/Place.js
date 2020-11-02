import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SeatsContext } from './App';

const PlaceBadge = styled.div`
      border-radius: 100px;
      border: 2px solid white;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      &:hover {
        cursor: pointer;
        color: white;
      }
      color: ${({ state }) => state ? `white` : `#C71585`}
`;

const Place = ({ number, chosen }) => {
  return (
    <SeatsContext.Consumer>
      {({ click }) =>
        <PlaceBadge onClick={() => click(number)} state={chosen}>{number + 1}</PlaceBadge>
      }
    </SeatsContext.Consumer>
  )
}

Place.propTypes = {
  number: PropTypes.number.isRequired,
  chosen: PropTypes.bool.isRequired
}

export default Place;