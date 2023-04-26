import { useEffect, useState } from 'react';
import Main from '../../template';
import { useDispatch, useSelector } from 'react-redux';
import { getPrescriptionDetail } from '../../store/prescriptionDetail';
import { Link, useParams } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import styles from './index.module.css';
import CollapseInfo from './CollapseWithInfo';
import { Table } from 'antd';

const Index = () => {
  const { data } = useSelector((state) => state.prescriptionDetail);
  const { prescriptionNumber } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPrescriptionDetail(prescriptionNumber));
  }, []);

  const columns = [
    {
      title: 'Generic Name',
      dataIndex: 'generic_name',
      width: 160,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: 105,
    },
    {
      title: 'Instructions',
      dataIndex: 'instructions',
      width: 150,
    },
  ];

  return (
    <Main>
      <Link to={'/prescription'}>
        <div className={styles.backContainer}>
          <HiOutlineArrowLeft size={30} />
          <h3 style={{ marginBottom: 0, fontWeight: 700 }}>Prescription</h3>
        </div>
      </Link>
      <CollapseInfo info={data} />
      <div style={{ marginTop: 30 }}>
        <div style={{ backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
          <div style={{ marginLeft: 18 }}>
            <p style={{ fontWeight: 600, marginBottom: 5, fontSize: 18 }}>Medications prescribed</p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 20,
              }}
            >
              <div style={{ width: '35%' }}>
                <p style={{ marginBottom: 0, fontWeight: 500 }}>Disease</p>
                <p style={{ color: '#737373' }}>{data?.disease}</p>
              </div>

              <div style={{ width: '23%' }}>
                <p style={{ marginBottom: 0, fontWeight: 500 }}>ICD Code</p>
                <p style={{ color: '#737373' }}>{data?.icd_code}</p>
              </div>

              <div style={{ width: '42%' }}>
                <p style={{ marginBottom: 0, fontWeight: 500 }}>Prescription Unique Code</p>
                <p style={{ color: '#737373' }}>{data?.prescription_meta?.prescription_otp}</p>
              </div>
            </div>
          </div>
          <div style={{ width: '90%', marginTop: 20, marginBottom: 20 }}>
            <Table
              className="prescriptionDetail"
              rowKey="id"
              columns={columns}
              dataSource={data?.prescribed_medicines}
              pagination={false}
              scroll={{
                y: 175,
              }}
            />
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Index;
