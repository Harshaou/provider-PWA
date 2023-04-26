import { Table } from 'antd';
import styles from './index.module.css';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { AiFillCaretDown } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from './DropDown';
import { statusDot } from '../Common/HelperFunctions';

const columns = [
  {
    title: 'Staff ID',
    dataIndex: 'transNo',
    filters: [],
    filterIcon: (filtered) => <AiFillCaretDown type="filter" style={{ color: '#f87d4e' }} />,
    width: 90,
  },
  {
    title: 'Names',
    dataIndex: 'names',
    width: 70,
  },
  {
    title: 'Phone No',
    dataIndex: 'phoneNo',
    filters: [],
    filterIcon: (filtered) => <AiFillCaretDown type="filter" style={{ color: '#f87d4e' }} />,
    width: 70,
  },
  {
    title: 'Department',
    dataIndex: 'department',
    width: 70,
    filters: [],
    filterIcon: (filtered) => <AiFillCaretDown type="filter" style={{ color: '#f87d4e' }} />,
  },
  {
    title: 'Supervisor',
    dataIndex: 'claimNo',
    filters: [],
    filterIcon: (filtered) => <AiFillCaretDown type="filter" style={{ color: '#f87d4e' }} />,
    width: 90,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    filterDropdown: (props) => <Dropdown />,
    onFilter: (value, record) => record.address.startsWith(value),
    filterIcon: (filtered) => <AiFillCaretDown type="filter" style={{ color: '#f87d4e' }} />,
    render: (status) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <div className={statusDot(status)}></div>
        {status}
      </div>
    ),
    width: 100,
  },
  {
    title: 'Documents',
    dataIndex: 'Documents',
    filters: [],
    filterIcon: (filtered) => <AiFillCaretDown type="filter" style={{ color: '#f87d4e' }} />,
    width: 180,
    render: (text) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: 70 }}>
          <HiOutlineDocumentText size={30} color="#f87d4e" />
          <p style={{ fontSize: 8, marginBottom: 0 }}>Request form</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', width: 70 }}>
          <HiOutlineDocumentText size={30} color="#f87d4e" />
          <p style={{ fontSize: 8, marginBottom: 0 }}>Request form</p>
        </div>
        <Link
          style={{ fontSize: 10, fontWeight: 10, textDecoration: 'underline', color: '#f87d4e' }}
          to={'/'}
        >
          View all
        </Link>
      </div>
    ),
  },

  {
    title: 'Comments',
    dataIndex: 'comment',
    width: 127,
  },
];
const data = [];

for (let i = 0; i < 4; i++) {
  data.push({
    key: i,
    names: 'Jhons',
    memberNumber: '#45454',
    documents: [],
    status: 'pending',
    comment: 'lorem lipsul lorem lipsul lorem ',
    claimNo: '#45454',
    transNo: '#45454',
    phoneNo: '0724548000',
    department: 'Sales and Marketing',
  });
}

const AntTable = () => {
  const navigate = useNavigate();
  return (
    <Table
      onRow={(record, rowIndex) => {
        return {
          onClick: () => navigate('/claims/patient'),
        };
      }}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};

export default AntTable;
