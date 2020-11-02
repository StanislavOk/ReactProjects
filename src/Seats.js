import React from 'react';
import Place from './Place';

const Seats = ({ seats }) => {
  const seatPlaces = seats.map((el) => (<div key={el.id}><Place chosen={el.chosen} number={el.id} /></div>))
  return (
    <React.Fragment>
      {seatPlaces}
    </React.Fragment>
  )
}

export default Seats;