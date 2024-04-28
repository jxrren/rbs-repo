import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

function Bookingscreen(match) {
    const {roomid} = useParams()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [room, setRoom] = useState(null);



    useEffect(async () =>{

        const fetchData = async() => {
            try{
                setLoading(true);
                const response = await axios.post('/api/rooms/getroombyid',{roomid:match.params.roomid}).data;
            setRoom(response.data);
            setLoading(false);
            } catch (error){
                setLoading(false)
                setError(true);

            }
        }

        fetchData();

    },[roomid])

    return (
        <div className='m-5'>

            {loading?(<h1>Loading....</h1>):error?(<h1>Error....</h1>):(<div>

                <div className='row justify-content-center mt-5 bs'>
                    <div className='col-md-6'>
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg'/>
</div>

                    <div className='col-md-6'>
                       <div style={{textAlign:'right'}}>
                       <h1>Booking Details</h1>
                        <hr />

                        <b>
                        <p>Name : </p>
                        <p>From : </p>
                        <p>To : </p>
                        <p>Max Count : {room.maxcount}</p>
                        </b>
                       </div>

                       <div style={{textAlign:'right'}}>
                        <b>
                        <h1>Amount</h1>
                        <hr />
                        <p>Total hours : </p>
                        <p> Rent per hour : {room.rentperday}</p>
                        <p>Total Amount</p>
                        </b>
                       </div>

                       <div style={{float:'right'}}>
                        <button className='btn btn-primary'>Pay Now</button>
                       </div>

                    </div>

                </div>

            </div>)} 


        </div>
    )
}

export default Bookingscreen