import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Button, Input, Pagination, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVisitsPreAuth } from '../../store/preAuthSlice';
import moment from 'moment';
import UsePagination from '../Common/UsePagination';

const OpenVisit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getVisitsPreAuth(page));
  }, [dispatch, page]);

  const { openVisit, loading } = useSelector((state) => state.preAuth);

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
      render: (_, record) => (
        <Button
          onClick={() => navigate('/pre-auths/request/', { state: { visitId: record } })}
          className={styles.tableAction}
          type="primary"
        >
          Request Pre-auth
        </Button>
      ),
      width: 110,
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
        loading={loading}
        style={{ paddingLeft: '10px' }}
        pagination={false}
        columns={columns}
        dataSource={openVisit?.content}
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              console.log(e.target.innerText);
              if (e.target.innerText === 'Request Pre-auth') {
                e.stopPropagation();
              } else {
                navigate(`/visits/${record.visit_id}`);
              }
            },
          };
        }}
      />
      <UsePagination page={page} setPage={setPage} data={openVisit} />
    </div>
  );
};

export default OpenVisit;
