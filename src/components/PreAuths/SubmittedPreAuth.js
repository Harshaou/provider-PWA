import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Input, Select, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSubmittedPreAuth, getSubmittedPreAuthWithFilter, searchSubmittedPreAuth } from '../../store/preAuthSlice';
import { statusText } from '../Common/HelperFunctions';
import UsePagination from '../Common/UsePagination';

const SubmittedPreAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [filterState, setFilter] = useState('');

  let filters = [
    {
      label: 'Pending',
      value: 'Pending',
    },
    {
      label: 'In Progress',
      value: 'In_Progress',
    },
    {
      label: 'Declined',
      value: 'Declined',
    },
    {
      label: 'Information Required',
      value: 'Information_Required',
    },
    {
      label: 'Approved',
      value: 'Approved',
    },
  ];

  useEffect(() => {
    if (filterState === '') {
      dispatch(getSubmittedPreAuth(page));
    }
  }, [dispatch, page, filterState]);

  useEffect(() => {
    if (filterState !== '') {
      dispatch(getSubmittedPreAuthWithFilter({ page, status: filterState }));
    }
  }, [dispatch, page, filterState]);

  const { data, loading } = useSelector((state) => state.preAuth);

  const columns = [
    {
      key: 'preauth_id',
      title: 'Pre-Auth ID',
      dataIndex: 'pre_authorisation_id',
      width: '10%',
      render: (preauth_id) => <p className={styles.tableText}>{preauth_id}</p>,
    },
    {
      key: 'name',
      title: 'Patient Name',
      dataIndex: 'patient_name',
      width: '15%',
      render: (name) => <p className={styles.tableText}>{name}</p>,
    },
    {
      key: 'member_number',
      title: 'Member No.',
      dataIndex: 'member_number',
      width: '12%',
      render: (member_number) => <p className={styles.tableText}>{member_number}</p>,
    },
    {
      key: 'Attending Doctor',
      title: 'Attending Doctor',
      dataIndex: 'attending_doctor_name',
      width: '18%',
      render: (doctorName) => <p className={styles.tableText}>{doctorName || '--'}</p>,
    },
    {
      key: 'preauth_status',
      title: 'Pre-Auth Status',
      dataIndex: 'status',
      width: '10%',
      render: (status) => (
        <p className={styles.tableStatus} style={{ color: statusText(status) }}>
          {status}
        </p>
      ),
    },
    {
      key: 'preauth_timestamp',
      title: 'Pre-Auth Timestamp',
      dataIndex: 'created_timestamp',
      width: '15%',
      render: (timestamp) => <p className={styles.tableText}>{timestamp}</p>,
    },
  ];

  const searchPreAuth = e => {
    if (e.target.value !== '') dispatch(searchSubmittedPreAuth({ query: e.target.value, page }))
    else dispatch(getSubmittedPreAuth(page));
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
        <p className={styles.tableTitle}>Pre-Auths</p>
        <Input
          className={styles.tableSearchBox}
          placeholder="Search Pre-Auths"
          onChange={searchPreAuth}
          allowClear
          prefix={
            <SearchOutlined style={{ fontSize: '24px', marginLeft: '5px', marginRight: '10px' }} />
          }
        />
        <Select
          onChange={(e) => {
            if (e) {
              setFilter(e);
              setPage(0);
            } else {
              setFilter('');
            }
          }}
          allowClear
          placeholder="Filter Status"
          style={{ width: 220 }}
          options={filters}
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
              navigate(`/pre-auths/${record?.pre_authorisation_id}`);
            },
          };
        }}
        columns={columns}
      />
      <UsePagination page={page} setPage={setPage} data={data} />
    </div>
  );
};

export default SubmittedPreAuth;
