import { Divider } from 'antd';
import styles from './index.module.css';

const DropDown = ({ setFilter, setHideDropDown, hideDropDown }) => {
  return (
    <div
      onMouseLeave={() => setHideDropDown(true)}
      style={{
        padding: 10,
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 15,
        cursor: 'pointer',
      }}
    >
      {hideDropDown && (
        <style>
          {`.ant-table-filter-dropdown{
    display: none
  }`}
        </style>
      )}

      <div onClick={() => setFilter('Approved')} className={styles.dropdownMarginLine}>
        <div className={styles.greenRound}></div>
        <p className="mbZero">Approved</p>
      </div>

      <Divider />

      <div onClick={() => setFilter('Processing')} className={styles.dropdownMarginLine}>
        <div className={styles.violetRound}></div>
        <p className="mbZero">Processing</p>
      </div>

      <Divider />

      <div onClick={() => setFilter('Declined')} className={styles.dropdownMarginLine}>
        <div className={styles.pinkRound}></div>
        <p className="mbZero">Declined</p>
      </div>

      <Divider />

      <div onClick={() => setFilter('Received')} className={styles.dropdownMarginLine}>
        <div className={styles.blueRound}></div>
        <p className="mbZero"> Received</p>
      </div>
    </div>
  );
};

export default DropDown;
