import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define Room component
const Room = ({ room }) => {
  return (
    <div>
      <h1>{room.name}</h1>
      {/* Add more room details here if needed */}
    </div>
  );
}

const Homescreen = () => {
 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('/api/rooms/getallrooms');
        setData(response);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className="row justify-content-center">
        {loading ? (<h1>Loading...</h1>) : error ? (<h1>Error</h1>) : (data.map(room => (
          <div className="col-md-9" key={room.id}>
            <Room room={room} />
          </div>
        )))}
      </div>
    </div>
  );
}

export default Homescreen;
