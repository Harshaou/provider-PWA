import React from 'react';

const ColorRound = ({ height, width, color }) => (
  <div
    style={{
      height: height ? height : 10,
      width: width ? width : 10,
      backgroundColor: color,
      borderRadius: '50%',
    }}
  />
);

export default ColorRound;
