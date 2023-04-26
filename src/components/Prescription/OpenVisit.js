import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Button, Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import UsePagination from '../Common/UsePagination';
import { getPrescriptionVisits } from '../../store/prescriptionSlice';

const OpenVisit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getPrescriptionVisits(page));
  }, [dispatch, page]);

  const { openVisits, loading } = useSelector((state) => state.prescription);

  const columns = [
    {
      title: 'Visit ID',
      dataIndex: 'visit_id',
      width: 90,
    },
    {
      title: 'Patient Name',
      dataIndex: 'member_name',

      width: 105,
    },
    {
      title: 'Member No.',
      dataIndex: 'member_number',
      width: 100,
    },
    {
      title: 'Attending Doctor',
      dataIndex: 'attending_doctor_name',
      render: (name) => <p className={styles.tableText}>{name || '--'}</p>,

      width: 100,
    },
    {
      title: 'Visit Status',
      dataIndex: 'visit_status',
      render: (status) => (
        <p style={{ color: '#3AB44D', fontWeight: 500, marginBottom: 0 }}>{status}</p>
      ),
      width: 90,
    },
    {
      title: 'Visit Timestamps',
      dataIndex: 'visit_created_on',
      width: 110,
    },
    {
      title: 'Action',
      dataIndex: 'visit_id',
      width: '18%',
      render: (_, record) => (
        <Button
          onClick={() => navigate('/prescriptions/add', { state: { visit: record } })}
          className={styles.tableAction}
          type="primary"
        >
          Create Prescription
        </Button>
      ),
    },
  ];

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
        <p className={styles.tableTitle}>Open Visits</p>
        <Input
          className={styles.tableSearchBox}
          placeholder="Search Visits"
          prefix={
            <SearchOutlined style={{ fontSize: '24px', marginLeft: '5px', marginRight: '10px' }} />
          }
        />
      </div>
      <Table
        style={{ paddingLeft: '10px' }}
        loading={loading}
        pagination={false}
        columns={columns}
        dataSource={openVisits?.content}
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              console.log(e.target.innerText);
              if (e.target.innerText === 'Create Prescription') {
                e.stopPropagation();
              } else {
                navigate(`/visits/${record.visit_id}`);
              }
            },
          };
        }}
      />
      <UsePagination page={page} setPage={setPage} openVisits={openVisits} />
    </div>
  );
};

export default OpenVisit;
