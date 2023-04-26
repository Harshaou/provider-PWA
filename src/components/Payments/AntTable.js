import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import DocView from '../Reports/ViewDoc';

const AntTable = () => {
  const navigate = useNavigate();

  const data = [];

  for (let i = 0; i < 8; i++) {
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
  let names = ['Clifford Kop', 'Bend Errick', 'Laurie Bond', 'Jim McAfee'];
  const type = ['Debit', 'Credit', 'Debit', 'Credit'];

  const columns = [
    {
      title: 'Payment ID',
      dataIndex: 'payment_id',
      width: 135,
    },
    {
      title: 'Claim Number',
      dataIndex: 'claim_number',
      width: 140,
    },
    {
      title: 'Name',
      dataIndex: 'member',
      render: () => names[Math.floor(Math.random() * 4)],
      width: 140,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: () => type[Math.floor(Math.random() * 4)],
      width: 110,
      responsive: ['md'],
    },
    {
      title: 'Amount',
      dataIndex: 'payment_invoice',
      defaultSortOrder: 'descend',
      render: () => amountNo[Math.floor(Math.random() * 4)],
      width: 110,
    },
    {
      title: 'Documents',
      dataIndex: 'documents',
      width: 120,
      render: (docs) => <DocView />,
    },
    {
      title: 'Comments',
      dataIndex: 'comment',
      render: () => <div>NA</div>,
      width: 80,
    },
  ];

  return (
    <>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              if (e.target.innerText === 'View all' || e.target.innerText === 'View') {
                e.preventDefault();
              } else {
                navigate('/payments/:detail');
              }
            },
          };
        }}
        columns={columns}
        dataSource={[]}
        pagination={false}
        rowKey="payment_id"
      />
    </>
  );
};

export default AntTable;
