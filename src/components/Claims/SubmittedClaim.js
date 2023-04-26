import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Select, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { statusText } from '../Common/HelperFunctions';
import { getSubmittedClaims, getSubmittedClaimsWithFilter, searchSubmittedClaims } from '../../store/claimSlice';
import { useDispatch, useSelector } from 'react-redux';
import UsePagination from '../Common/UsePagination';

const SubmittedClaim = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
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
      dispatch(getSubmittedClaims(page));
    }
  }, [dispatch, page, filterState]);

  const { submittedVisit, loading } = useSelector((state) => state.claims);

  useEffect(() => {
    if (filterState !== '') {
      dispatch(getSubmittedClaimsWithFilter({ page, status: filterState }));
    }
  }, [dispatch, filterState, page]);


  const columns = [
    {
      title: 'Claim ID',
      dataIndex: 'claim_id',
      width: '10%',
      render: (preauth_id) => <p className={styles.tableText}>{preauth_id}</p>,
    },
    {
      title: 'Patient Name',
      dataIndex: 'patient_name',
      width: '16%',
      render: (name) => <p className={styles.tableText}>{name}</p>,
    },
    {
      title: 'Member No.',
      dataIndex: 'member_number',
      width: '12%',
      render: (member_number) => <p className={styles.tableText}>{member_number}</p>,
    },
    {
      title: 'Attending Doctor',
      dataIndex: 'attending_doctor_name',
      width: '18%',
      render: (icd_code) => <p className={styles.tableText}>{icd_code || '--'}</p>,
    },
    {
      title: 'Claim Status',
      dataIndex: 'status',
      width: '14%',
      render: (status) => (
        <p className={styles.claimStatus} style={{ color: statusText(status) }}>
          {status}
        </p>
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'created_timestamp',
      width: '20%',
      render: (timestamp) => <p className={styles.tableText}>{timestamp}</p>,
    },
  ];

  const searchClaims = e => {
    if (e.target.value !== '') dispatch(searchSubmittedClaims({ query: e.target.value, page }))
    else dispatch(getSubmittedClaims(page));
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
        <p className={styles.tableTitle}>Claims</p>
        <Input
          className={styles.tableSearchBox}
          placeholder="Search Claims"
          onChange={searchClaims}
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
        dataSource={submittedVisit?.content}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              navigate(`/claims/${record.claim_id}`);
            },
          };
        }}
        columns={columns}
      />
      <UsePagination page={page} setPage={setPage} data={submittedVisit} />
    </div>
  );
};

export default SubmittedClaim;
