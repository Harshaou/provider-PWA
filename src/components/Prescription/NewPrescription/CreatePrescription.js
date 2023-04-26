import React, { useState } from 'react';
import { AutoComplete, Button, Input, Form, notification } from 'antd';
import { preventMinus } from '../../Common/HelperFunctions';
import UseDoctorsOptions from '../../Common/hooks/UseDoctorsOptions';
import DocData from '../../../utils/doctors.json';
import { baseUrl } from '../../../utils';
import axios from 'axios';

const CollapseInfo = ({ setStep, setCreatePrescriptionValue }) => {
  const [doctorsOptions, setDoctorsOptions] = useState([{ label: '', value: '' }]);
  const [doctorSpecialization, setDoctorDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form] = Form.useForm();

  const onDocSelect = (e) => {
    setDoctorDescription(DocData.filter((val) => val.Name === e)[0].discipline);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    let token = localStorage.getItem('x-auth-token');
    try {
      const response = await axios.get(
        `${baseUrl}/provider/search/member/${values?.member_number}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.api.responseCode === 2040) {
        setCreatePrescriptionValue({
          ...values,
          doctor_specialization: doctorSpecialization,
          memberInfo: response?.data?.result,
        });
        setStep(1);
      }
      if (response.data.api.responseCode === 3410) {
        openNotificationWithIcon('error', response.data.message);
        setError(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    <div style={{ width: '40%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
        }}
      >
        <Form
          name="newForm"
          form={form}
          style={{ display: 'flex', gap: 10, marginTop: 4, flexDirection: 'column' }}
          onFinish={handleSubmit}
        >
          <span style={{ fontSize: 13 }}>Member Number</span>
          <Form.Item
            validateTrigger="onBlur"
            name="member_number"
            onClick={() => clearEmailFieldError('member_number')}
            rules={[
              {
                required: true,
                message: 'Please input valid Member No!',
              },
              {
                min: 11,
                max: 11,
                message: 'Member number must be 11 digit',
              },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input
              style={{ borderRadius: 10 }}
              placeholder="Member Number"
              type="number"
              size="large"
              onKeyPress={preventMinus}
              allowClear
            />
          </Form.Item>
          <span style={{ fontSize: 13 }}>Doctor&apos;s Name</span>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please input name!',
              },
            ]}
            style={{ marginBottom: 0 }}
            name="doctor_name"
          >
            <AutoComplete
              className="prescription"
              options={doctorsOptions}
              style={{
                width: '100%',
              }}
              onSelect={onDocSelect}
              onSearch={(e) => UseDoctorsOptions(e, setDoctorsOptions)}
              placeholder="Doctor's Name"
              onClear={() => {
                setDoctorDescription('');
                setDoctorsOptions([{ label: '', value: '' }]);
              }}
              size="large"
              allowClear
            />
          </Form.Item>
          {error && <p style={{ color: 'red', fontSize: 12, marginBottom: 0 }}>{error}</p>}
          <div style={{ display: 'flex', marginTop: 15, justifyContent: 'flex-end' }}>
            <Button loading={loading} onClick={() => form.submit()} type="primary" shape="round">
              Create prescription
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CollapseInfo;
