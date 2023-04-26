import React from 'react';

const CustomButton = ({ text, backgroundColor, color, width, height, fontWeight, fontSize }) => {
  return (
    <div
      style={{
        borderRadius: 20,
        backgroundColor: backgroundColor,
        cursor: 'pointer',
        color: color,
        width: width,
        textAlign: 'center',
        padding: 5,
        height: height ? height : 30,
        fontWeight: fontWeight ? fontWeight : 'normal',
        fontSize: fontSize ? fontSize : 12,
      }}
    >
      {text}
    </div>
  );
};

export default CustomButton;
