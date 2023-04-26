import { useEffect, useState } from 'react';
import Main from '../../../template';
import MemberCard from '../../Common/MemberCard';
import styles from './index.module.css';
import bannerIcon from '../../../img/pre-auth-creation.png';
import { AutoComplete, Button, DatePicker, Form, Input, notification, Radio, Select } from 'antd';
import ICDdata from '../../../utils/ICD.json';
import UseIcdOptions from '../../Common/hooks/UseIcdOptions';
import DocData from '../../../utils/doctors.json';
import UseDoctorsOptions from '../../Common/hooks/UseDoctorsOptions';
import { UserOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { preventMinus } from '../../Common/HelperFunctions';
import { useDispatch } from 'react-redux';
import { newPreAuth } from '../../../store/preAuthSlice';
import moment from 'moment';
import { baseUrl } from '../../../utils';
const CreatePreAuth = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formLoaded, setFormLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [icdCode, setIcdCode] = useState('');
  const [icdCodeTwo, setIcdCodeTwo] = useState('');
  const [disease, setDisease] = useState('');
  const [diseaseTwo, setDiseaseTwo] = useState('');
  const [icdCodeColCount, setIcdCodeColCount] = useState(1);
  const [icdOptions, setIcdOptions] = useState([{ label: '', value: '' }]);
  const [doctorName, setDoctorName] = useState('');
  const [doctorDescription, setDoctorDescription] = useState('');
  const [doctorsOptions, setDoctorsOptions] = useState([{ label: '', value: '' }]);
  const [lineOfTreatment, setLineOfTreatment] = useState({
    value: 'Medical',
  });
  const [memberHover, setMemberHover] = useState(false);
  const { Option } = Select;

  const onDocSelect = (e) => {
    setDoctorDescription(DocData.filter((val) => val.Name === e)[0].discipline);
    setDoctorName(e);
    setFormLoading(true);
  };

  const onICDSelect = (e) => {
    const item = ICDdata.filter((val) => val.desc === e)[0].code;
    setIcdCode(item);
    setDisease(e);
  };

  const onICDSelectTwo = (e) => {
    const item = ICDdata.filter((val) => val.desc === e)[0].code;
    setIcdCodeTwo(item);
    setDiseaseTwo(e);
  };

  const renderLineOfTreatmentForm = () => {
    switch (lineOfTreatment.value) {
      case 'Medical':
      case 'Investigative':
        return (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0px',
              justifyContent: 'space-around',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '55px',
                justifyContent: 'flex-start',
                marginTop: '-5px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h4 className={styles.formLabel}>Details of Investigation</h4>
                <Form.Item
                  name="investigation"
                  rules={[
                    {
                      required: true,
                      message: 'This field cannot be empty',
                    },
                  ]}
                >
                  <Input.TextArea
                    style={{ width: '805px' }}
                    className={styles.formInput}
                    placeholder="Enter Details of Investigation"
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        );
      case 'Surgical':
        return (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0px',
              justifyContent: 'space-around',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '55px',
                justifyContent: 'flex-start',
                marginTop: '-5px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h4 className={styles.formLabel}>Name of Surgery</h4>
                <Form.Item
                  name="surgery"
                  rules={[
                    {
                      required: true,
                      message: 'This field cannot be empty',
                    },
                  ]}
                >
                  <Input className={styles.formInput} placeholder="Enter Name of Surgery" />
                </Form.Item>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h4 className={styles.formLabel}>RMPC Procedure Code</h4>
                <Form.Item
                  name="rmpc_code"
                  rules={[
                    {
                      required: true,
                      message: 'This field cannot be empty',
                    },
                  ]}
                >
                  <Input className={styles.formInput} placeholder="Enter RMPC Procedure Code" />
                </Form.Item>
              </div>
            </div>
          </div>
        );
      case 'Maternity':
        return (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0px',
              justifyContent: 'space-around',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '55px',
                justifyContent: 'flex-start',
                marginTop: '-5px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h4 className={styles.formLabel}>Delivery Date</h4>
                <Form.Item
                  name="delivery_date"
                  rules={[
                    {
                      required: true,
                      message: 'This field cannot be empty',
                    },
                  ]}
                >
                  <DatePicker
                    className="datePicker"
                    placeholder="Select Date of Delivery"
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h4 className={styles.formLabel}>Length of Stay</h4>
                <Form.Item
                  name="length_of_stay"
                  type="number"
                  onKeyPress={preventMinus}
                  rules={[
                    {
                      required: true,
                      message: 'This field cannot be empty',
                    },
                  ]}
                >
                  <Input className={styles.formInput} placeholder="Enter Length of Stay" />
                </Form.Item>
              </div>
            </div>
          </div>
        );
    }
  };

  const doubleICDcode = () => (
    <div
      style={{
        display: 'flex',
        gap: '55px',
        justifyContent: 'flex-start',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h4 className={styles.formLabel}>Provisional Diagnosis </h4>
        <Form.Item
          style={{ width: 375 }}
          name="provisional_disease_2"
          rules={[
            {
              required: true,
              message: 'This field cannot be empty',
            },
          ]}
        >
          <AutoComplete
            options={icdOptions}
            id="autoComplete"
            onSelect={onICDSelectTwo}
            onSearch={(e) => UseIcdOptions(e, setIcdOptions)}
            placeholder="Select Disease Description"
            onClear={() => setIcdCodeTwo('')}
            allowClear
          />
        </Form.Item>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h4 className={styles.formLabel}>ICD-10 Code</h4>
        <Form.Item name="icd_code_2" style={{ width: 375 }}>
          <Input
            style={{ width: '100%' }}
            className={styles.formInput}
            placeholder={icdCodeTwo}
            value={icdCodeTwo}
            disabled
            allowClear
          />
        </Form.Item>
      </div>
    </div>
  );
  const location = useLocation();
  const visit = location.state?.visitId;
  const visitId = location.state?.visitId?.visit_id;

  const navigate = useNavigate();

  const onFinish = (values) => {
    let diagnosisArray = icdCodeTwo
      ? [
          { icd_code: icdCodeTwo, name: diseaseTwo },
          { icd_code: icdCode, name: disease },
        ]
      : [{ icd_code: icdCode, name: disease }];

    const {
      complain,
      duration_of_present_illness,
      date_of_diagnosis,
      past_history_of_present_illness,
      proposed_treatment,
      investigation,
      estimated_cost,
      currency,
    } = values;

    let lineValue = proposedTreatmentValues(proposed_treatment, values);

    let formValue = {
      visit_id: visitId,
      complain,
      duration_of_present_illness,
      diagnosis: diagnosisArray,
      date_of_diagnosis: date_of_diagnosis.format('YYYY-MM-DD'),
      past_history_of_present_illness: past_history_of_present_illness === 'Yes' ? true : false,
      proposed_treatment,
      investigation,
      estimated_cost,
      currency,
      ...lineValue,
      attending_doctor_name: doctorName,
      attending_doctor_specialisation: doctorDescription,
    };

    dispatch(
      newPreAuth({
        updatedValue: JSON.stringify(formValue),
        openNotificationWithIcon: openNotificationWithIcon,
        navigate,
        setLoading,
      }),
    );
  };

  useEffect(() => {
    getMember();
    if (visit?.attending_doctor_name) {
      onDocSelect(visit?.attending_doctor_name);
    } else {
      setFormLoading(true);
    }
  }, []);

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  const proposedTreatmentValues = (proposedTreatment, value) => {
    switch (proposedTreatment) {
      case 'Maternity':
        return {
          delivery_date: value.delivery_date.format('YYYY-MM-DD'),
          length_of_stay: value.length_of_stay,
        };

      case 'Surgical':
        return {
          surgery: value.surgery,
          rmpc_code: value.rmpc_code,
        };

      case 'Investigative':
      case 'Medical':
        return {
          investigation: value.investigation,
        };

      default:
        return {};
    }
  };

  const [member, setMemberData] = useState();
  const getMember = async () => {
    let token = localStorage.getItem('x-auth-token');
    await fetch(`${baseUrl}/provider/visit/${visitId}/member-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setMemberData(res?.result?.member);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  };

  return (
    <Main>
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center', marginTop: '-50px' }}>
        <a href="/pre-auths" className={styles.breadCrumb1}>
          Pre-Auth /{' '}
        </a>
        <MemberCard setHover={setMemberHover} visitID={visitId} />
      </div>

      <h3 className={styles.headerText}>
        Create Pre-Auth for Visit<span style={{ fontWeight: '400' }}> #{visit.visit_id}</span>
      </h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          position: 'relative',
          marginBottom: 30,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <div
            className={styles.cardShadow}
            style={{
              height: '90vh',
              padding: '25px',
              position: 'relative',
              display: 'flex',
              gap: '17px',
              width: '90%',
              marginTop: 20,
              filter: memberHover ? 'blur(2px)' : null,
            }}
          >
            <div style={{ display: 'flex', gap: '17px', flexDirection: 'column' }}>
              <h3 className={styles.cardTitle} style={{ marginBottom: '15px' }}>
                Pre-authorisation form
              </h3>
              <div
                style={{
                  marginTop: '-20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  overflowY: 'scroll',
                  height: '100%',
                }}
              >
                <h4 className={styles.cardSubTitle}>
                  To request pre-authorization approval for a patient&apos;s treatment, please
                  fill-in the pre-authorisation form and provide us with the necessary information
                  about the patient&apos;s medical condition and proposed treatment. We will guide
                  you through the process and let you know if any additional documentation is
                  required.
                </h4>
                <h4 className={styles.cardTitle2}>Clinical Information</h4>
                {formLoaded && (
                  <Form
                    initialValues={{
                      proposed_treatment: 'Medical',
                      attending_doctor_name: doctorName,
                    }}
                    form={form}
                    onFinish={onFinish}
                    style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
                  >
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0px',
                        justifyContent: 'space-around',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: '55px',
                          justifyContent: 'flex-start',
                          marginTop: '-5px',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h4 className={styles.formLabel}>Presenting Complaint</h4>
                          <Form.Item
                            name="complain"
                            rules={[
                              {
                                required: true,
                                message: 'This field cannot be empty',
                              },
                            ]}
                          >
                            <Input
                              className={styles.formInput}
                              placeholder="Enter the patient's complaint"
                            />
                          </Form.Item>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h4 className={styles.formLabel}>Duration of the present illness(es)</h4>
                          <Form.Item
                            name="duration_of_present_illness"
                            rules={[
                              {
                                required: true,
                                message: 'This field cannot be empty',
                              },
                            ]}
                          >
                            <Input
                              className={styles.formInput}
                              placeholder="Enter the days or weeks or months"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '55px',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h4
                            style={{ display: 'flex', gap: 5, alignItems: 'center' }}
                            className={styles.formLabel}
                          >
                            Provisional Diagnosis{' '}
                            {icdCodeColCount === 1 ? (
                              <PlusCircleOutlined
                                onClick={() => setIcdCodeColCount(2)}
                                style={{ cursor: 'pointer', color: '#3ab44d' }}
                              />
                            ) : (
                              <MinusCircleOutlined
                                onClick={() => {
                                  setIcdCodeColCount(1);
                                  setIcdCodeTwo('');
                                }}
                                style={{ cursor: 'pointer', color: '#3ab44d' }}
                              />
                            )}
                          </h4>
                          <Form.Item
                            style={{ width: 375 }}
                            name="provisional_disease_1"
                            rules={[
                              {
                                required: true,
                                message: 'This field cannot be empty',
                              },
                            ]}
                          >
                            <AutoComplete
                              options={icdOptions}
                              id="autoComplete"
                              onSelect={onICDSelect}
                              onSearch={(e) => UseIcdOptions(e, setIcdOptions)}
                              placeholder="Select Disease Description"
                              onClear={() => setIcdCode('')}
                              allowClear
                            />
                          </Form.Item>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h4 className={styles.formLabel}>ICD-10 Code</h4>
                          <Form.Item name="icd_code_1" style={{ width: 375 }}>
                            <Input
                              style={{ width: '100%' }}
                              className={styles.formInput}
                              placeholder={icdCode}
                              value={icdCode}
                              disabled
                              allowClear
                            />
                          </Form.Item>
                        </div>
                      </div>
                      {icdCodeColCount > 1 && doubleICDcode()}
                      <div
                        style={{
                          display: 'flex',
                          gap: '55px',
                          justifyContent: 'flex-start',
                          marginTop: '-10px',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h4 className={styles.formLabel}>Date of Diagnosis</h4>
                          <Form.Item
                            name="date_of_diagnosis"
                            rules={[
                              {
                                required: true,
                                message: 'This field cannot be empty',
                              },
                            ]}
                          >
                            <DatePicker
                              className="datePicker"
                              placeholder="Select Date of Diagnosis"
                              format="DD/MM/YYYY"
                              disabledDate={(current) =>
                                current && current.isBefore(moment().startOf('day'))
                              }
                            />
                          </Form.Item>
                        </div>
                        <div
                          style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}
                        >
                          <h4 className={styles.formLabel}>
                            Any past history of the present illness(es)?
                          </h4>
                          <Form.Item
                            name="past_history_of_present_illness"
                            rules={[
                              {
                                required: true,
                                message: 'This field cannot be empty',
                              },
                            ]}
                          >
                            <Radio.Group
                              options={['Yes', 'No']}
                              style={{
                                marginLeft: '15px',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                gap: '15px',
                              }}
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div style={{ marginTop: '0px', display: 'flex', flexDirection: 'column' }}>
                        <h4 className={styles.formLabel}>Proposed line of treatment</h4>
                        <Form.Item
                          name="proposed_treatment"
                          rules={[
                            {
                              required: true,
                              message: 'This field cannot be empty',
                            },
                          ]}
                        >
                          <Radio.Group
                            value={lineOfTreatment}
                            defaultValue={'Medical'}
                            onChange={(e) => setLineOfTreatment({ value: e.target.value })}
                            options={[
                              { label: 'Medical Management', value: 'Medical' },
                              { label: 'Surgical Management', value: 'Surgical' },
                              { label: 'Investigative', value: 'Investigative' },
                              { label: 'Maternity', value: 'Maternity' },
                            ]}
                            style={{
                              marginLeft: '15px',
                              display: 'flex',
                              justifyContent: 'flex-start',
                              gap: '15px',
                            }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    {renderLineOfTreatmentForm()}
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0px',
                        justifyContent: 'space-around',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: '55px',
                          justifyContent: 'flex-start',
                          marginTop: '-5px',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h4 className={styles.formLabel}>Doctor&apos;s Name</h4>
                          <Form.Item
                            style={{ width: 375 }}
                            name="attending_doctor_name"
                            rules={[
                              {
                                required: true,
                                message: 'This field cannot be empty',
                              },
                            ]}
                          >
                            <AutoComplete
                              id="autoComplete"
                              options={doctorsOptions}
                              onSelect={onDocSelect}
                              onSearch={(e) => UseDoctorsOptions(e, setDoctorsOptions)}
                              placeholder="Select Doctor's Name"
                              mode
                              onClear={() => {
                                setDoctorDescription('');
                                setDoctorsOptions([{ label: '', value: '' }]);
                              }}
                              allowClear
                            />
                          </Form.Item>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h4 className={styles.formLabel}>Doctor&apos;s Discipline</h4>
                          <Form.Item name="doctor_description">
                            <Input
                              className={styles.formInput}
                              placeholder={doctorDescription}
                              value={doctorDescription}
                              disabled
                              allowClear
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '55px',
                          justifyContent: 'flex-start',
                          marginTop: '-5px',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h4 className={styles.formLabel}>Estimated Cost of Treatment</h4>
                          <Form.Item
                            name="estimated_cost"
                            rules={[
                              {
                                required: true,
                                message: 'This field cannot be empty',
                              },
                            ]}
                          >
                            <Input
                              type="number"
                              onKeyPress={preventMinus}
                              className={styles.formInput}
                              placeholder="Enter Estimated Cost of Treatment"
                            />
                          </Form.Item>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h4 className={styles.formLabel}>Currency</h4>
                          <Form.Item
                            name="currency"
                            rules={[
                              {
                                required: true,
                                message: 'This field cannot be empty',
                              },
                            ]}
                            initialValue="Rwf"
                            style={{ width: 375 }}
                          >
                            <Select id="autoComplete" placeholder="Select Currency">
                              <Option value="Rwf">RWF</Option>
                              <Option value="Ksh">Ksh</Option>
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <Button
                      loading={loading}
                      onClick={() => form.submit()}
                      type="primary"
                      className={styles.formBtn}
                    >
                      Request Pre-Auth
                    </Button>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default CreatePreAuth;
