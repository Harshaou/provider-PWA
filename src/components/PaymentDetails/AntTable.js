import { Table } from 'antd';
import styles from './index.module.css';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { AiFillCaretDown } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from './DropDown';
import { statusDot } from '../Common/HelperFunctions';

const columns = [
  {
    title: 'Batch No',
    dataIndex: 'transNo',
    filters: [],
    filterIcon: (filtered) => <AiFillCaretDown type="filter" style={{ color: '#f87d4e' }} />,
    width: 90,
  },
  {
    title: 'Staff ID',
    dataIndex: 'memberNumber',
    filters: [],
    filterIcon: (filtered) => <AiFillCaretDown type="filter" style={{ color: '#f87d4e' }} />,
    width: 105,
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
    responsive: ['lg'],
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
        <span style={{ color: 'green', fontSize: 12 }}>{'( +22 days )'}</span>
      </div>
    ),
    width: 140,
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
        <div
          style={{ fontSize: 10, fontWeight: 10, textDecoration: 'underline', color: '#f87d4e' }}
        >
          View all
        </div>
      </div>
    ),
  },

  {
    title: 'Comments',
    dataIndex: 'comment',
    width: 127,
    responsive: ['lg'],
  },
];
const data = [];

for (let i = 0; i < 5; i++) {
  data.push({
    key: i,
    names: 'Jhons',
    memberNumber: '#45454',
    documents: [],
    status: 'pending',
    comment: 'NA',
    claimNo: '#45454',
    transNo: '#45454',
    phoneNo: '0724548000',
    department: 'Sales and Marketing',
  });
}

const AntTable = () => {
  const navigate = useNavigate();
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default AntTable;
