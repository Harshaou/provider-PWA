import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import moment from 'moment';

const PrescriptionForm = ({ info }) => {
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
          <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 5 }}>{info?.member?.name}</p>
        </div>
      </div>
      <div style={{ width: '33%' }}>
        <p style={{ color: '#f87d4e', fontSize: 18, fontWeight: 500, marginBottom: 5 }}>
          Medicines Prescribed by
        </p>
        <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 5 }}>{info?.doctor_name}</p>
      </div>
      <div style={{ width: '33%' }}>
        <p style={{ color: '#f87d4e', fontSize: 18, fontWeight: 500, marginBottom: 5 }}>
          Other Information
        </p>
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
                  <span>{info?.member?.gender ? info?.member?.gender : '--'}</span>
                  <span>{info?.member?.date_of_birth ? info?.member?.date_of_birth : '--'}</span>
                  <span>{info?.member_number ? info?.member_number : '--'}</span>
                  <span>{info?.member?.policy_number ? info?.member?.policy_number : '--'}</span>
                </div>
              </div>
            </div>
            <div
              style={{
                width: '34%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  width: '90%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p style={{ marginLeft: 2, marginBottom: 0 }}>Specialization</p>
                  <p style={{ marginLeft: 2, marginBottom: 0 }}>Provider Name</p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#737373',
                  }}
                >
                  <span>{info?.doctor_specialization}</span>
                  <span>{info?.provider_name}</span>
                </div>
              </div>
            </div>
            <div
              style={{
                width: '34.3%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  width: '90%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ marginLeft: 2 }}>Date of Prescription</span>
                <span style={{ color: '#737373' }}>
                  {moment(info?.created_timestamp).format('MMMM Do YYYY, H:mm ')}
                </span>
              </div>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default PrescriptionForm;
