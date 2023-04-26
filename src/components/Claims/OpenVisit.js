import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Button, Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getClaimVisits } from '../../store/claimSlice';
import UsePagination from '../Common/UsePagination';

const OpenVisit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getClaimVisits(page));
  }, [dispatch, page]);

  const { openVisit, loading } = useSelector((state) => state.claims);

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
      render: (visit_status) => <p className={styles.tableStatus}>{visit_status}</p>,
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
          onClick={() => navigate('/claims/request', { state: { visitId: record } })}
          className={styles.tableAction}
          type="primary"
        >
          File Claim
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
        <p className={styles.tableTitle}>Closed Visits</p>
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
        rowKey={(record) => record?.visit_id}
        dataSource={openVisit?.content}
      />
      <UsePagination page={page} setPage={setPage} data={openVisit} />
    </div>
  );
};

export default OpenVisit;
