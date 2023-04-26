import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { resetContent } from '../../store/reportSlice';

const ColumnItem = ({ data, setIsModalVisible, setTitle }) => {
  const dispatch = useDispatch();

  const handleClick = (title) => {
    dispatch(resetContent());
    setIsModalVisible(true);
    setTitle(title);
  };

  return data.map((item, index) => (
    <div
      key={index}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 15,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        width: '32%',
        minWidth: '250px',
      }}
    >
      <img src={item.img} alt="" style={{ objectFit: 'contain', maxWidth: 100 }} />
      <div style={{ width: '100%' }}>
        <p
          style={{
            marginBottom: 15,
            fontSize: 18,
            lineHeight: 0,
            color: '#020202',
          }}
        >
          {item.title}{' '}
        </p>
        <p style={{ fontWeight: 800, fontSize: 26, marginBottom: 0 }}>{item.count}</p>
        <Button
          onClick={() => handleClick(item.title)}
          size="small"
          style={{
            backgroundColor: item.color,
            color: 'white',
            borderColor: item.color,
            width: '50%',
            minWidth: '60px',
          }}
          shape="round"
        >
          Filter
        </Button>
      </div>
    </div>
  ));
};

export default ColumnItem;
