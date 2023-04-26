import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const PrescriptionForm = ({ info }) => {
  const renderHeader = () => (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ width: '45%' }}>
        <p style={{ color: '#f87d4e', fontSize: 18, fontWeight: 500, marginBottom: 5 }}>
          Patient Information
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 5 }}>{info?.memberInfo?.name}</p>
        </div>
      </div>
      <div style={{ width: '55%' }}>
        <p style={{ color: '#f87d4e', fontSize: 18, fontWeight: 500, marginBottom: 5 }}>
          Doctor Information
        </p>
        <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 5 }}>{info?.doctor_name}</p>
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
                width: '44%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  width: '70%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span>Gender</span>
                  <span>Date of Birth</span>
                  <span>Member No.</span>
                  <span>Policy No.</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    color: '#737373',
                    textAlign: 'right',
                  }}
                >
                  <span>{info?.memberInfo?.gender ? info?.memberInfo?.gender : '--'}</span>
                  <span>
                    {info?.memberInfo?.date_of_birth ? info?.memberInfo?.date_of_birth : '--'}
                  </span>
                  <span>
                    {info?.memberInfo?.member_number ? info?.memberInfo?.member_number : '--'}
                  </span>
                  <span>
                    {info?.memberInfo?.policy_number ? info?.memberInfo?.policy_number : '--'}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                width: '56%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  width: '60%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ marginLeft: 2 }}>Specialization</span>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#737373',
                  }}
                >
                  <span>{info?.doctor_specialization}</span>
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
