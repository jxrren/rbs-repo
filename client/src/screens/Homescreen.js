import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker, Space } from 'antd';
import moment from 'moment'
const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fromdate, setFromdate] = useState(null); // Initialize fromdate state
  const [todate, setTodate] = useState(null); // Initialize todate state
  const [duplicaterooms, setduplicaterooms] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/rooms/getallrooms');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error.message);
        setLoading(false);
      }
    };
  
    fetchData(); // Invoke the async function inside useEffect
  }, []); // Empty dependency array to run the effect only once
  

  function filterByDate(dates) {
    // Update fromdate and todate states when the user selects a new date range
    setFromdate(moment(dates[0]).format('DD-MM-YYYY'));
    setTodate(moment(dates[1]).format('DD-MM-YYYY'));
  }

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-md-3'>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>
      </div>
      <div className="row justify-content-center">
        {!loading && !error &&
          data.map(room => (
            <div className="col-md-9 mt-2" key={room.id}>
              {/* Pass fromdate and todate as props */}
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>
          ))}
        {loading && <Loader />}
        {error && <Error />}
      </div>
    </div>
  );
};

export default Homescreen;
