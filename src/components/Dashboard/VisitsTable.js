import { Button, Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import CloseVisit from '../Common/CloseVisit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVisitDashboard } from '../../store/dashboardSlice';
import moment from 'moment';

const VisitsTable = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitNumber, setVisitNumber] = useState('');

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getVisitDashboard());
  }, []);

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
      render: (name) => (name ? name : <>--</>),
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
      render: (visit_id) => (
        <div id="documentCell">
          <Button
            onClick={() => {
              setVisitNumber(visit_id);
              setIsModalOpen(true);
            }}
            style={{ width: 120 }}
            size="small"
            type="ghost"
            danger
            shape="round"
          >
            Close Visit
          </Button>
        </div>
      ),
      width: 110,
    },
  ];

  const [search, setSearch] = useState('')
  const [visitSearch, setVisitSearch] = useState([])

  useEffect(() => {
    if (search !== '') {
      setVisitSearch(data?.content?.filter(c => String(c?.patient_name)?.toLowerCase().includes(String(search).toLowerCase()) || String(c?.member_number)?.toLowerCase().includes(String(search).toLowerCase())))
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
        <p style={{ marginBottom: 0 }}>Recent Visits</p>
        <Input
          placeholder="Search Visit"
          style={{
            width: 250,
            height: 36,
            borderRadius: 10,
          }}
          onChange={e => setSearch(e.target.value)}
          prefix={<SearchOutlined />}
        />
      </div>
      <Table
        onRow={(record) => {
          return {
            onClick: (e) => {
              if (e.target.innerText === 'Close Visit') {
                e.preventDefault();
              } else {
                navigate(`/visits/${record.visit_id}`);
              }
            },
          };
        }}
        rowKey="id"
        columns={columns}
        dataSource={search === '' ? data?.content : visitSearch}
        pagination={false}
        scroll={{
          y: 140,
        }}
      />
      <p
        onClick={() => navigate('visits')}
        style={{
          position: 'absolute',
          color: '#3AB44D',
          fontWeight: 500,
          cursor: 'pointer',
          bottom: 10,
          right: 30,
        }}
      >
        View all visits
      </p>
      <CloseVisit
        page="dashboard"
        visitNumber={visitNumber}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default VisitsTable;
