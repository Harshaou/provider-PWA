import React, { useState } from 'react';
import { Button, Input, Form, notification } from 'antd';
import { preventMinus } from '../../Common/HelperFunctions';

import { baseUrl } from '../../../utils';
import axios from 'axios';

const VerifyPrescriptionCode = ({ setStep, setGetPrescriptionValue }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form] = Form.useForm();

  // 34298248

  const handleSubmit = async (values) => {
    setLoading(true);
    let token = localStorage.getItem('x-auth-token');
    try {
      const response = await axios.get(
        `${baseUrl}/provider/prescription/otp/${values.prescriptionCode}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setLoading(false);
      if (response.data.api.responseCode === 2040) {
        setGetPrescriptionValue(response.data?.result);
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
        Start by entering the Prescription Code to initiate the Claim
      </p>
      <p style={{ color: 'grey', fontSize: 13 }}>
        Please ask the patient to provide the Prescription Code to get the list of prescribed
        medicines and initiate the claim.
      </p>
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
          <span style={{ fontSize: 13 }}>Enter the prescription code here</span>
          <Form.Item
            validateTrigger="onBlur"
            name="prescriptionCode"
            onClick={() => clearEmailFieldError('prescriptionCode')}
            rules={[
              {
                required: true,
                message: 'Please input valid Prescription Code!',
              },
              {
                min: 8,
                max: 8,
                message: 'Prescription code must be 8 digit',
              },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input
              style={{ borderRadius: 10 }}
              placeholder="Enter the prescription code here"
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
              Initiate Claim
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VerifyPrescriptionCode;
