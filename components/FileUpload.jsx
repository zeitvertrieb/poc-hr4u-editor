'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { STORAGE_KEY } from '@/lib/constants';

export default function FileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const processFile = (file) => {
    if (file && file.type === 'application/json') {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const text = e.target.result;
          localStorage.setItem(STORAGE_KEY, text);
          console.log('JSON data saved to localStorage.');

          router.push('/content');
        } catch (err) {
          console.error('Error reading or saving file:', err);
          alert('Fehler beim Lesen der JSON-Datei.');
        }
      };

      reader.onerror = (e) => {
        console.error('FileReader error:', e);
        alert('Datei konnte nicht gelesen werden.');
      };

      reader.readAsText(file);
    } else {
      alert('Bitte laden Sie eine gültige .json-Datei hoch.');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <label htmlFor="file-upload" className="block text-sm font-medium mb-1">
        Profil hochladen *
      </label>
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${isDragging ? 'border-interactive bg-interactive-active' : 'border-interactive bg-interactive-active'}
        `}
        onClick={onButtonClick}
      >
        <FontAwesomeIcon icon={faCloudUploadAlt} className="mb-4" size="xl" />

        <p className="font-medium">Datei hier ablegen</p>
        <p className="my-2">oder</p>

        <span className="bg-interactive text-text-on-interactive font-bold py-2 px-6 transition-colors hover:bg-interactive-hover">
          DATEI AUSWÄHLEN
        </span>

        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleChange}
          accept=".json"
        />
      </div>
      <p className="text-xs mt-2">Akzeptiertes Format: .json</p>
    </div>
  );
}
