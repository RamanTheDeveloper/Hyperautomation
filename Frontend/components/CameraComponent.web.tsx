import React, { useState, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';

interface CameraComponentProps {
  onSubmit: (photo: File) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onSubmit }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onSubmit(file);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{
        width: '50%',
        height: '60%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ccc',
        borderRadius: '10px',
        position: 'relative',
        top: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        padding: '20px'
      }}>
      {selectedImage && (
        <button onClick={handleClear} style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}>
          <FaTrash />
        </button>
      )}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '50%', maxHeight: '50%', objectFit: 'contain' }} />
        ) : (
          <label htmlFor="fileInput" style={{
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: '#ccc',
            color: '#333',
            cursor: 'pointer',
            display: 'flex', // Ensures the label acts as a flex container
            justifyContent: 'center', // Centers text horizontally in the label
            alignItems: 'center', // Centers text vertically in the label
            width: '30%', // Adjust the width as per your design requirement
            height: 'auto' // Ensures the label does not take full height
          }}>
            Click here to start
          </label>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
        id="fileInput"
      />
    </div>
  );
};

export default CameraComponent;
