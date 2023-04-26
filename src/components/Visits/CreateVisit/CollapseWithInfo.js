import React, { useEffect } from 'react';
import { Collapse, Table } from 'antd';
const { Panel } = Collapse;
import { PlusOutlined, MinusOutlined, CheckCircleFilled } from '@ant-design/icons';
import moment from 'moment';

const PrescriptionForm = ({ member }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '15px'
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '15px 25px',
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
          <p style={{ color: '#f87d4e', fontSize: 18, fontWeight: 500, marginBottom: 5 }}>
            Patient Information
          </p>
          <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 5 }}>{member?.name}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0px 10px', marginTop: '-10px' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '-10px' }}>
            <p style={{ fontWeight: '300' }}>NIDA Number</p><p style={{ fontWeight: '600' }}>{member?.nida}</p>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '-10px' }}>
            <p style={{ fontWeight: '300' }}>Contact Number</p><p style={{ fontWeight: '600' }}>{member?.contact_number}</p>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '-10px' }}>
            <p style={{ fontWeight: '300' }}>Gender</p><p style={{ fontWeight: '600' }}>{member?.gender}</p>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '-10px' }}>
            <p style={{ fontWeight: '300' }}>Date of Birth</p><p style={{ fontWeight: '600' }}>{member?.date_of_birth}</p>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '15px 25px',
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
          <p style={{ color: '#f87d4e', fontSize: 18, fontWeight: 500, marginBottom: 5 }}>
            Policy Information
          </p>
          <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 5 }}>
            <span style={{ margin: '0px 10px', fontSize: '14px', backgroundColor: '#3ab44d', color: 'white', padding: '5px 10px', borderRadius: '10px' }}>Active <CheckCircleFilled /></span>
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0px 10px', marginTop: '-10px' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '-10px' }}>
            <p style={{ fontWeight: '300' }}>Member Number</p><p style={{ fontWeight: '600' }}>{member?.member_number}</p>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '-10px' }}>
            <p style={{ fontWeight: '300' }}>Policy Number</p><p style={{ fontWeight: '600' }}>{member?.policy_number}</p>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '-10px' }}>
            <p style={{ fontWeight: '300' }}>Start Date</p><p style={{ fontWeight: '600' }}>10-03-2023</p>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '-10px' }}>
            <p style={{ fontWeight: '300' }}>End of Date</p><p style={{ fontWeight: '600' }}>09-03-2024</p>
          </div>
        </div>

      </div>

    </div >
  );
};

export default PrescriptionForm;
