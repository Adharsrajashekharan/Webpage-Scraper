import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {message} from 'antd'
const Urlpage = () => {
  const navigate=useNavigate()
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);
  const[loading,setLoading]=useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateUrl(url)) {
      setIsValidUrl(false);
      return;
    }
    setLoading(true)
    try {
      const response = await axios.post('/api/url', { url });
      message.success("success")
      console.log(response.data);
      setUrl(" ")
      setLoading(false)
      navigate("/results")

      // Process the response as needed
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };




  const validateUrl = (value) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(value);
  };

  return (
    <>
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white shadow-lg rounded-lg p-8 h-72  ">
      <button className='bg-sky-300 p-1 text-lg' onClick={()=>navigate("/results")}>Show existing</button>

        <h1 className="text-3xl font-bold mb-6 text-center">Webpage Scraper</h1>

        <form onSubmit={handleSubmit} className="text-center">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter website URL"
              className={`border ${
                !isValidUrl ? 'border-red-500' : 'border-gray-300'
              } rounded-lg px-4 py-2 w-[600px]`}
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setIsValidUrl(true);
              }}
            />
            {!isValidUrl && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid URL.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
          >
            {loading ? 'Loading...' : 'Get Insights'}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Urlpage;
