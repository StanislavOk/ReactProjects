import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListItem = styled.div`
        border: 2px solid white;
        width: 13em;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
        &:hover{
          cursor: pointer;
          color: white;
        }
        color: ${({ selected }) => selected ? `white` : `#C71585`}
  `;

const ListSessionContainer = styled.div`
        display: grid;
  `;

const ContainerOfSessions = styled.div`
        position: absolute;
        left: 350px;
  `;

const SessionPanel = ({ sessions, onSessionChange }) => {

  const onClickHandler = id => {
    onSessionChange(id);
  }

  const elements = sessions.map(({ id, start, stop, selected }) => {
    return <ListItem key={id} onClick={() => onClickHandler(id)} selected={selected}>
      Начало сеанса: {start}:00
          Конец сеанса: {stop}:00
          </ListItem>
  });

  return (
    <ContainerOfSessions>
      <ListSessionContainer>
        {elements}
      </ListSessionContainer>
    </ContainerOfSessions>
  )
}

SessionPanel.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired,
    stop: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired
  }))
}


export default SessionPanel;
