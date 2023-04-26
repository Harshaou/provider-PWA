import { Divider } from 'antd';
import styles from './index.module.css';

const DropDown = () => {
  return (
    <div
      style={{
        padding: 10,
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 15,
      }}
    >
      <div className={styles.dropdownMarginLine}>
        <div className={styles.greenRound}></div>
        <p className="mbZero">Approved</p>
      </div>

      <Divider />

      <div className={styles.dropdownMarginLine}>
        <div className={styles.pinkRound}></div>
        <p className="mbZero">Rejected</p>
      </div>

      <Divider />

      <div className={styles.dropdownMarginLine}>
        <div className={styles.voiletRound}></div>
        <p className="mbZero">In-process</p>
      </div>

      <Divider />

      <div className={styles.dropdownMarginLine}>
        <div className={styles.skyblue}></div>
        <p className="mbZero">Settled</p>
      </div>
    </div>
  );
};

export default DropDown;
