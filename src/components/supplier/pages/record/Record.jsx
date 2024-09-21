import React, { useState,useEffect } from 'react';
import RecordCard from './RecordCard';
import SelectOpt from './SelectOpt';
import TextField from '@mui/material/TextField';
import record from './record.json'

function Record() {
  const [status, setStatus] = useState("All");
  const [search,setSearch] = useState('');
  // const [record,setRecord] = useState([]);

  // Filter records based on selected status
  const filteredRecords = record.filter((rec) => {
    // If status is "All", show all records
    if (status === "All"){

      return rec.orderId.toLowerCase().includes(search.toLowerCase()) || search === '';
    }
    // Filter records based on the selected status
    return (rec.status.toLowerCase() === status.toLowerCase()) && (rec.orderId.toLowerCase().includes(search.toLowerCase()) || search == "");
  });

  // useEffect((() => {
  //   const fetchData = async() => {
  //     try {
  //       const response = await fetch('http://192.168.60.90:8080/orders');
  //       const currRecord = await response.json();
  //       console.log(currRecord);
        
  //       setRecord(currRecord);
  //     } 
  //     catch (error) {
  //       console.error('Error fetching the data', error);
  //     }
  //   };

  //   fetchData();
  // }),[])

  return (
    <div className='min-h-screen bg-[#C9D1F3]'>
      <div className="flex flex-wrap items-center justify-between p-3 ">
        <SelectOpt status={status} setStatus={setStatus} />
        <TextField 
          className='bg-white border border-[#C9D1F3] rounded-lg]'
          id="outlined-basic" 
          label="Search" 
          variant="outlined" 
          value={search}
          onChange={(e) => setSearch(e.target.value)
          }
        />
      </div>
      <div className='flex flex-wrap bg-[#C9D1F3] p-6'>
        {filteredRecords.map((rec, index) => (
          <RecordCard key={index} record={rec}/>
        ))}
      </div>
    </div>
  );
}

export default Record;

