import { useEffect, useState } from 'react';
import Main from '../../../template';
import MemberCard from '../../Common/MemberCard';
import styles from './index.module.css';
import { AutoComplete, Button, DatePicker, Form, Input, notification, Radio } from 'antd';
import ICDdata from '../../../utils/ICD.json';
import UseIcdOptions from '../../Common/hooks/UseIcdOptions';
import DocData from '../../../utils/doctors.json';
import UseDoctorsOptions from '../../Common/hooks/UseDoctorsOptions';
import { UserOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

import DraggerComponent from './Upload';
import { useLocation, useNavigate } from 'react-router-dom';
import { preventMinus } from '../../Common/HelperFunctions';
import { baseUrl } from '../../../utils';

const CreateClaim = () => {
  const [form] = Form.useForm();
  const [files, setFiles] = useState([]);
  const [misc, setMisc] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDocSelect = (e) => {
    setDoctorDescription(DocData.filter((val) => val.Name === e)[0].discipline);
    setDoctorName(e);
    setFormLoading(true);
  };

  const [formLoaded, setFormLoading] = useState(false);
  const [icdCode, setIcdCode] = useState('');
  const [icdCodeTwo, setIcdCodeTwo] = useState('');
  const [disease, setDisease] = useState('');
  const [diseaseTwo, setDiseaseTwo] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [icdCodeColCount, setIcdCodeColCount] = useState(1);
  const [doctorDescription, setDoctorDescription] = useState('');
  const [doctorsOptions, setDoctorsOptions] = useState([{ label: '', value: '' }]);
  const [icdOptions, setIcdOptions] = useState([{ label: '', value: '' }]);

  const navigate = useNavigate();

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

  const doubleICDcode = () => (
    <div
      style={{
        display: 'flex',
        gap: '55px',
        justifyContent: 'flex-start',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h4 className={styles.formLabel}>Diagnosis </h4>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'This field cannot be empty',
            },
          ]}
          style={{ width: 375 }}
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
        <Form.Item name="icd_code" style={{ width: 375 }}>
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

  useEffect(() => {
    getMember();
    if (visit?.attending_doctor_name) {
      onDocSelect(visit?.attending_doctor_name);
    } else {
      setFormLoading(true);
    }
  }, []);

  const onFinish = (values) => {
    let diagnosisArray = icdCodeTwo
      ? [
          { icd_code: icdCodeTwo, name: diseaseTwo },
          { icd_code: icdCode, name: disease },
        ]
      : [{ icd_code: icdCode, name: disease }];

    const { claim_amount, date_of_diagnosis } = values;

    let formValue = {
      visit_id: visitId,
      diagnosis: diagnosisArray,
      claim_amount,
      currency: 'Rwf',
      date_of_diagnosis: date_of_diagnosis.format('YYYY-MM-DD'),
      attending_doctor_name: doctorName,
      attending_doctor_specialisation: doctorDescription,
    };

    let formData = new FormData();

    formData.append('request', JSON.stringify(formValue));
    files.map((item) => formData.append('files', item));
    misc.map((item) => formData.append('misc', item));

    let token = localStorage.getItem('x-auth-token');
    const options = {
      method: 'POST',
      headers: { accept: 'application/json', Authorization: `Bearer ${token}` },
      body: formData,
    };
    setLoading(true);
    fetch(`${baseUrl}/provider/medical-claim/`, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.api?.responseCode === 2010) {
          setLoading(false);
          openNotificationWithIcon('success', response.message);
          navigate(`/claims/${response?.result?.claim_id}`);
        } else {
          openNotificationWithIcon('error', response.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        openNotificationWithIcon('error', err.message);
        console.error(err);
        setLoading(false);
      });
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  const [memberHover, setMemberHover] = useState(false);
  return (
    <Main>
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center', marginTop: '-50px' }}>
        <a href="/Claims" className={styles.breadCrumb1}>
          Claims /{' '}
        </a>
        <MemberCard setHover={setMemberHover} visitID={visitId} />
      </div>

      <h3 className={styles.headerText}>
        Create Claim for Visit<span style={{ fontWeight: '400' }}> #{visit?.visit_id}</span>
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <div
            className={styles.cardShadow}
            style={{
              padding: '25px',
              position: 'relative',
              display: 'flex',
              gap: '17px',
              width: '90%',

              filter: memberHover ? 'blur(2px)' : null,
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '17px',
                flexDirection: 'column',
                height: '75vh',
                overflowY: 'scroll',
              }}
            >
              <h3 className={styles.cardTitle}>Claim form</h3>
              <h4 className={styles.cardSubTitle} style={{ marginTop: '-20px' }}>
                {` To submit a claim for a patient's treatment, please fill-in the claim form and
                provide us with the necessary information about the patient's medical condition and
                treatment done. We will guide you through the process and let you know if any
                additional documentation is required.`}
              </h4>

              <h4 className={styles.cardTitle2}>Clinical Information</h4>
              {formLoaded && (
                <Form
                  form={form}
                  onFinish={onFinish}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                  initialValues={{
                    attending_doctor_name: doctorName,
                  }}
                >
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
                        Diagnosis
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
                        name="disease"
                        rules={[
                          {
                            required: true,
                            message: 'This field cannot be empty',
                          },
                        ]}
                        style={{ width: 375 }}
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
                      <Form.Item name="icd_code" style={{ width: 375 }}>
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
                        <h4 className={styles.formLabel}>{`Doctor's Name`}</h4>
                        <Form.Item
                          name="attending_doctor_name"
                          rules={[
                            {
                              required: true,
                              message: 'This field cannot be empty',
                            },
                          ]}
                          style={{ width: 375 }}
                        >
                          <AutoComplete
                            options={doctorsOptions}
                            id="autoComplete"
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

                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h4 className={styles.formLabel}>{`Doctor's Discipline`}</h4>
                        <Form.Item name="icd_code" style={{ width: 375 }}>
                          <Input
                            style={{ width: '100%' }}
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
                        marginTop: '-10px',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h4 className={styles.formLabel}>Date of Diagnosis</h4>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: 'This field cannot be empty',
                            },
                          ]}
                          name="date_of_diagnosis"
                        >
                          <DatePicker
                            className="datePicker"
                            placeholder="Select Date of Diagnosis"
                            format="DD/MM/YYYY"
                          />
                        </Form.Item>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h4 className={styles.formLabel}>{`Claim Amount`}</h4>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: 'This field cannot be empty',
                            },
                          ]}
                          name="claim_amount"
                        >
                          <Input
                            type="number"
                            onKeyPress={preventMinus}
                            className={styles.formInput}
                            placeholder="Enter the claim amount"
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <h4 className={styles.cardTitle2}>Documents</h4>
                    <div
                      style={{
                        width: '48%',
                        gap: 10,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          gap: 15,
                          justifyContent: 'space-between',
                        }}
                      >
                        <h4 className={styles.formLabel}>Supported Claim Documents</h4>
                        <DraggerComponent setFiles={setFiles} fileCount={10} />
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
                        <h4 className={styles.formLabel}>Any other Documents</h4>
                        <DraggerComponent setFiles={setMisc} fileCount={10} />
                      </div>
                    </div>
                  </div>

                  <Button
                    disabled={files.length === 0}
                    loading={loading}
                    onClick={() => form.submit()}
                    type="primary"
                    style={{ marginTop: 20 }}
                    className={styles.formBtn}
                  >
                    Request Claim
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default CreateClaim;
