import React from 'react';

const TodayTip = () => {
  return (
    <div
      style={{
        backgroundColor: '#E5ECF6',
        width: '25%',
        padding: 20,
        borderRadius: 15,
      }}
    >
      <p style={{ fontWeight: 500, marginTop: 5 }}>Tip of the Day!</p>
      <p
        style={{
          color: '#262626',
        }}
      >
        Streamline patient visits and claim filings with our online tool.
        <br />
        <br />
        Submitting a pre-authorization and claim online can save time and hassle, allowing you to
        focus on what really matters - your patients.
      </p>
    </div>
  );
};

export default TodayTip;
