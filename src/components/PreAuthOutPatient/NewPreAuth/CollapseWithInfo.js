import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import moment from 'moment';

const PrescriptionForm = ({ member }) => {
  const renderHeader = () => (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ width: '33%' }}>
        <p style={{ color: '#f87d4e', fontSize: 18, fontWeight: 500, marginBottom: 5 }}>
          Patient Information
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 5 }}>{member?.name}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
      }}
    >
      <Collapse
        expandIcon={({ isActive }) =>
          !isActive ? (
            <PlusOutlined style={{ fontSize: 20, color: '#f87d4e' }} />
          ) : (
            <MinusOutlined style={{ fontSize: 20, color: '#f87d4e' }} />
          )
        }
        bordered={false}
        expandIconPosition="end"
        className="prescription"
        style={{
          background: 'inherit',
        }}
      >
        <Panel header={renderHeader()} key="1">
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <div
              style={{
                width: '33%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  width: '85%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span>Gender</span>
                  <span>Date of Birth</span>
                  <span>Member No.</span>
                  <span>Policy No.</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    color: '#737373',
                    textAlign: 'right',
                  }}
                >
                  <span>{member?.gender ? member?.gender : '--'}</span>
                  <span>{member?.date_of_birth ? member?.date_of_birth : '--'}</span>
                  <span>{member?.member_number ? member?.member_number : '--'}</span>
                  <span>{member?.policy_number ? member?.policy_number : '--'}</span>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default PrescriptionForm;
