import React, {effectState, useState} from 'react';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import CreateEvent from './components/CreateEvent';
import EventList from './components/EventList';
import UpdateEvent from './components/UpdateEvent';
import EventCalendar from './components/EventCalendar';

function App() {

const [dates, setDates] = useState([]);
const [events, setEvents] = useState([]);

    const removeFromDom = eventId => {
      setEvents(events.filter(event => event._id != eventId));
    }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<EventCalendar/>} path="/" default />
          <Route element={<EventList events={events} setEvents={setEvents} removeFromDom={removeFromDom}/>} path="/date/:id"/>
          <Route element={<CreateEvent/>} path="/date/add-event/:id"/>
          <Route element={<UpdateEvent/>} path="/date/edit-event/:id"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
