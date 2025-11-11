'use client';

import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'; 

export default function FileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  // ... (rest of your state and handlers) ...
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("File dropped:", e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log("File selected:", e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    /* FIX 5: Removed the invalid "justify-center" and "align-center" classes.
    */
    <div>
      <label htmlFor="file-upload" className="block text-sm font-medium text-gray-900 mb-1">
        Profil hochladen *
      </label>
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${isDragging ? 'border-primary bg-primary/10' : 'border-gray-400 bg-white hover:bg-gray-50'}
        `}
        onClick={onButtonClick} 
      >
        <FontAwesomeIcon icon={faCloudUploadAlt} className="text-gray-500 mb-4" size="3x" />
        
        <p className="text-gray-600 font-medium">Datei hier ablegen</p>
        <p className="text-gray-500 my-2">oder</p>
        
        <span className="bg-primary text-white font-bold py-2 px-6 rounded transition-colors">
          DATEI AUSWÄHLEN
        </span>
        
        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleChange}
          accept=".docx"
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">Akzeptiertes Format: .docx</p>
    </div>
  );
}