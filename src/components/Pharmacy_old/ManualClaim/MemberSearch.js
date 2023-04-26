import React, { useState } from 'react';
import { Button, Input, Form, notification } from 'antd';
import { preventMinus } from '../../Common/HelperFunctions';

import { baseUrl } from '../../../utils';
import axios from 'axios';

const VerifyPrescriptionCode = ({ setStep, setMemberInfo }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);
    let token = localStorage.getItem('x-auth-token');
    try {
      const response = await axios.get(`${baseUrl}/provider/search/member/${values.member_no}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      if (response.data.api.responseCode === 2040) {
        setMemberInfo(response.data?.result);
        setStep(1);
      }
      setError(response.data.message);
    } catch (error) {
      setLoading(false);
      openNotificationWithIcon('error');
      console.log(error);
    }
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  const clearEmailFieldError = (fieldName) => {
    setError('');
    form.setFields([
      {
        name: fieldName,
        errors: [],
      },
    ]);
  };

  return (
    <div style={{ width: '45%' }}>
      <p style={{ color: '#f87d4e', fontSize: 18, marginBottom: 0 }}>
        Entering the Member No to create a Manual claim
      </p>
      <p style={{ color: 'grey', fontSize: 13 }}>Please ask the patient to provide the Member No</p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '60%',
          marginTop: 30,
          gap: 15,
        }}
      >
        <Form
          name="newForm"
          form={form}
          style={{ display: 'flex', gap: 10, marginTop: 4, flexDirection: 'column' }}
          onFinish={handleSubmit}
        >
          <span style={{ fontSize: 13 }}>Enter the Member No here</span>
          <Form.Item
            validateTrigger="onBlur"
            name="member_no"
            onClick={() => clearEmailFieldError('member_no')}
            rules={[
              {
                required: true,
                message: 'Please input valid Member No!',
              },
              {
                min: 11,
                max: 11,
                message: 'Member No must be 8 digit',
              },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input
              style={{ borderRadius: 10 }}
              placeholder="Enter the Member No here"
              type="number"
              size="large"
              onKeyPress={preventMinus}
              allowClear
            />
          </Form.Item>
          {error && <p style={{ color: 'red', fontSize: 12, marginBottom: 0 }}>{error}</p>}
          <div style={{ display: 'flex', marginTop: 5 }}>
            <Button
              style={{ width: '100%' }}
              loading={loading}
              onClick={() => form.submit()}
              type="primary"
              shape="round"
            >
              Initiate Manual Claim
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VerifyPrescriptionCode;
