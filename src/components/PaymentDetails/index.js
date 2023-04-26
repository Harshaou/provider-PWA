import { useState } from 'react';
import Main from '../../template';
import styles from './index.module.css';
import AntTable from './AntTable';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { Pagination } from 'antd';

const Index = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <Main>
      <Link
        to="/payments"
        style={{ display: 'flex', alignItems: 'center', marginBottom: 40, gap: 10 }}
      >
        <HiOutlineArrowLeft size={30} />
        <h3 style={{ marginBottom: 0, fontWeight: 700 }}>Batch payments</h3>
      </Link>
      <div style={{ display: 'flex', gap: 3 }}>
        <p className="mbZero">Batch Number </p>
        <IoMdArrowDropdown size={23} color="#f87d4e" />
      </div>
      <h3 style={{ fontSize: 26, fontWeight: 700, color: '#f87d4e' }}>#08373</h3>
      <div className="mtLarge">
        <div className={styles.table}>
          <AntTable />
        </div>
        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
          <Pagination size="small" total={50} />
        </div>
      </div>
      {/* <CommonModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} /> */}
    </Main>
  );
};

export default Index;
