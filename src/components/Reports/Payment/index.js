import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ViewDoc from '../ViewDoc';
import ViewDocsModal from '../../Common/DocumentView/ViewDocsModal';

import { statusDot } from '../../Common/HelperFunctions';

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
      payment_id: '30010024000',
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
      title: 'Payment ID',
      dataIndex: 'payment_id',
      width: 105,
    },
    {
      title: 'Payment invoice',
      dataIndex: 'payment_invoice',
      render: () => amountNo[Math.floor(Math.random() * 4)],
      width: 140,
    },
    {
      title: 'Claim Number',
      dataIndex: 'claim_number',
      width: 100,
    },
    {
      title: 'Payment invoice',
      dataIndex: 'payment_invoice',
      render: () => amountNo[Math.floor(Math.random() * 4)],
      width: 120,
    },
    {
      title: 'Documents',
      dataIndex: 'documents',
      width: 180,
      render: (docs) => (
        <ViewDoc setDoocs={setDoocs} setIsDocVisible={setIsDocVisible} docs={docs ? docs : []} />
      ),
    },

    {
      title: 'Comments',
      dataIndex: 'comment',
      render: () => <div>NA</div>,
      width: 110,
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={[]} pagination={false} rowKey="payment_id" />
      <ViewDocsModal docs={doocs} isDocVisible={isDocVisible} setIsDocVisible={setIsDocVisible} />
    </>
  );
};

export default AntTable;
