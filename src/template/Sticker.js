import React from 'react';
import { Link } from 'react-router-dom';
import Sticker from '../img/sticker.png';

const StickerComponent = ({ height, width, text, open }) => {
  return (
    <div
      style={{
        marginTop: open ? '50px' : '0px',
        height: height ? height : 100,
        width: width ? width : 80,
        backgroundColor: 'white',
        borderRadius: '20%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 30,
      }}
    >
      <img
        src={Sticker}
        style={{ marginTop: open ? -50 : -45, marginRight: open ? 30 : 0, height: open ? 95 : 75 }}
        alt=""
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
          alignItems: 'flex-end',
          marginTop: 5,
          lineHeight: 1.2,
        }}
      >
        <p className="mbZero" style={{ fontSize: 9, fontWeight: 800 }}>
          Urgent
        </p>
        <p className="mbZero" style={{ fontSize: 12, fontWeight: 800, color: '#f87d4e' }}>
          Claims
        </p>

        {open && (
          <Link
            to="/claims"
            style={{
              height: 22,
              width: '70%',
              backgroundColor: '#f87d4e',
              fontSize: 9,
              fontWeight: 500,
              color: 'white',
              borderRadius: 10,
              display: 'grid',
              placeItems: 'center',
              marginTop: 20,
              cursor: 'pointer',
            }}
          >
            View more
          </Link>
        )}
      </div>
      {!open && (
        <div
          style={{
            height: 22,
            width: '80%',
            backgroundColor: '#f87d4e',
            fontSize: 8,
            fontWeight: 500,
            color: 'white',
            borderRadius: 10,
            display: 'grid',
            placeItems: 'center',
            marginTop: 10,
            cursor: 'pointer',
          }}
        >
          View more
        </div>
      )}
    </div>
  );
};

export default StickerComponent;
