import { Table } from 'antd';
import React from 'react';

const PreviewTable = ({ selectedFieldValues }) => {
  const columns = [
    {
      title: 'Medicine Name',
      dataIndex: 'designation',
      width: 150,
    },
    {
      title: 'Quantity',
      dataIndex: 'total_quantity',
      width: 80,
    },
    {
      title: 'Quantity Disbursed',
      dataIndex: 'quantity',
      width: 80,
    },
    {
      title: 'Price/unit',
      dataIndex: 'price',
      render: (price) => `${price?.toLocaleString()} RWF`,
      width: 105,
    },
    {
      title: 'Total price',
      dataIndex: 'price',
      render: (_, data) => {
        let total = data?.price * data?.quantity;
        return `${total?.toLocaleString()} RWF`;
      },
      width: 80,
    },
  ];

  let totalAmount = selectedFieldValues.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price * currentValue.quantity;
  }, 0);

  let claimedAmount = totalAmount * 0.9;
  let coPay = totalAmount * 0.1;

  return (
    <div style={{ minHeight: 300, marginTop: 30 }}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={selectedFieldValues}
        pagination={false}
        scroll={{
          y: 400,
        }}
      />
      <div
        style={{
          float: 'right',
          marginTop: 10,
          marginRight: 10,
          display: 'flex',
          width: 410,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p style={{ fontWeight: 600, marginBottom: 0 }}>Total Amount: </p>
          <p style={{ fontWeight: 600, marginBottom: 0 }}>Co-pay Amount: </p>
          <p style={{ fontWeight: 600, marginBottom: 0 }}>Claimed Amount: </p>
        </div>

        <div style={{ marginRight: 80, color: '#737373' }}>
          <p style={{ marginBottom: 0 }}>{totalAmount.toLocaleString()} RWF</p>
          <p style={{ marginBottom: 0 }}>{coPay.toLocaleString()} RWF</p>
          <p style={{ marginBottom: 0 }}>{claimedAmount.toLocaleString()} RWF</p>
        </div>
      </div>
    </div>
  );
};

export default PreviewTable;
