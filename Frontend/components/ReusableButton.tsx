import React from 'react';

interface ReusableButtonProps {
  text: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

const ReusableButton: React.FC<ReusableButtonProps> = ({ text, onClick, style }) => {
  return (
    <button onClick={onClick} style={{
      backgroundColor: '#675345', // Default background color
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      ...style // Spread additional styles if provided
    }}>
      {text}
    </button>
  );
};

export default ReusableButton;
