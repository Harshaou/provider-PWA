import React from 'react';
import plusSign from '../../img/plusSign.webp';

const AddBox = ({ setIsModalVisible, value }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={() => setIsModalVisible(true)}>
        <div className="addBox">
          <img src={plusSign} style={{ height: 40 }} alt="" />
          <div className="addBoxWhite" style={{ minWidth: 200 }}>
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBox;
