import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';

const EventCalendar = (props) => {
    const [value, setValue] = useState('');
    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate();
    const newDate ={
        date:value
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(newDate)

        console.log(newDate.date)
        axios.get("http://localhost:8000/api/dateByDate/"+ newDate.date)
            .then((res)=>{
                console.log(res);
                if (res.data == null){
                    axios.post("http://localhost:8000/api/date", newDate)
                    .then( res => {
                        console.log(res);
                        navigate(`/date/${res.data._id}`)
                    })
                    .catch(err => {
                        console.log(err);
                        setErrors(err.response.data.errors)
                        console.log("Event Calendar");
                })            
                }
                navigate(`/date/${res.data._id}`)
            })
            .catch((err)=>{
                console.log(err);
            })
        
        
        }

    const page ={
        margin: '20px'
    }

    const cal ={
            marginTop: '20px',
            display:'flex',
            justifyContent:'center'
    }

    const Empty = 'empty';
    console.log(value)
    return (
        <div style={page}>
            <h2>Welcome to your calendar!</h2>
            <div style={cal}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker 
                        orientation="landscape" 
                        value={value}
                        defaultValue={dayjs('2022-04-17')}
                        onChange={(newValue) => {
                            setValue(`${newValue.$d.getMonth() +1}-${newValue.$d.getDate()}-${newValue.$d.getFullYear()}`);
                        }}
                        showDaysOutsideCurrentMonth
                        slots={{
                            actionBar: Empty
                        }}
                        />
                </LocalizationProvider>
            </div>
            <form onSubmit={onSubmitHandler}>
                        <p>

                            <input type="hidden" name="date" value={value} />
                        </p>
                        <input type="submit" value="Select"/>
                    </form>
            
        </div>
    )
}
export default EventCalendar;