import React from 'react';
import styled from 'styled-components';

const Info = styled.div`
    position: absolute;
    left: 650px;
    font-weight: bold;
`;

const SummaryInformation = ({ price, selectedSession: { start, stop, selected }, selectedDate: { day = 0, month, weekDay } }) => {
    return (
        <Info>
            Вы забронировали билет(-ы) : {(day === 0) ? ' ' : <p style={{ display: 'inline' }}>{day}/{month}-{weekDay}</p>}
            <br></br>
            Сумма: {(price > 0) ? `${price} лей` : ''}
            <br></br>
            На сеанс:
            {selected ? ` ${start}:00 - ${stop}:00` : ``}
        </Info>

    )
}

export default SummaryInformation;