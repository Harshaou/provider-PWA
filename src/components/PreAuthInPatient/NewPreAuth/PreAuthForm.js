import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Input,
  Select,
  Form,
  AutoComplete,
  DatePicker,
  notification,
  Radio,
  Checkbox,
} from 'antd';
import { newPreAuth, resetMember } from '../../../store/preAuthSlice';
import { preventMinus } from '../../Common/HelperFunctions';
import ICDdata from '../../../utils/ICD.json';
import DocData from '../../../utils/doctors.json';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import UseIcdOptions from '../../Common/hooks/UseIcdOptions';
import UseDoctorsOptions from '../../Common/hooks/UseDoctorsOptions';
import CollapseInfo from './CollapseWithInfo';
const { Option } = Select;
import styles from './index.module.css';

const PreAuthForm = (props) => {
  const member = props?.member?.member;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectedRadio, setSelectedRadio] = useState('Medical Management');

  //documents
  const [icdCode, setIcdCode] = useState('');
  const [doctorDescription, setDoctorDescription] = useState('');
  const [icdOptions, setIcdOptions] = useState([{ label: '', value: '' }]);
  const [doctorsOptions, setDoctorsOptions] = useState([{ label: '', value: '' }]);

  const [hospitalizationEvent, setHospitalizationEvent] = useState('')

  const onICDSelect = (e) => {
    const item = ICDdata.filter((val) => val.desc === e)[0].code;
    setIcdCode(item);
  };

  const onDocSelect = (e) => {
    setDoctorDescription(DocData.filter((val) => val.Name === e)[0].discipline);
  };

  const handleSubmit = (vals) => {
    console.log(vals)
    const data = {
      ...vals,
      doctor_specialization: doctorDescription,
      icd_code: icdCode,
      diagnosis_date: vals.diagnosis_date.format('YYYY-MM-DD'),
      delivery_date: vals.delivery_date?.format('YYYY-MM-DD'),
      patient_type: "Inpatient",
      hospitalization_event: hospitalizationEvent
    }
    dispatch(newPreAuth({ data, handleFinish }));

  };

  const handleFinish = () => {
    form.resetFields();
    openNotificationWithIcon(
      'success',
      'The pre-auth request has been submitted for Eden Care to review. You can check the status real-time.',
    );
    navigate('/inpatients');
    dispatch(resetMember());
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: type === 'success' ? 'Successful' : 'Error',
      description: msg,
    });
  };

  const renderFormFields = () => {
    if (selectedRadio === 'Medical Management') {
      return (
        <>
          <span style={{ fontSize: 12 }}>Provide details of investigation</span>
          <Form.Item
            style={{ marginBottom: 10 }}
            name="details_if_investigation_or_medical_management"
            rules={[
              {
                required: true,
                message: 'Please input illness!',
              },
            ]}
          >
            <Input.TextArea style={{ borderRadius: 25, fontSize: 14 }} placeholder=" " allowClear />
          </Form.Item>
        </>
      );
    }
    if (selectedRadio === 'Surgical Management') {
      return (
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <div style={{ width: '50%' }}>
            <span style={{ fontSize: 12 }}>Name of Surgery</span>
            <Form.Item
              name="name_of_surgery"
              rules={[
                {
                  required: true,
                  message: 'Please input illness!',
                },
              ]}
              style={{ marginBottom: 10 }}
            >
              <Input style={{ width: '100%', borderRadius: 15 }} placeholder=" " allowClear />
            </Form.Item>
          </div>
          <div style={{ width: '50%' }}>
            <span style={{ fontSize: 12 }}>RMPC Procedure Code</span>
            <Form.Item
              name="rmpc_procedure_code"
              rules={[
                {
                  required: true,
                  message: 'Please input illness!',
                },
              ]}
              style={{ marginBottom: 10 }}
            >
              <Input style={{ width: '100%', borderRadius: 15 }} placeholder=" " allowClear />
            </Form.Item>
          </div>
        </div>
      );
    }
    if (selectedRadio === 'Investigative') {
      return (
        <>
          <span style={{ fontSize: 12 }}>Provide details of investigation</span>
          <Form.Item
            name="details_if_investigation_or_medical_management"
            rules={[
              {
                required: true,
                message: 'Please input illness!',
              },
            ]}
            style={{ marginBottom: 10 }}
          >
            <Input.TextArea
              style={{ width: '100%', borderRadius: 15 }}
              placeholder=" "
              allowClear
            />
          </Form.Item>
        </>
      );
    }
    if (selectedRadio === 'Maternity') {
      return (
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ width: '50%' }}>
            <span style={{ fontSize: 10 }}>Delivery date</span>
            <Form.Item name="delivery_date" rules={[{ required: true }]}>
              <DatePicker
                className="fromDatePicker"
                placeholder=" "
                style={{ borderRadius: 20, width: '100%' }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </div>
          <div style={{ width: '50%' }}>
            <span style={{ fontSize: 10 }}>Length of stay</span>
            <Form.Item
              rules={[
                {
                  message: 'Please input discipline!',
                },
              ]}
              style={{ marginBottom: 0 }}
              name="length_of_stay"
            >
              <Input style={{ width: '100%', borderRadius: 15 }} placeholder=" " allowClear />
            </Form.Item>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        width: '75%',
      }}
    >
      <CollapseInfo member={member} />
      <Form
        name="newForm"
        form={form}
        initialValues={{
          currency: 'RWF',
          member_number: member?.member_number,
          member_contact_number: member?.contact_number,
        }}
        className={styles.formContainer}
        onFinish={handleSubmit}
      >
        {/* First */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 0 }}>Patient Information</h3>
          <div style={{ display: 'flex', gap: 10, marginBottom: 0 }}>
            <div style={{ width: '50%' }}>
              <span style={{ fontSize: 12 }}>Member No</span>
              <Form.Item style={{ marginBottom: 0 }} name="member_number">
                <Input
                  disabled
                  style={{ width: '100%', borderRadius: 15 }}
                  type="number"
                  placeholder=" "
                  allowClear
                />
              </Form.Item>
            </div>
            <div style={{ width: '50%' }}>
              <span style={{ fontSize: 12 }}>Phone Number</span>
              <Form.Item
                style={{ marginBottom: 0 }}
                rules={[
                  {
                    required: true,
                    message: 'Please input Phone Number!',
                  },
                ]}
                name="member_contact_number"

              >
                <Input
                  style={{ width: '100%', borderRadius: 15 }}
                  placeholder=" "
                  type="number"
                  allowClear
                />
              </Form.Item>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 10 }}>Clinical Information</h3>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: '50%' }}>
              <span style={{ fontSize: 12 }}>Presenting Complaints</span>
              <Form.Item style={{ marginBottom: 10 }} name="presenting_complaints">
                <Input style={{ width: '100%', borderRadius: 15 }} allowClear />
              </Form.Item>
            </div>
            <div style={{ width: '50%' }}>
              <span style={{ fontSize: 12 }}>Duration of the present illness</span>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="duration_of_present_illness"
                rules={[
                  {
                    required: true,
                    message: 'Please input illness!',
                  },
                ]}
              >
                <Input style={{ width: '100%', borderRadius: 15 }} placeholder=" " allowClear />
              </Form.Item>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: '50%' }}>
              <span style={{ fontSize: 12 }}>Date of Diagnosis</span>
              <Form.Item style={{ marginBottom: 10 }} name="diagnosis_date" rules={[{ required: true }]}>
                <DatePicker
                  className="fromDatePicker"
                  placeholder=" "
                  style={{ borderRadius: 20, width: '100%' }}
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </div>
            <div style={{ width: '50%' }}>
              <span style={{ fontSize: 12 }}>Past History of present illness if any</span>
              <Form.Item
                style={{ marginBottom: 10 }}
                className={styles.checkBox}
                name="past_history_of_present_illness"
                valuePropName="checked"
              >
                <Radio.Group
                  options={['Yes', 'No']}
                  style={{ display: 'flex', justifyContent: 'flex-start', gap: '15px' }}
                />
              </Form.Item>
            </div>

          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: '50%' }}>
              <span style={{ fontSize: 12 }}>Date of Admission</span>
              <Form.Item style={{ marginBottom: 10 }} name="admission_date" rules={[{ required: true }]}>
                <DatePicker
                  className="fromDatePicker"
                  placeholder=" "
                  style={{ borderRadius: 20, width: '100%' }}
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </div>
            <div style={{ width: '50%' }}>
              <span style={{ fontSize: 12 }}>Estimated Length of Stay </span>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="estimated_length_of_stay"
                rules={[
                  {
                    required: true,
                    message: 'Please input Estimated Length of stay!',
                  },
                ]}
              >
                <Input style={{ width: '100%', borderRadius: 15 }} placeholder=" " allowClear />
              </Form.Item>
            </div>

          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: '60%' }}>
              <span style={{ fontSize: 12 }}>Provisional Diagnosis</span>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input Provisional Diagnosis!',
                  },
                ]}
                style={{ marginBottom: 0 }}
                name="provisional_diagnosis"
              >
                <AutoComplete
                  options={icdOptions}
                  style={{
                    width: '100%',
                  }}
                  onSelect={onICDSelect}
                  onSearch={(e) => UseIcdOptions(e, setIcdOptions)}
                  // placeholder="Provisional Diagnosis"
                  onClear={() => setIcdCode('')}
                  allowClear
                />
              </Form.Item>
            </div>
            <div style={{ width: '35%' }}>
              <span style={{ fontSize: 10 }}>ICD-10 COde</span>
              <Form.Item
                rules={[
                  {
                    // required: true,
                    message: 'Please input ICD-10 Code!',
                  },
                ]}
                style={{ marginBottom: 0 }}
                name="icd_code"
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
          <div style={{ marginTop: '10px' }}>
            <span style={{ fontSize: 12 }}>Is it an emergency or a planned hospitalization event?</span>
            <Form.Item
              style={{ marginBottom: 10 }}
              className={styles.checkBox}
              name="hospitalization_event"
            // valuePropName="checked"
            >
              <Radio.Group
                options={[{ label: 'Emergency', value: 'Emergency' },
                { label: 'Planned', value: 'Planned' },
                { label: 'Day Case', value: 'Day_Case' }]}
                style={{ display: 'flex', justifyContent: 'flex-start', gap: '15px' }}
                onChange={e => setHospitalizationEvent(e.target.value)}
              />
            </Form.Item>
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 10 }}>Proposed Line of Treatment</h3>
          <Radio.Group
            onChange={(e) => setSelectedRadio(e.target.value)}
            style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}
          >
            <Radio value="Medical Management">Medical Management</Radio>
            <Radio value="Surgical Management">Surgical Management</Radio>
            <Radio value="Investigative">Investigative</Radio>
            <Radio value="Maternity">Maternity</Radio>
          </Radio.Group>
          {renderFormFields()}
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: '50%' }}>
              <span style={{ fontSize: 10 }}>Doctor&apos;s Name</span>
              <Form.Item
                style={{ marginBottom: 10 }}
                rules={[
                  {
                    required: true,
                    message: 'Please input name!',
                  },
                ]}
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
                style={{ marginBottom: 10 }}
                rules={[
                  {
                    message: 'Please input discipline!',
                  },
                ]}
                name="doctor_specialization"
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
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: '50%' }}>
              <span style={{ fontSize: 10 }}>Estimated Cost of Treatment</span>
              <Form.Item
                style={{ marginBottom: 10 }}
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
                name="estimated_cost_of_treatment"
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
                style={{ marginBottom: 10 }}
                rules={[
                  {
                    required: true,
                    message: 'Please input currency!',
                  },
                ]}
                name="currency"
              >
                <Select style={{ width: '100%' }}>
                  <Option value="RWF">RWF</Option>
                  <Option value="Ksh">Ksh</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>

      <div style={{ float: 'right', marginTop: 40, marginBottom: 50 }}>
        <Button style={{ marginRight: 10 }} onClick={() => navigate('/pre-auths')} shape="round">
          Cancel
        </Button>
        <Button onClick={() => form.submit()} type="primary" shape="round" htmlType="submit">
          Request Pre-auth
        </Button>
      </div>
    </div>
  );
};

export default PreAuthForm;
