import React from 'react';
import { Link } from 'react-router-dom';
import plusSign from '../../img/plusSign.webp';

const AddBox = ({ value, to, width }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Link to={to}>
        <div className="addBox">
          <img src={plusSign} style={{ height: 40 }} alt="" />
          <div className="addBoxWhite" style={{ minWidth: width ? width : 200 }}>
            {value}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AddBox;
