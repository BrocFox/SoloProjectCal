import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
const CreateEvent = (props) => {
    const { id } = useParams();
    const [errors, setErrors] = useState({}); 
    const [description, setDescription] = useState('');
    const [time, setTime] = useState(null); 
    const [period, setPeriod] = useState('AM'); 
    const navigate = useNavigate();
    const newEvent= {
        description:description,
        time:time,
        period:period,
        dateId:id
    }


    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(newEvent);
        axios.post("http://localhost:8000/api/event", newEvent)
            .then( res => {
                console.log(res);
                navigate(`/date/${id}`)
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
                    <Link to={`/date/${id}`}>Back</Link>
                </button>
            </div>
            <div style={title}>
                <h1>Add Event</h1>
            </div>
            <div style={form2}>
                <div style={form}>
                    <form onSubmit={onSubmitHandler}>
                        <p>
                            {/* { errors.description? 
                                <p style={styleError}>{errors.description.message}</p>
                                : null
                            } */}
                            <label>Event Description: </label>
                            <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} value={newEvent.description} />
                        </p>
                        <p>
                            {/* { errors.time? 
                                <p style={styleError}>{errors.time.message}</p>
                                : null
                            } */}
                            <label>Time: </label>
                            <input type="number" name="time" onChange={(e) => setTime(e.target.value)} value={newEvent.time} />
                        </p>
                        <p>
                            <label>Period: </label>
                            <select type="text" name="period" class="form-select" aria-label="Default select" placeholder='Choose an option' onChange={(e) => setPeriod(e.target.value)} >
                                <option disabled={true} value="">
                                    --Choose and option--
                                </option>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select> 
                        </p>
                        <input type="submit" value="Add Event"/>
                    </form>
                </div>
            </div>
            
        </div>
    )
}
export default CreateEvent;