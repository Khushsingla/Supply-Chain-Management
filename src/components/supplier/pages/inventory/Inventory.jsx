import React, { useState, useEffect } from 'react';
import { ReactComponent as DummySvg } from '../../../../assets/dummy.svg';
import data from './data.json'

function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  // const [data,setData]  = useState([]);

  // useEffect((() => {
  //   const fetchData = async() => {
  //     try {
  //       const response = await fetch('http://192.168.60.90:8080/items');
  //       const currData = await response.json();
  //       console.log(currData);
  //       console.log("successful");
        
  //       setData(currData);
  //     } 
  //     catch (error) {
  //       console.error('Error fetching the data', error);
  //     }
  //   };

  //   fetchData();
  // }),[])

  const filteredItems = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='p-4 bg-[#C9D1F3]'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold'>Inventory</h1>
        <input
          type='text'
          placeholder='Search by product name'
          className='border p-2 rounded-md w-1/3'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='flex flex-wrap min-h-screen'>
        {filteredItems.map((product, index) => (
          <div
            key={index}
            className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'
          >
            <div className=' rounded-md shadow-md  cursor-pointer bg-gradient-to-r from-[#f0f4f8] via-[#b3c6d4] to-[#f0f4f8] p-6 rounded-lg shadow-md transition-all duration-300 hover:from-[#e6edf5] hover:via-[#a2b5c3] hover:to-[#e6edf5]'>
              <div className='flex justify-center items-center mb-4'>
                {/* <DummySvg className='w-full h-[100px]' /> */}
                <img src={product.img} alt="image" className='h-[200px] w-full rounded-md' loading="lazy" />
              </div>
              <h2 className='text-lg font-semibold text-center'>{product.name}</h2>
              <p><strong>Product ID:</strong> {product.productId}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <p><strong>Manufacturing Date:</strong> {product.mfgDate}</p>
              <p><strong>Expiry Date:</strong> {product.expiryDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
