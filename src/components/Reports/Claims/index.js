import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import ViewDoc from '../ViewDoc';
import ViewDocsModal from '../../Common/DocumentView/ViewDocsModal';
import { useEffect, useState } from 'react';

const AntTable = () => {
  const navigate = useNavigate();
  const [doocs, setDoocs] = useState([]);
  const [isDocVisible, setIsDocVisible] = useState(false);

  const data = [];

  for (let i = 0; i < 5; i++) {
    data.push({
      id: i,
      key: i,
      name: 'John Joseph',
      memberNumber: '30010024000',
      claim_number: '56010024067',
      phone: '09343432348',
      documents: [],
      moreInfo: 'More info',
      approve: 'Approve',
      reject: 'Reject',
      status: 'Pending',
    });
  }

  const amountNo = ['RWF 4100', 'RWF 5402', 'RWF 3454', 'RWF 6884', 'RWF 234', 'RWF 9944'];

  const columns = [
    {
      title: 'Member No',
      dataIndex: 'memberNumber',
      width: 105,
    },

    {
      title: 'Type',
      dataIndex: 'type',
      render: () => <div>Inpatient</div>,
      width: 90,
    },
    {
      title: 'Payment invoice',
      dataIndex: 'invoice',
      render: () => amountNo[Math.floor(Math.random() * 4)],
      width: 140,
    },

    {
      title: 'Claim No',
      dataIndex: 'claim_number',
      width: 90,
    },

    {
      title: 'Documents',
      dataIndex: 'documents',
      width: 180,
      render: (docs) => <ViewDoc />,
    },
    {
      title: 'Comments',
      dataIndex: 'comment',
      render: () => <div>NA</div>,
      width: 127,
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={[]} pagination={false} rowKey="claim_number" />
      <ViewDocsModal docs={doocs} isDocVisible={isDocVisible} setIsDocVisible={setIsDocVisible} />
    </>
  );
};

export default AntTable;
