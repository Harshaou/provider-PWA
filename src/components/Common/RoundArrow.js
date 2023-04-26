import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';

const RoundArrow = ({ text, height, width }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <div
        style={{
          height: height ? height : 15,
          width: width ? width : 15,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#3ab44d',
        }}
      >
        <HiArrowNarrowRight size={8} color="white" />
      </div>
      <p style={{ fontSize: 12 }} className="mbZero">
        {text}
      </p>
    </div>
  );
};

export default RoundArrow;
