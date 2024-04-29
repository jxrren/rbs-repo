import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';

const Homescreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading state to true initially
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('/api/rooms/getallrooms');
        setData(response);
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        setError(true);
        console.error(error.message);
        setLoading(false); // Set loading state to false if there's an error
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className="row justify-content-center">
       
        {!loading && !error && 
        data.map(room => (
          <div className="col-md-9 mt-2" key={room.id}>
            <Room room={room} />
          </div>
        ))}
        {/* Display loading message if loading */}
        {loading && <Loader/>}
        {/* Display error message if there's an error */}
        {error && <Error/>}
      </div>
    </div>
  );
};

export default Homescreen;
