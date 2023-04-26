import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getSubmittedPrescriptions, searchSubmittedPrescriptions } from '../../store/prescriptionSlice';
import UsePagination from '../Common/UsePagination';

const SubmittedClaim = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const { data, loading } = useSelector((state) => state.prescription);

  useEffect(() => {
    dispatch(getSubmittedPrescriptions(page));
  }, [dispatch, page]);

  const columns = [
    {
      title: 'Prescription ID',
      dataIndex: 'prescription_id',
      width: 100,
    },
    {
      title: 'Visit ID',
      dataIndex: 'visit_id',
      width: 105,
    },
    {
      title: 'Patient Name',
      dataIndex: 'patient_name',
      width: 150,
    },
    {
      title: 'Member Number',
      dataIndex: 'member_number',
      width: 70,
    },
    {
      title: 'Attending Doctor',
      dataIndex: 'attending_doctor_name',
      width: 150,
    },
    {
      title: 'Date & Time',
      dataIndex: 'created_timestamp',
      width: 120,
    },
  ];

  const searchPrescription = e => {
    if (e.target.value !== '') dispatch(searchSubmittedPrescriptions({ query: e.target.value, page }))
    else dispatch(getSubmittedPrescriptions(page));
  }


  return (
    <div className={styles.tableContainer}>
      <div
        style={{
          display: 'flex',
          marginTop: '20px',
          padding: '24px',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        <p className={styles.tableTitle}>Prescriptions</p>
        <Input
          className={styles.tableSearchBox}
          placeholder="Search Prescription"
          onChange={searchPrescription}
          allowClear
          prefix={
            <SearchOutlined style={{ fontSize: '24px', marginLeft: '5px', marginRight: '10px' }} />
          }
        />
      </div>
      <Table
        loading={loading}
        style={{ paddingLeft: '10px' }}
        pagination={false}
        dataSource={data?.content}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              navigate(`/prescription/${record.prescription_id}`);
            },
          };
        }}
        columns={columns}
      />
      <UsePagination page={page} setPage={setPage} data={data} />
    </div>
  );
};

export default SubmittedClaim;
