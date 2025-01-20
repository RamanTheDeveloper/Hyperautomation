import React, { useState, useRef } from 'react';

interface CameraComponentProps {
  onSubmit: (photo: File) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onSubmit }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
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
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected" style={{ width: 300, height: 300 }} />
          <button onClick={handleClear}>Clear</button>
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
