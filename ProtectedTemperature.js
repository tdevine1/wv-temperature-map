import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedTemperature = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/protected-temperatures', { withCredentials: true });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
};

export default ProtectedTemperature;
