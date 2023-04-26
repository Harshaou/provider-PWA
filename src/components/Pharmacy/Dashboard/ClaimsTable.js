import { Button, Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import CloseVisit from '../../Common/CloseVisit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVisitDashboard } from '../../../store/dashboardSlice';
import moment from 'moment';
import { baseUrl } from '../../../utils';
import styles from './index.module.css'
import StatusDot from '../common/StatusDot'

const ClaimsTable = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [properties, setProperties] = useState([])

  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(false)

  const [search, setSearch] = useState('')
  const [claimSearch, setClaimSearch] = useState([])

  useEffect(() => {
    (async () => {
      setLoading(true)
      await fetch(`${baseUrl}/pharmacy/claims?status=Pending`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('x-auth-token')}`,
        },
      }).then(res => res.json())
        .then(res => {
          if (res?.api?.responseCode === 2040) {
            setClaims(res?.result?.content, setProperties(res?.result?.property))
          }
          else {
            console.log(res?.message)
          }
        }).catch(e => console.log(e))
        .finally(() => setLoading(false))
    })()
  }, [])

  useEffect(() => {
    if (search !== '') {
      setClaimSearch(claims.filter(c => String(c?.patient_name)?.toLowerCase().includes(String(search).toLowerCase()) || String(c?.member_number)?.toLowerCase().includes(String(search).toLowerCase())))
    }
  }, [search])


  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        height: 340,
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 24,
        }}
      >
        <p style={{ marginBottom: 0 }}>Pending Claims</p>
        <Input
          placeholder="Search Pending Claims"
          style={{
            width: 250,
            height: 36,
            borderRadius: 10,
            marginLeft: '15px'
          }}
          onChange={e => setSearch(e.target.value)}
          prefix={<SearchOutlined />}
        />
      </div>
      <Table
        scroll={{ y: '20vh' }}
        rowKey='claim_id'
        dataSource={search === '' ? claims : claimSearch}
        loading={loading}
        pagination={false}
        style={{ marginTop: '25px', margin: '0px 10px' }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              console.log(record?.claim_id)
              navigate('/claims/' + record?.claim_id);

            },
          };
        }}
        columns={[
          {
            title: 'Claim ID',
            dataIndex: 'claim_id',
            render: e => <p className={styles.tableValue}>{e}</p>
          },
          {
            title: 'Patient Name',
            dataIndex: 'patient_name',
            render: e => <p className={styles.tableValue}>{e}</p>
          },
          {
            title: 'Member Number',
            dataIndex: 'member_number',
            render: e => <p className={styles.tableValue}>{e}</p>
          },
          {
            title: 'Claim Amount',
            dataIndex: '',
            render: e => <p className={styles.tableValue}>{e?.claim_amount + ' ' + e?.currency}</p>
          },
          {
            title: 'Status',
            dataIndex: 'status',
            render: e => <div style={{ display: 'flex', gap: '5px' }}>
              <StatusDot status={e} />
              <p className={styles.tableValue}>{e}</p>
            </div>
          },
          {
            title: 'Timestamp',
            dataIndex: 'created_timestamp',
            render: e => <p className={styles.tableValue}>{e}</p>
          }
        ]}
      />
      <p
        onClick={() => navigate('claims')}
        style={{
          position: 'absolute',
          color: '#3AB44D',
          fontWeight: 500,
          cursor: 'pointer',
          bottom: 10,
          right: 30,
        }}
      >
        View All Claims
      </p>
    </div>
  );
};

export default ClaimsTable;
