import React, { useState, useEffect, useRef } from 'react';
import data from './storeData.json'; // Assuming data is imported from a JSON file
import { MdCancel } from "react-icons/md";

function Store() {
  const [searchStore, setSearchTerm] = useState('');
  const [clicked, setClicked] = useState(false);
  const [storeId, setStoreId] = useState('');

  const divRef = useRef(null);
  const overlayRef = useRef(null);

  // Filter items based on search term
  const filteredItems = data.filter((item) =>
    item.store_name.toLowerCase().includes(searchStore.toLowerCase()) ||
    item.store_id.toLowerCase().includes(searchStore.toLowerCase())
  );

  const handleClick = (store_id) => {
    if (storeId === store_id) {
      setClicked(!clicked);
    } else {
      setStoreId(store_id);
      setClicked(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target) &&
          overlayRef.current && !overlayRef.current.contains(event.target)) {
        setClicked(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [clicked]);

  const clickedStore = data.find(store => store.store_id === storeId) || {};

  return (
    <div className='bg-[#C9D1F3]'>
      {clicked && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black opacity-50 z-10"
        />
      )}
      <div
        ref={divRef}
        className={`w-[300px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-gray-200 ${!clicked ? 'hidden' : ''}`}
      >
        <MdCancel className='absolute top-2 right-2 cursor-pointer text-3xl' onClick={() => setClicked(false)} />

        <div className='flex flex-col p-4 shadow-md text-center min-h-[200px] rounded-xl bg-gradient-to-r from-[#e0e5ec] via-[#a8b4c3] to-[#e0e5ec] p-6 rounded-lg shadow-md transition-all duration-300 hover:from-[#c0c9d1] hover:via-[#8a9ba9] hover:to-[#c0c9d1]'>
          <h2 className='text-lg font-semibold'>{clickedStore.store_name}</h2>
          <p><strong>Store ID:</strong> {clickedStore.store_id}</p>
          <p><strong>Location:</strong> {clickedStore.location}</p>
          <p><strong>Distance:</strong> {clickedStore.distance} km</p>
          <p><strong>Speciality:</strong> {clickedStore.important_details}</p>
        </div>
      </div>
      <div className='p-4'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-bold'>Store</h1>
          <input
            type='text'
            placeholder='Search by store name or store id'
            className='border p-2 rounded-md w-1/3'
            value={searchStore}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='flex flex-wrap'>
          {filteredItems.map((store) => (
            <div
              key={store.store_id}
              onClick={() => handleClick(store.store_id)}
              className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'
            >
              <div className='flex flex-col p-4 rounded-md shadow-md min-h-[200px] cursor-pointer bg-gradient-to-r from-[#f0f4f8] via-[#b3c6d4] to-[#f0f4f8] p-6 rounded-lg shadow-md transition-all duration-300 hover:from-[#e6edf5] hover:via-[#a2b5c3] hover:to-[#e6edf5]'>
                <h2 className='text-lg font-semibold text-center'>{store.store_name}</h2>
                <p><strong>Store ID:</strong> {store.store_id}</p>
                <p><strong>Location:</strong> {store.location}</p>
                <p><strong>Distance:</strong> {store.distance} km</p>
                <p><strong>Speciality:</strong> {store.important_details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Store;
