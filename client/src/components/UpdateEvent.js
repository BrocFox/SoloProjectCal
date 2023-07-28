import React,  {useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams  } from "react-router-dom";
const UpdateEvent = (props) => {
    const { id } = useParams();
    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [time, setTime] = useState(null); 
    const [period, setPeriod] = useState(''); 
    const [dateId, setDateId] = useState(''); 
    const [event, setEvent] = useState({
        description:description,
        time:time,
        period:period,
        dateId:dateId
    });
    

    useEffect(() => {
        axios.get("http://localhost:8000/api/event/" + id)
            .then( res => {
                console.log(res.data);
                setEvent(res.data);
            })
            .catch( err => {console.log(err)});
    }, []);


    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios.patch("http://localhost:8000/api/event/"+ id, event)
            .then( res => {
                console.log(res);
                navigate(`/date/${res.data.dateId}`)
            })
            .catch(err => {
                console.log(err);
                setErrors(err.response.data.errors)
            })            
    }


    const form = {
        display: 'flex',
        flexDirection: 'col',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid black',
        padding: '20px',
        width: '250px'
    };
    const form2 = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const title = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const link = {
        display: 'flex',
        alignItems: 'right',
        justifyContent: 'right',
        marginRight: '10px'
    };

    const styleError ={
        color: 'red'
    }

    const homeBtn ={
        display: 'flex',
        justifyContent: 'right',
        margin: '10px'
    }

    return (
        <div>
            <div style={homeBtn}>
                <button>
                    <Link to={`/date/${event.dateId}`}>Back</Link>
                </button>
            </div>
            <div style={title}>
                <h1>Edit Event</h1>
            </div>
            <div style={form2}>
                <div style={form}>
                    <form onSubmit={onSubmitHandler}>
                        <p>
                            {/* { errors.name? 
                                <p style={styleError}>{errors.name.message}</p>
                                : null
                            } */}
                            <label>Event Description: </label>
                            <input type="text" name="description" onChange={(e) => setEvent({[e.target.name]:e.target.value})} value={event.description} />
                        </p>
                        <p>
                            {/* { errors.number? 
                                <p style={styleError}>{errors.number.message}</p>
                                : null
                            } */}
                            <label>Time: </label>
                            <input type="number" name="time" onChange={(e) => setEvent({[e.target.name]:e.target.value})} value={event.time} />
                        </p>
                        <p>
                            <label>Period: </label>
                            <select type="text" name="period" class="form-select" aria-label="Default select" placeholder='Choose an option' onChange={(e) => setEvent({[e.target.name]:e.target.value})} >
                                <option disabled={true} value={event.period}>
                                    --Choose an option--
                                </option>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select> 
                        </p>
                        <input type="submit" value="Edit Event"/>
                    </form>
                </div>
            </div>
            
        </div>
    )
}
export default UpdateEvent;