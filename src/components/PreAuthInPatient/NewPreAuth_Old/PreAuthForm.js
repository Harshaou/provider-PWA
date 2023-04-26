import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Select, Form, AutoComplete, DatePicker, notification } from 'antd';
import DraggerComponent from './Upload';
import { newPreAuth } from '../../../store/preAuthSlice';
import { preventMinus } from '../../Common/HelperFunctions';
import ICDdata from '../../../utils/ICD.json';
import DocData from '../../../utils/doctors.json';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import UseIcdOptions from '../../Common/hooks/UseIcdOptions';
import UseDoctorsOptions from '../../Common/hooks/UseDoctorsOptions';
import { resetMember } from '../../../store/preAuthSlice';
const { Option } = Select;

const PreAuthForm = ({ cardNumber }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { member, newReqState } = useSelector((state) => state.preAuth);

  //documents
  const [claimForm, setClaimForm] = useState([]);
  const [docReq, setDocReq] = useState([]);
  const [quote, setQuote] = useState([]);
  const [misc, setMisc] = useState([]);
  const [icdCode, setIcdCode] = useState('');
  const [doctorDescription, setDoctorDescription] = useState('');
  const [icdOptions, setIcdOptions] = useState([{ label: '', value: '' }]);
  const [doctorsOptions, setDoctorsOptions] = useState([{ label: '', value: '' }]);

  const [fromDate, setFromDate] = useState(new Date());

  const onICDSelect = (e) => {
    const item = ICDdata.filter((val) => val.desc === e)[0].code;
    setIcdCode(item);
  };

  const onDocSelect = (e) => {
    setDoctorDescription(DocData.filter((val) => val.Name === e)[0].discipline);
  };

  const handleSubmit = () => {
    let { amount, currency, disease, doctor_name, admission_date, discharge_date } =
      form.getFieldsValue();

    let formData = new FormData();
    let value = {
      member_number: cardNumber,
      amount,
      currency,
      disease,
      patient_type: 'Inpatient',
      icd_code: icdCode,
      doctor_name,
      admission_date: moment(admission_date).format('YYYY-MM-DD'),
      discharge_date: moment(discharge_date).format('YYYY-MM-DD'),
    };

    formData.append('request', JSON.stringify(value));
    claimForm.map((item) => formData.append('claim_form', item));
    docReq.map((item) => formData.append('doctor_request', item));
    quote.map((item) => formData.append('quote', item));
    misc.map((item) => formData.append('misc', item));
    dispatch(newPreAuth({ formData, handleFinish }));
  };

  const handleFinish = () => {
    form.resetFields();
    openNotificationWithIcon(
      'success',
      'The pre-auth inpatient request has been submitted for Eden Care to review. You can check the status real-time.',
    );
    dispatch(resetMember());
    navigate('/inpatients');
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: type === 'success' ? 'Successful' : 'Error',
      description: msg,
    });
  };

  const disabledDate = (current) => {
    return current && current < fromDate;
  };

  return (
    <div style={{ width: '80%' }}>
      <Form
        name="newForm"
        form={form}
        style={{ display: 'flex', gap: 10, marginTop: 4, flexDirection: 'column' }}
        initialValues={{
          currency: 'RWF',
        }}
        onFinish={handleSubmit}
      >
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

        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: '70%' }}>
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
          <div style={{ width: '25%' }}>
            <span style={{ fontSize: 10 }}>ICD-10 COde</span>
            <Form.Item
              rules={[
                {
                  // required: true,
                  message: 'Please input ICD-10 Code!',
                },
              ]}
              style={{ marginBottom: 0 }}
              name="icdCode"
            >
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
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: '50%' }}>
            <span style={{ fontSize: 10 }}>Doctor&apos;s Name</span>
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
                allowClear
              />
            </Form.Item>
          </div>

          <div style={{ width: '50%' }}>
            <span style={{ fontSize: 10 }}>Doctor&apos;s Discipline</span>
            <Form.Item
              rules={[
                {
                  // required: true,
                  message: 'Please input discipline!',
                },
              ]}
              style={{ marginBottom: 0 }}
              name="docDiscipline"
            >
              <Input
                style={{ width: '100%', borderRadius: 15 }}
                placeholder={doctorDescription}
                value={doctorDescription}
                disabled
                allowClear
              />
            </Form.Item>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15, width: '100%' }}>
          <div style={{ width: '50%' }}>
            <span style={{ fontSize: 10 }}>Admission Date</span>
            <Form.Item
              name="admission_date"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                className="fromDatePicker"
                placeholder="Date from"
                style={{ borderRadius: 20, width: '100%' }}
                size="large"
                format="YYYY/MM/DD"
                onChange={(d) => setFromDate(d, form.resetFields(['to']))}
              />
            </Form.Item>
          </div>
          <div style={{ width: '50%' }}>
            <span style={{ fontSize: 10 }}>Discharge Date</span>
            <Form.Item
              name="discharge_date"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                disabledDate={disabledDate}
                placeholder="Date to"
                style={{ borderRadius: 20, width: '100%' }}
                size="large"
                format="YYYY/MM/DD"
              />
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
            disabled={member.data ? false : true}
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
          <h5 style={{ fontWeight: 500 }}>Doctor&apos;s Request</h5>
          <DraggerComponent
            disabled={member.data ? false : true}
            setFiles={setDocReq}
            fileCount={1}
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
          <h5 style={{ fontWeight: 500 }}>Quote</h5>
          <DraggerComponent
            disabled={member.data ? false : true}
            setFiles={setQuote}
            fileCount={1}
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
          <h5 style={{ fontWeight: 500 }}>Other Documents</h5>
          <DraggerComponent
            disabled={member.data ? false : true}
            setFiles={setMisc}
            fileCount={10}
          />
        </div>
      </div>
      <div className="buttons">
        <Button onClick={() => navigate('/inpatients')} shape="round">
          Cancel
        </Button>
        <Button
          loading={newReqState.loading}
          disabled={claimForm.length === 0 || docReq.length === 0 || quote.length === 0}
          onClick={() => form.submit()}
          type="primary"
          shape="round"
          htmlType="submit"
        >
          Request Pre-auth
        </Button>
      </div>
    </div>
  );
};

export default PreAuthForm;
