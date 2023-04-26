import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Select, Form, notification } from 'antd';
import DraggerComponent from './Upload';
import { preventMinus } from '../../Common/HelperFunctions';

import { useNavigate } from 'react-router-dom';
import { createManualClaim } from '../../../store/pharmacySlice';
const { Option } = Select;

const ManualClaim = ({ member }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  //documents
  const [claimForm, setClaimForm] = useState([]);
  const [docReq, setDocReq] = useState([]);
  const [quote, setQuote] = useState([]);

  const [fromDate, setFromDate] = useState(new Date());

  const handleSubmit = () => {
    let { amount, currency } = form.getFieldsValue();

    let formData = new FormData();
    let value = {
      member_number: member?.member_number,
      claim_amount: amount,
      claim_currency: currency,
    };

    formData.append('request', JSON.stringify(value));
    claimForm.map((item) => formData.append('claim_form', item));
    docReq.map((item) => formData.append('prescription', item));
    quote.map((item) => formData.append('pharmacy_invoice', item));
    dispatch(createManualClaim({ formData, openNotificationWithIcon, navigate }));
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  return (
    <div style={{ width: '80%' }}>
      <Form
        name="newForm"
        form={form}
        style={{
          display: 'flex',
          gap: 10,
          marginTop: 4,
          marginBottom: 20,
          flexDirection: 'column',
        }}
        initialValues={{
          currency: 'RWF',
          member_number: member?.member_number,
          contact_number: member?.contact_number,
        }}
        onFinish={handleSubmit}
      >
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: '50%' }}>
            <span style={{ fontSize: 10 }}>Member No</span>
            <Form.Item style={{ marginBottom: 0 }} name="member_number">
              <Input
                disabled
                style={{ width: '100%', borderRadius: 15 }}
                placeholder="Member No"
                type="number"
                allowClear
              />
            </Form.Item>
          </div>
          <div style={{ width: '50%' }}>
            <span style={{ fontSize: 10 }}>Phone Number</span>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please input currency!',
                },
              ]}
              style={{ marginBottom: 0 }}
              name="contact_number"
            >
              <Input
                style={{ width: '100%', borderRadius: 15 }}
                placeholder="Phone No"
                type="number"
                allowClear
              />
            </Form.Item>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: '50%' }}>
            <span style={{ fontSize: 10 }}>Amount</span>
            <Form.Item
              rules={[
                {
                  validator(item, value) {
                    if (parseInt(value) < 1 || value.split('')[0] === '.') {
                      return Promise.reject(new Error('Please input a valid amount'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              style={{ marginBottom: 0 }}
              name="amount"
            >
              <Input
                style={{ width: '100%', borderRadius: 15 }}
                placeholder="Amount"
                type="number"
                allowClear
                onKeyPress={preventMinus}
              />
            </Form.Item>
          </div>
          <div style={{ width: '50%' }}>
            <span style={{ fontSize: 10 }}>Currency</span>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please input currency!',
                },
              ]}
              style={{ marginBottom: 0 }}
              name="currency"
            >
              <Select style={{ width: '100%' }}>
                <Option value="RWF">RWF</Option>
                <Option value="Ksh">Ksh</Option>
              </Select>
            </Form.Item>
          </div>
        </div>
      </Form>
      <div style={{ width: '100%', gap: 10, display: 'flex', flexDirection: 'column' }}>
        <h5 style={{ fontWeight: 700 }}>Upload Documents</h5>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: 15,
            justifyContent: 'space-between',
          }}
        >
          <h5 style={{ fontWeight: 500 }}>Claim Form</h5>
          <DraggerComponent
            disabled={member ? false : true}
            setFiles={setClaimForm}
            fileCount={10}
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: 15,
            justifyContent: 'space-between',
          }}
        >
          <h5 style={{ fontWeight: 500 }}>Pharmacy Invoice</h5>
          <DraggerComponent disabled={member ? false : true} setFiles={setDocReq} fileCount={1} />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: 15,
            justifyContent: 'space-between',
          }}
        >
          <h5 style={{ fontWeight: 500 }}>Prescription</h5>
          <DraggerComponent disabled={member ? false : true} setFiles={setQuote} fileCount={1} />
        </div>
      </div>
      <div style={{ float: 'right', marginTop: 40 }}>
        <Button style={{ marginRight: 15 }} onClick={() => navigate('/inpatients')} shape="round">
          Cancel
        </Button>
        <Button
          disabled={claimForm.length === 0 || docReq.length === 0 || quote.length === 0}
          onClick={() => form.submit()}
          type="primary"
          shape="round"
          htmlType="submit"
        >
          Initiate Manual Claim
        </Button>
      </div>
    </div>
  );
};

export default ManualClaim;
