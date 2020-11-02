import React from 'react';
import styled from 'styled-components';

const ChoosePanelWrapper = styled.div`
    position: absolute;
    left: 650px;
    top: 170px;
    select, label{
      font-weight: bold;
    }
`;

const ChooseDate = ({ dates, onDateChange }) => {
  return (
    <ChoosePanelWrapper>
      <form className="form-inline">
        <label className="my-1 mr-2" htmlFor="inlineFormCustomSelect">Дата бронирования</label>
        <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelect" onChange={onDateChange} >
          <option disabled={true}>Выберите дату бронирования...</option>
          {dates.reduce((datesArr, { id, day, month, weekDay }) => {
            if (id === 7) { datesArr.push(<option value={id} selected={true} key={id}>{day}/{month}-{weekDay}</option>); }
            if (id < 7) { datesArr.push(<option value={id} disabled={true} key={id}>{day}/{month}-{weekDay}</option>); }
            else datesArr.push(<option value={id} key={id}>{day}/{month}-{weekDay}</option>);
            return datesArr;
          }, []).map(el => el)}
        </select>
      </form>
    </ChoosePanelWrapper>
  )
}

export default ChooseDate;