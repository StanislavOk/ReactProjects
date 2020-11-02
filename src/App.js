import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Seats from './Seats';
import SessionPanel from './SessionPanel';
import SummaryInformation from './SummaryInformation';
import СhooseHall from './ChooseHall';
import ChooseDate from './ChooseDate';

const ContentWrapper = styled.div`
    width: 100vw;
    margin: 50px auto;
    font-size: 16px;
    color: #C71585;
    background-color: #2b2b60;
`;

const PlacePanel = styled.div`
    border: 1px solid red;
    display: grid;
    grid-template-columns: repeat(5, 30px);
    grid-gap: 10px 30px;
    padding: 30px;
`;

class Seat {
  constructor(id, price, chosen) {
    this.id = id;
    this.price = price;
    this.chosen = chosen;
  }
}

class Sessions {
  constructor(id, start, stop, selected) {
    this.id = id;
    this.start = start;
    this.stop = stop;
    this.selected = selected;
  }
}

class Hall {
  constructor(id, volume) {
    this.id = id;
    this.volume = volume;
  }
}

class DateOf {
  constructor(id, day, month, weekDay) {
    this.id = id;
    this.day = day;
    this.month = month;
    this.weekDay = weekDay;
  }
}

export const SeatsContext = React.createContext();

const App = () => {

  const [seatsQty, setSeatsQty] = useState(30);
  const [sessions, setSessions] = useState([]);
  const [totalPrice, setPrice] = useState(0);
  const [seats, setPlaces] = useState([]);
  const [selectedSession, setSelectedSession] = useState({});
  const [halls, setHalls] = useState([]);
  const [unitedList, setUnitedList] = useState([]);
  const [selectedDate, setSelectedDate] = useState({});
  // eslint-disable-next-line 
  const [prevWeek, setPrevWeek] = useState([]);
  // eslint-disable-next-line 
  const [currentWeek, setCurrentWeek] = useState([]);


  const pushDataInSessionBlock = () => {
    let start = 10; let stop = 12;
    const newArr = [];
    for (let i = 0; i < 5; i++) {
      newArr.push(new Sessions(i, start, stop, false));
      start += 2; stop += 2;
    }
    setSessions(newArr);
  }

  const setVolumeOfHall = (id) => {
    if (id === halls.id)
      setSeatsQty(halls[id].volume);
  }

  const createHalls = () => {
    const newArr = [];
    let volume = 30;
    for (let i = 0; i < 4; i++) {
      newArr.push(new Hall(i, volume));
      volume += 10;
    }
    setHalls(newArr);
  }

  const onCurrentSessionChange = (id) => {
    const newArr = [...sessions];
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].id !== id) {
        newArr[i].selected = false;
      }
    }
    newArr[id].selected = !sessions[id].selected;
    setSessions(newArr);
  }

  const selectedPlace = (id) => {
    const newArr = [...seats];
    newArr[id].chosen = !seats[id].chosen;
    setPlaces(newArr);
  }

  const createSeats = (num = seatsQty) => {
    const newArr = [];
    for (let i = 0; i < num; i++) {
      newArr.push(new Seat(i, 75, false));
    }
    setPlaces(newArr);
  }

  const AmountAccumulator = () => {
    let count = 0;
    const newArr = [...seats];
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].chosen === true) {
        count += seats[i].price;
      }
    }
    setPrice(count);
  }

  const currentSession = () => {
    const newArr = sessions.filter((el) => el.selected === true);
    newArr.forEach((el) => setSelectedSession(el));
  }

  const getLastDayOfMonth = (year, month) => {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
  }

  const getLastDayOfPrevMonth = (year, month) => {
    let date = new Date(year, month - 2, 0);
    return date.getDate();
  }

  const fillArrOfWeekDays = () => {
    const weekday = new Array(7);
    weekday[0] = "Воскресенье";
    weekday[1] = "Понедельник";
    weekday[2] = "Вторник";
    weekday[3] = "Среда";
    weekday[4] = "Четверг";
    weekday[5] = "Пятница";
    weekday[6] = "Суббота";
    return weekday;
  }

  const createPrevWeekDates = () => {
    return new Promise(resolve => {
      const prevWeekArr = [];
      const weekday = fillArrOfWeekDays();
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let weekDay = date.getDay();
      let year = date.getFullYear();
      for (let i = 6; i >= 0; i--) {
        if (weekDay === 0) { weekDay = 7 };
        if (day === 1) {
          day = getLastDayOfPrevMonth(year, month);
          prevWeekArr.push(new DateOf(i, day--, month, weekday[weekDay--]))
        }
        else { prevWeekArr.push(new DateOf(i, --day, month, weekday[--weekDay])) }
      }
      resolve(prevWeekArr);
    });
  }

  const createCurrentWeekDates = () => {
    return new Promise(resolve => {
      const currentWeekArr = [];
      const weekday = fillArrOfWeekDays();
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let weekDay = date.getDay();
      let year = date.getFullYear();
      for (let i = 7; i < 14; i++) {
        if (weekDay === 7) { weekDay = 0 }
        if (day <= getLastDayOfMonth(year, month)) {
          currentWeekArr.push(new DateOf(i, day++, month + 1, weekday[weekDay++]))
        }
        else {
          day = 1;
          currentWeekArr.push(new DateOf(i, day++, month++, weekday[weekDay++]))
        }
      }
      resolve(currentWeekArr);
    });
  }

  const buildDates = () => {
    Promise.all([createCurrentWeekDates(), createPrevWeekDates()])
      .then(([curr, prev]) => {
        setCurrentWeek(curr);
        setPrevWeek(prev);
        setUnitedList(prev.reverse().concat(curr));
      });
  }

  const onDateChange = (e) => {
    const newArr = [...unitedList];
    const currentDateID = e.target.value;
    const dateObj = newArr[currentDateID];
    setSelectedDate(dateObj);
  }

  useEffect(() => {
    createHalls();
    createSeats();
    pushDataInSessionBlock();
    buildDates();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    currentSession();
    AmountAccumulator();
  });

  return (
    <SeatsContext.Provider value={{ click: selectedPlace }}>
      <ContentWrapper>
        <PlacePanel>
          <Seats seats={seats} />
          <SessionPanel sessions={sessions} onSessionChange={onCurrentSessionChange} />
          <SummaryInformation selectedDate={selectedDate} selectedSession={selectedSession} price={totalPrice} />
          <СhooseHall createSeats={createSeats} halls={halls} setQty={setVolumeOfHall} />
          <ChooseDate onDateChange={onDateChange} dates={unitedList} />
        </PlacePanel>
      </ContentWrapper>
    </SeatsContext.Provider>
  )
}

export default App;