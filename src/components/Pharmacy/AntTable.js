import { Button, notification, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { deletePrescription } from '../../store/prescriptionSlice';

const AntTable = ({ data }) => {
  const state = useSelector((state) => state.pharmacy);

  const columns = [
    {
      title: 'Prescription code',
      dataIndex: 'prescription_code',
      width: 100,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: 100,
    },
    {
      title: 'Price/unit',
      dataIndex: 'price',
      width: 100,
    },
    {
      title: 'Price total',
      dataIndex: '',
      width: 100,
    },
    {
      title: 'Date & Time',
      dataIndex: 'meta',
      render: (item) => <>{moment(item?.claim_created_timestamp).format('MMMM Do YYYY, H:mm ')}</>,
      width: 100,
    },
  ];

  return (
    <>
      <Table
        loading={state.loading}
        onRow={(record) => {
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
        expandable={{
          expandRowByClick: true,
          expandedRowRender: (field, record) => (
            <div
              style={{
                marginLeft: 100,
              }}
            >
              <p style={{ fontWeight: 500, fontSize: 14, marginBottom: 5 }}>Medicine Name</p>
              {field?.disbursed_medicines?.map((item, index) => (
                <div key={index} value={item.name}>
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <div style={{ width: 265 }}>
                      <span>{item.name}</span>
                    </div>
                    <div style={{ width: 210, marginLeft: 10 }}>
                      <span>{item.quantity}</span>
                    </div>
                    <div style={{ width: 220 }}>
                      <span>RWF {item.price?.toLocaleString()}</span>
                    </div>
                    <div style={{ width: 200 }}>
                      <span>RWF {item.total_price?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ),
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="id"
      />
    </>
  );
};

export default AntTable;
