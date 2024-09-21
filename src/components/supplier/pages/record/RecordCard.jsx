import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function RecordCard({ record }) {
  const orderedItems = record.orderItems;
  console.log(orderedItems);
  
  let size = 0;
  const fixed = 40;

  // Filter and truncate the ordered items based on the condition
  const filteredItems = [];
  for (let i = 0; i < orderedItems.length; i++) {
    size += orderedItems[i].length;
    if (size > fixed) {
      filteredItems.push("...");
      break;
    }
    filteredItems.push(orderedItems[i]);
  }

  return (
    <Box className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
      <Card className="bg-gray-500 shadow-lg border border-gray-300 cursor-pointer bg-gradient-to-r from-[#f0f4f8] via-[#b3c6d4] to-[#f0f4f8] p-6 rounded-lg shadow-md transition-all duration-300 hover:from-[#e6edf5] hover:via-[#a2b5c3] hover:to-[#e6edf5]">
        <CardContent >
          <Typography variant="h5" component="div" className='text-center'>
            {record.orderId}
          </Typography>
          <Typography variant='h6' className="mb-1.5 text-center">
            {record.source} - {record.destination}
          </Typography>
          <Typography variant="body2">
            <strong>Order Date:</strong> {record.orderDate}
          </Typography>
          <div>
            <Typography variant="body2" component="div" className='flex' >
              <strong>Ordered Items : </strong>
              {filteredItems.map((item, index) => (
                <Typography key={index} variant="body2">
                  {item},
                </Typography>
              ))}
            </Typography>
          </div>
          <div className="mt-6"> 
            <Typography variant="body2" className='bg-blue-500 hover:bg-blue-600 text-center text-white font-semibold py-2 px-4 rounded-md shadow-lg transition-all duration-300'>
            {record.status}
                  </Typography>
          </div>   
          <div className="mt-4"> 
            <Typography variant="body2" className='bg-red-500 hover:bg-red-400 text-center text-white font-semibold py-2 px-4 rounded-md shadow-lg transition-all duration-300'>
            Track
            </Typography>
          </div>          
        </CardContent>
      </Card>
    </Box>
  );
}




