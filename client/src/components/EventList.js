import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link} from "react-router-dom"
const EventList = (props) => {
    const { id } = useParams();
    const [date, setDate] = useState();
    const { removeFromDom, events, setEvents} = props;
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/dateById/" + id)
            .then( res => {
                console.log(res.data);
                setDate(res.data);
            })
            .catch( err => {console.log(err)});
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/api/eventByDateId/" + id)
            .then( res => {
                console.log(res.data);
                setEvents(res.data);
            })
            .catch( err => {console.log(err)});
    }, []);

    const deleteEvent = (eventId) => {
        axios.delete('http://localhost:8000/api/event/' + eventId)
            .then(res => {
                removeFromDom(eventId)
            })
            .catch(err => console.log(err))
    }
    console.log(events)
    
    const table ={
        margin: '30px'
    }

    const homeBtn ={
        display: 'flex',
        justifyContent: 'right',
        margin: '10px'
    }

    const addBtn ={
        display: 'flex',
        marginLeft: '30px'
    }

    return (
        <div>
            <div style={homeBtn}>
                <button>
                    <Link to={`/`}>Home</Link>
                </button>
            </div>
            <div style={table}>
                <h1>{date?.date}</h1>
                <table class="table table-hover">
                    <thead>
                        <tr>

                            <th scope="col">Events</th>
                            <th scope="col">Time</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.map((event, index) => {
                                return <tr key={index}>
                                        <td><Link to={`/date/edit-event/${event?._id}`}>{event?.description}</Link></td>
                                        <td>{event?.time} {event?.period}</td>
                                        <td>
                                            <button className='btn btn-danger' onClick={(e)=>{deleteEvent(event._id)}}>Delete</button>
                                        </td>
                                    </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <button style={addBtn}>
                        <Link to={`/date/add-event/${date?._id}`}> Add Event </Link>
                </button>
            </div>
        </div>
        
    );
}
export default EventList;