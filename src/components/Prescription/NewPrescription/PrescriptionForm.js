import React, { useEffect } from 'react';
import CollapseInfo from './CollapseWithInfo';
import { useState } from 'react';
import { Button, Input, Form, AutoComplete, Table, notification, Select } from 'antd';
import ICDdata from '../../../utils/ICD.json';
import { useNavigate } from 'react-router-dom';
import UseIcdOptions from '../../Common/hooks/UseIcdOptions';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createPrescription } from '../../../store/prescriptionSlice';
import axios from 'axios';
import { baseUrl } from '../../../utils';

const PrescriptionForm = ({ info }) => {
  const [form] = Form.useForm();
  const [formTwo] = Form.useForm();
  const navigate = useNavigate();
  const [icdCode, setIcdCode] = useState('');
  const [icdOptions, setIcdOptions] = useState([{ label: '', value: '' }]);
  const [medicineData, setMedicineData] = useState([]);
  const [medicineOptions, setMedicineOptions] = useState([{ label: '', value: '' }]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const state = useSelector((state) => state.prescription);

  const onICDSelect = (e) => {
    const item = ICDdata.filter((val) => val.desc === e)[0].code;
    setIcdCode(item);
  };

  useEffect(() => {
    getMedicines();
  }, []);

  const getMedicines = async () => {
    let token = localStorage.getItem('x-auth-token');
    try {
      const response = await axios.get(`${baseUrl}/provider/prescription/generic/list`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setMedicineData(response?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    let values = form.getFieldsValue();

    let updatedValue = JSON.stringify({
      ...values,
      doctor_name: info.doctor_name,
      doctor_specialization: info.doctor_specialization,
      member_number: info.member_number,
      icd_code: icdCode,
      prescribed_medicines: data.map(({ id, ...rest }) => rest),
    });

    dispatch(createPrescription({ updatedValue, navigate, openNotificationWithIcon }));
  };

  const columns = [
    {
      title: 'Medicine Name',
      dataIndex: 'generic_name',
      width: 160,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: 105,
    },
    {
      title: 'Instructions',
      dataIndex: 'instructions',
      width: 150,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (item) => (
        <Button
          onClick={() => setData(data.filter((medItem) => medItem.id !== item))}
          danger
          shape="round"
          size="small"
        >
          Remove
        </Button>
      ),
      width: 100,
    },
  ];

  const handleAddMedicine = (values) => {
    setData([...data, { ...values, id: Date.now() }]);
    formTwo.resetFields();
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  const UseMedicineOptions = (e, setMedicineOptions) => {
    const options = medicineData.filter((val) => val.toLowerCase().includes(e.toLowerCase()));

    setMedicineOptions(
      options.map((val) => {
        return { label: val, value: val };
      }),
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <CollapseInfo info={info} />
      <div style={{ marginBottom: 60 }}>
        <p style={{ fontWeight: 600, marginBottom: 5, fontSize: 18, marginLeft: 4 }}>
          Please fill-in the required details below
        </p>
        <div style={{ backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
          <div style={{ width: '100%' }}>
            <Form
              name="newForm"
              form={form}
              style={{ display: 'flex', gap: 20, marginBottom: 15, flexDirection: 'column' }}
              initialValues={{
                currency: 'RWF',
              }}
              onFinish={handleSubmit}
            >
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: '36%' }}>
                  <span style={{ fontSize: 10 }}>Disease Description</span>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Please input description!',
                      },
                    ]}
                    style={{ marginBottom: 0 }}
                    name="disease"
                  >
                    <AutoComplete
                      options={icdOptions}
                      style={{
                        width: '100%',
                      }}
                      onSelect={onICDSelect}
                      onSearch={(e) => UseIcdOptions(e, setIcdOptions)}
                      placeholder="Disease Description"
                      onClear={() => setIcdCode('')}
                      allowClear
                    />
                  </Form.Item>
                </div>
                <div style={{ width: '15%' }}>
                  <span style={{ fontSize: 10 }}>ICD-10 Code</span>
                  <Form.Item style={{ marginBottom: 0 }} name="icdCode">
                    <Input
                      style={{ width: '100%', borderRadius: 15 }}
                      placeholder={icdCode}
                      value={icdCode}
                      disabled
                      allowClear
                    />
                  </Form.Item>
                </div>
              </div>
            </Form>
            <Form
              form={formTwo}
              name="medicineForm"
              autoComplete="off"
              onFinish={handleAddMedicine}
            >
              <div style={{ display: 'flex', gap: 10, width: '100%' }}>
                <Form.Item
                  rules={[{ required: true, message: 'Please input medicine name' }]}
                  name="generic_name"
                  style={{ width: '36%' }}
                >
                  <AutoComplete
                    options={medicineOptions}
                    style={{
                      width: '100%',
                    }}
                    onSearch={(e) => UseMedicineOptions(e, setMedicineOptions)}
                    placeholder="Search Medicines"
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  rules={[{ required: true, message: 'Please input quantity' }]}
                  name="quantity"
                  normalize={(value) => Number(value)}
                  style={{ width: '15%' }}
                >
                  <Input
                    min="0"
                    type="number"
                    step="1"
                    allowClear
                    pattern="\d+"
                    style={{ borderRadius: 15 }}
                    placeholder="Quantity"
                  />
                </Form.Item>

                <Form.Item name="instructions" style={{ width: '34%' }}>
                  <Input
                    style={{ borderRadius: 15 }}
                    placeholder="Instructions (optional)"
                    allowClear
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    disabled={data.length > 3 ? true : false}
                    htmlType="submit"
                    icon={<PlusOutlined />}
                    type="dashed"
                    style={{ borderRadius: 15 }}
                  >
                    {data.length > 3 ? 'Limit exceeded' : 'Add'}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>

          {data.length > 0 && (
            <>
              <p style={{ marginBottom: 10 }}>{data.length} item Added</p>
              <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Table
                  className="prescription"
                  rowKey="id"
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  scroll={{
                    y: 150,
                  }}
                />
              </div>
            </>
          )}
        </div>
        <Button
          onClick={() => form.submit()}
          disabled={data.length > 0 ? false : true}
          shape="round"
          type="primary"
          size="large"
          loading={state.newReqState.loading}
          style={{ float: 'right', marginTop: 20 }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PrescriptionForm;
