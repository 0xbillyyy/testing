import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function Api() {
  const [data, setData] = useState({
    "status": null,
    "data": null,
    "error": null,
    "loading": true
  });

  useEffect(() => {
    axios.get('https://al-quran-8d642.firebaseio.com/data.json?print=pretty')
      .then(response => {
        setData({
            status: "success",
            data: response.data,
            loading: false
        });
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
        setData({
            status: "failed",
            error: error.message,
            loading: false
        })
      });
  }, []);

  return data

}
