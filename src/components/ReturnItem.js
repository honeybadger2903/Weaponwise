import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'; // Import Supabase
// import './ReturnTable.css';
import Navbar from "./Navbar"


const supabaseUrl = 'https://frzuszxndrfvqcffvzta.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyenVzenhuZHJmdnFjZmZ2enRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MjQxODMsImV4cCI6MjA0NjMwMDE4M30.9VRG6CmrrctgzYBh5_plBq_2ehGXW8GyVUfQt0vTrJA';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ReturnTable = () => {
  const [issuedData, setIssuedData] = useState([]); // State to store fetched data

  // Function to fetch data with `return_value` set to false
  const fetchUnreturnedData = async () => {
    const { data, error } = await supabase
      .from('issued-day-to-day')
      .select(`

        army_no,
        arms_unique_code,
        purpose,
        date,
        time,
        index_no,
        army_rank,
        return_status,
        army_no_to_name(name) // Fetch name from armyno-to-name table
      `)
      .eq('return_status', false); // Filter rows with return_value = false

    if (error) {
      console.error('Error fetching unreturned items:', error);
      return [];
    }

    return data;
  };

  // Fetch unreturned data when the component is mounted
  useEffect(() => {
    const getData = async () => {
      const data = await fetchUnreturnedData();
      setIssuedData(data); // Update state with fetched data
    };

    getData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to handle return button click
  const handleReturnClick = async (armsUniqueCode, indexNo) => {
    try {
      // Step 1: Fetch the data to be moved
      const { data: issuedItem, error: fetchError } = await supabase
        .from('issued-day-to-day')
        .select(`army_no,
        arms_unique_code,
        name,
        purpose,
        date,
        time,
        index_no,
        army_rank
        `)
        .eq('arms_unique_code', armsUniqueCode)
        .single();
      if (fetchError || !issuedItem) {
        console.error('Error fetching issued item:', fetchError);
        alert('Failed to fetch issued item. Please try again.');
        return;
      }

      // Step 2: Insert the data into completed-table
      const { error: insertError } = await supabase
        .from('completed-table')
        .insert([issuedItem]);
      if (insertError) {
        console.error('Error inserting into completed-table:', insertError);
        alert('Failed to mark item as completed. Please try again.');
        return;
      }

      // Step 3: Delete the data from issued-day-to-day
      const { error: deleteError } = await supabase
        .from('issued-day-to-day')
        .delete()
        .eq('arms_unique_code', armsUniqueCode);
      if (deleteError) {
        console.error('Error deleting from issued-day-to-day:', deleteError);
        alert('Failed to remove item from issued-day-to-day. Please try again.');
        return;
      }

      // Step 4: Update the inventory
      const { error: inventoryError } = await supabase
        .rpc('update_inventory', { index_no: indexNo });
      if (inventoryError) {
        console.error('Error updating inventory:', inventoryError);
        alert('Failed to update inventory. Please try again.');
        return;
      }

      // Step 5: Remove item from UI
      setIssuedData((prevData) =>
        prevData.filter((item) => item.arms_unique_code !== armsUniqueCode)
      );

      alert('Item marked as returned and moved to completed table successfully.');
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };



  return (
    <div>
      <Navbar />{   }

    <div className="table-container">
      <h2>Unreturned Issued Items</h2>
      {issuedData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Army No</th>
              <th>Name</th>
              <th>Army Rank</th>
              <th>Index No</th>
              <th>Arms Unique Code</th>
              <th>Purpose</th>
              <th>Date</th>
              <th>Time Of Issue</th>
              <th>Action</th> 
            </tr>
          </thead>
          <tbody>
            {issuedData.map((item, index) => (
              <tr key={index}>
                <td>{item.army_no}</td>
                <td>{item.army_no_to_name?.name}</td> 
                <td>{item.army_rank}</td>
                <td>{item.index_no}</td>
                <td>{item.arms_unique_code}</td>
                <td>{item.purpose}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>
                  <button
                    onClick={() => handleReturnClick(item.arms_unique_code,item.index_no)}
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No unreturned items found.</p>
      )}
    </div>
    </div>
  );
};

export default ReturnTable;
