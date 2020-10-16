import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
    const [booking, setBooking] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    console.log(booking);
    useEffect(() => {
        fetch('http://localhost:4000/bookings?email='+loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setBooking(data))
    }, [])
    return (
        <div>
           {
               booking.map(book => (
                   <div>
                       <p> Your total booking: {book.length} </p>
                       <p> Your booking is: {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} and {book.checkOut} </p>
                   </div>
               ))
           }
        </div>
    );
};

export default Booking;