"use client"
import React, {useState, useRef } from "react";
import  "../style/removeLiquidity.css";
import { FaArrowCircleDown } from "react-icons/fa";
import logo from '../public/image/near.jpeg'
import PairSearch from "./pairSearch";

export const RemoveLiquidity = () =>{
  const [progress, setProgress] = useState(0);


  const handleProgressChange = (event: any) => {
      setProgress(event.target.value);
  };

 

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      {/* Display Progress Bar */}
      <div style={{ width: '100%', backgroundColor: '#ddd', borderRadius: '5px', margin: '10px 0' }}>
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: '#4caf50',
            height: '20px',
            borderRadius: '5px',
            textAlign: 'center',
            color: 'white',
          }}
        >
          {progress}%
        </div>
      </div>

      {/* Slider to drag and set progress */}
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        style={{ width: '100%', marginTop: '20px' }}
      />

      {/* Buttons to set specific values */}
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setProgress(25)}>25%</button>
        <button onClick={() => setProgress(50)}>50%</button>
        <button onClick={() => setProgress(75)}>75%</button>
        <button onClick={() => setProgress(100)}>100%</button>
      </div>

      {/* Display current progress and calculated value */}
      <div style={{ marginTop: '20px' }}>
        <p>Current Progress: {progress}%</p>
        <p>Calculated Value (e.g., progress * 2): {progress * 2}</p>
      </div>
    
    </div>
  );
      
}
