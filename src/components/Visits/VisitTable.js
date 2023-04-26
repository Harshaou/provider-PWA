import { Button, Table } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CloseVisit from '../Common/CloseVisit';
import moment from 'moment';

const VisitTable = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitNumber, setVisitNumber] = useState('');
  const navigate = useNavigate();

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
  return (
    <>
      <Table
        rowKey="id"
        style={{ paddingLeft: '10px' }}
        scroll={{ y: 250 }}
        pagination={false}
        dataSource={data}
        onRow={(record, rowIndex) => {
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
        columns={columns}
      />
      <CloseVisit
        visitNumber={visitNumber}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default VisitTable;
