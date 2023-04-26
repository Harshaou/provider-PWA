import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from 'antd';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { getMemberStatusAndInfo, resetMember } from '../../../store/preAuthSlice';
import { preventMinus } from '../../Common/HelperFunctions';
import styles from '../index.module.css';

const MemberSearch = ({ member, setCardNumber, cardNumber }) => {
  const dispatch = useDispatch();
  const [wrongCardNumber, setWrongCardNumber] = useState(false);

  const handleSearch = () => {
    dispatch(resetMember());
    if (cardNumber && cardNumber.length === 11) {
      setWrongCardNumber(false);
      dispatch(getMemberStatusAndInfo(cardNumber));
    } else {
      setWrongCardNumber(true);
    }
  };

  const handleCardNumber = (e) => {
    setCardNumber(e);
    if (e === '') {
      dispatch(resetMember());
    }
  };

  return (
    <div style={{ width: '40%' }}>
      <h5 style={{ fontWeight: 700 }}>Member Number</h5>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 5,
          alignItems: 'center',
        }}
      >
        <Input
          onPressEnter={handleSearch}
          prefix={
            member.isSearchLoading ? (
              <LoadingOutlined className={styles.searchIcon} />
            ) : (
              <SearchOutlined className={styles.searchIcon} />
            )
          }
          style={{ borderRadius: 15 }}
          placeholder="Search Member Number"
          type="number"
          value={cardNumber}
          onKeyPress={preventMinus}
          allowClear
          onChange={(e) => handleCardNumber(e.target.value)}
        />
        <Button
          disabled={cardNumber && cardNumber.length < 1}
          onClick={handleSearch}
          type="primary"
          shape="round"
        >
          Go
        </Button>
      </div>
      {wrongCardNumber && (
        <p style={{ marginBottom: 0, marginTop: 5, color: 'red', fontSize: 12 }}>
          Card number must be 11 digit
        </p>
      )}
    </div>
  );
};

export default MemberSearch;
