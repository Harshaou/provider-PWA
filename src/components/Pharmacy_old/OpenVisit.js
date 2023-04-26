import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Button, Input, Pagination, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVisitsPreAuth } from '../../store/preAuthSlice';
import moment from 'moment';
import UsePagination from '../Common/UsePagination';
import { getPharmacyClaimList } from '../../store/pharmacySlice';

const OpenVisit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  // useEffect(() => {
  //   dispatch(getPharmacyClaimList({ page }));
  // }, [dispatch, page]);

  // const { openVisit, loading } = useSelector((state) => state.preAuth);
  const columns = [
    {
      title: 'Prescription OTP',
      dataIndex: 'prescription_code',
      width: 100,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: 100,
    },
    {
      title: 'Price/unit',
      dataIndex: 'price',
      width: 100,
    },
    {
      title: 'Price total',
      dataIndex: '',
      width: 100,
    },
    {
      title: 'Date & Time',
      dataIndex: 'meta',
      render: (item) => <>{moment(item?.claim_created_timestamp).format('MMMM Do YYYY, H:mm ')}</>,
      width: 100,
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
        <p className={styles.tableTitle}>Claim</p>
        <Input
          className={styles.tableSearchBox}
          placeholder="Search Claim"
          prefix={
            <SearchOutlined style={{ fontSize: '24px', marginLeft: '5px', marginRight: '10px' }} />
          }
        />
      </div>
      <Table
        style={{ paddingLeft: '10px' }}
        pagination={false}
        columns={columns}
        dataSource={[]}
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
      <UsePagination page={page} setPage={setPage} data={null} />
    </div>
  );
};

export default OpenVisit;
