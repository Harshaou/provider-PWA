import { useEffect, useState } from 'react';
import Main from '../../../template';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import HamburgerMenu from '../../Common/HamburgerMenu';
import { getPrescriptionDetail } from '../../../store/prescriptionSlice';
import styles from './index.module.css';
import { baseUrl } from '../../../utils';
import MemberCard from '../../Common/MemberCard';
const Index = () => {
  const { prescriptionNumber } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPrescriptionDetail(prescriptionNumber));
  }, []);

  const { prescriptionDetail } = useSelector((state) => state.prescription);

  const columns = [
    {
      title: 'Drug Name',
      dataIndex: 'drug_name',
      width: 160,
    },
    {
      title: 'Drug Code',
      dataIndex: 'drug_code',
      width: 160,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: 105,
    },
    {
      title: 'Instructions',
      dataIndex: 'instruction',
      render: (text) => (text ? text : '__'),
      width: 150,
    },
  ];

  const [memberHover, setMemberHover] = useState(false);
  const [member, setMemberData] = useState();

  return (
    <Main>
      {prescriptionDetail && (
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', marginTop: '-50px' }}>
          <a href="/Prescription" className={styles.breadCrumb1}>
            Prescription /
          </a>
          <MemberCard setHover={setMemberHover} visitID={prescriptionDetail?.visit_id} />
        </div>
      )}

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
              <div style={{ width: '42%' }}>
                <p style={{ marginBottom: 0, fontWeight: 500 }}>Prescription OTP</p>
                <p style={{ color: '#737373' }}>{prescriptionDetail?.prescription_otp}</p>
              </div>
            </div>
          </div>
          <div style={{ width: '90%', marginTop: 20, marginBottom: 20 }}>
            <Table
              className=""
              rowKey="id"
              columns={columns}
              dataSource={prescriptionDetail?.medicines}
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
