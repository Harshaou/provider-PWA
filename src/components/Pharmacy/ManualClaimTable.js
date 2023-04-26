import { Table } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useState } from 'react';
import DocView from '../Common/DocumentView/DocViewFragment';
import ViewDocsModal from '../Common/DocumentView/ViewDocsModal';

const AntTable = ({ data }) => {
  const state = useSelector((state) => state.pharmacy);
  const [currentDocs, setCurrentDocs] = useState([]);
  const [isDocVisible, setIsDocVisible] = useState(false);

  const columns = [
    {
      title: 'Member No.',
      dataIndex: 'member_number',
      width: 100,
    },
    {
      title: 'Claim Amount',
      dataIndex: 'claim_amount',
      render: (_, item) => (
        <div>
          {item.claim_currency} {item?.claim_amount?.toLocaleString()}
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
      title: 'Date & Time',
      dataIndex: 'meta',
      render: (item) => <>{moment(item?.claim_created_on).format('MMMM Do YYYY, H:mm ')}</>,
      width: 100,
    },
  ];

  return (
    <>
      <Table
        rowKey="claim_id"
        loading={state.loading}
        onRow={() => {
          return {
            onClick: (e) => {
              if (e.target.innerText === 'Delete') {
                e.preventDefault();
              } else {
                // navigate(`/prescription/${record.id}`);
              }
            },
          };
        }}
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
