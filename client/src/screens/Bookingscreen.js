import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';

function Bookingscreen() {
    const { roomid, fromdate, todate } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [room, setRoom] = useState(null);

    // Convert fromdate and todate to moment objects
    const fromDateMoment = moment(fromdate, 'DD-MM-YYYY');
    const toDateMoment = moment(todate, 'DD-MM-YYYY');

    // Calculate total days
    const totalDays = toDateMoment.diff(fromDateMoment, 'days');
    const totalAmount = room ? totalDays * room.rentperday : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post('/api/rooms/getroombyid', { roomid });
                
                // Set total amount using response data
                const totalAmount = response.data.rentperday * totalDays;
                setRoom(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }
        fetchData();
    }, [roomid, totalDays]);

async function bookRoom() {
const bookingDetails ={
    room, 
    userid: JSON.parse(localStorage.getItem('currentUser'))._id,
    fromdate,
    todate,
    totalAmount,
    totalDays

}
try {
    const result = await axios.post('/api/bookings/bookroom', bookingDetails)
} catch (error) {
    
}
}


    return (
        <div className='m-5'>
            {loading ? (
                <h1><Loader /></h1>
            ) : error ? (
                <Error />
            ) : (
                <div>
                    <div className='row justify-content-center mt-5 bs'>
                        <div className='col-md-6'>
                            <h1>{room.name}</h1>
                            <img src={room.imageurls[0]} className='bigimg' />
                        </div>
                        <div className='col-md-6'>
                            <div style={{ textAlign: 'right' }}>
                                <h1>Booking Details</h1>
                                <hr />
                                <b>
                                    <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                    <p>From : {fromDateMoment.format('DD-MM-YYYY')}</p>
                                    <p>To : {toDateMoment.format('DD-MM-YYYY')}</p>
                                    <p>Max Count : {room.maxcount}</p>
                                </b>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <b>
                                    <h1>Amount</h1>
                                    <hr />
                                    <p>Total days : {totalDays}</p>
                                    <p> Rent per hour : {room.rentperday}</p>
                                    {totalAmount && <p>Total Amount: {totalAmount}</p>}
                                </b>
                            </div>
                            <div style={{ float: 'right' }}>
                                <button className='btn btn-primary onClick={bookRoom}'>Pay Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Bookingscreen;
