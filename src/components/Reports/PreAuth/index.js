import { Table } from 'antd';

import { useNavigate } from 'react-router-dom';

import DocView from '../../Common/DocumentView/DocViewFragment';
import ViewDocsModal from '../../Common/DocumentView/ViewDocsModal';
import { useState } from 'react';
import ViewDoc from '../ViewDoc';

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
      pre_auth_id: '30010024000',
      member_card_number: '56010024067',
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
      title: 'Pre-Auth ID',
      dataIndex: 'pre_auth_id',
      width: 110,
    },
    {
      title: 'Member No',
      dataIndex: 'member_card_number',
      width: 105,
    },
    {
      title: 'Payment invoice',
      dataIndex: 'smart',
      render: () => amountNo[Math.floor(Math.random() * 4)],
      width: 140,
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
      <Table rowKey="pre_auth_id" columns={columns} dataSource={[]} pagination={false} />
    </>
  );
};

export default AntTable;
