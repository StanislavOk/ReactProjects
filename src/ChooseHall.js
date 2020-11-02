import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const ChoosePanelWrapper = styled.div`
font-weight: bold;
width: 150px;
select, label{
  font-weight: bold;
}
`;

const СhooseHall = ({ halls, createSeats }) => {

  const defaultSize = 30;

  const [currentSize, setCurrentSize] = useState(defaultSize);

  const createSeatsMemo = useCallback(() => {
    createSeats(currentSize);
    // eslint-disable-next-line
  }, [currentSize]);

  useEffect(() => {
    createSeatsMemo();
  }, [createSeatsMemo])

  return (
    <ChoosePanelWrapper>
      <form className="form-inline">
        <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Размер зала</label>
        <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" value={currentSize} onChange={({ target }) => setCurrentSize(target.value)}>
          <option disabled={true}>Выберите размер зала...</option>
          {halls.map((el) => <option key={el.id}>{el.volume}</option>)}
        </select>
      </form>
    </ChoosePanelWrapper>
  )
}

export default СhooseHall;