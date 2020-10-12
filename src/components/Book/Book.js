import React, { useContext, useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';

const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    })

    const handleCheckIn = (date) => {
        const newDate = { ...selectedDate }
        newDate.checkIn = date
        setSelectedDate(newDate)
    };
    const handleCheckOut = (date) => {
        const newDate = { ...selectedDate }
        newDate.checkOut = date
        setSelectedDate(newDate)
    }
    const handleBook = () => {
        console.log('added');
    }
    return (
        <div style={{textAlign: 'center'}}>
            <h1> {loggedInUser.name} Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check In"
                        value={selectedDate.checkIn}
                        onChange={handleCheckIn}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check Out"
                        format="MM/dd/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOut}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Button onClick={handleBook} variant="contained"> Book Now </Button>
            </MuiPickersUtilsProvider>
        </div>
    );
};

export default Book;