import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import DocView from '../Common/DocumentView/DocViewFragment';
import ViewDocsModal from '../Common/DocumentView/ViewDocsModal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPreAuthsWithFilter } from '../../store/preAuthSlice';
import { statusDot } from '../Common/HelperFunctions';
import moment from 'moment';

const AntTable = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentDocs, setCurrentDocs] = useState([]);
  const [filterState, setFilter] = useState('');
  const [hideDropDown, setHideDropDown] = useState('');
  const [isDocVisible, setIsDocVisible] = useState(false);

  const state = useSelector((state) => state.preAuth);

  useEffect(() => {
    if (filterState !== '') {
      dispatch(getPreAuthsWithFilter({ filter: filterState }));
      setHideDropDown(true);
    }
  }, [filterState]);

  const columns = [
    {
      title: 'Pre Auth No.',
      dataIndex: 'pre_auth_number',

      width: 110,
    },
    {
      title: 'Member No.',
      dataIndex: 'member_number',

      width: 105,
    },
    {
      title: 'Name',
      dataIndex: 'member',
      render: (item) => item?.name,
      width: 90,
    },

    {
      title: 'Amount',
      dataIndex: 'member',
      render: (_, item) => (
        <>
          {item?.currency} {item?.amount?.toLocaleString()}
        </>
      ),
      width: 100,
    },
    {
      title: 'ICD 10 Code',
      dataIndex: 'icd_code',
      width: 100,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div className={statusDot(status)}></div>

          {status === 'In_Progress' ? 'Processing' : status}
        </div>
      ),
      width: 100,
    },
    {
      title: 'Documents',
      dataIndex: 'documents',
      width: 90,
      render: (docs) =>
        docs ? (
          <DocView setCurrentDocs={setCurrentDocs} setIsDocVisible={setIsDocVisible} docs={docs} />
        ) : (
          <p>N/A</p>
        ),
    },
    {
      title: 'Request Timestamp',
      dataIndex: 'created_timestamp',
      render: (item) => moment(item).format('MMMM Do YYYY, H:mm '),
      width: 150,
      responsive: ['lg'],
    },
  ];

  return (
    <>
      <Table
        loading={state.loading}
        onRow={(record) => {
          return {
            onClick: (e) => {
              if (e.target.id === 'documentCell') {
                e.preventDefault();
              } else {
                navigate(`/inpatient/${record.pre_auth_number}`);
              }
            },
          };
        }}
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <ViewDocsModal
        docs={currentDocs}
        isDocVisible={isDocVisible}
        setIsDocVisible={setIsDocVisible}
      />
    </>
  );
};

export default AntTable;
