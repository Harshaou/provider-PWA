import { AutoComplete, Button, Input, notification, Radio } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getVisitDashboard } from '../../../store/dashboardSlice';
import { getVisits } from '../../../store/visitSlice';
import { baseUrl } from '../../../utils';
import DocData from '../../../utils/doctors.json';
import UseDoctorsOptions from '../../Common/hooks/UseDoctorsOptions';

const VisitStepThree = ({ setIsModalOpen, setStep, memberNumber, page, uniqueKey }) => {
  const dispatch = useDispatch();
  const [doctorsOptions, setDoctorsOptions] = useState([{ label: '', value: '' }]);
  const [value, setValue] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [doctorDescription, setDoctorDescription] = useState('');
  const [doctorName, setDoctorName] = useState('');

  const onDocSelect = (e) => {
    setDoctorName(e);
    setDoctorDescription(DocData.filter((val) => val.Name === e)[0].discipline);
  };

  const navigate = useNavigate();

  const onFinish = async () => {
    if (value === 0) setError('Please Select Type of Visit')
    else {
      setLoading(true);
      let token = localStorage.getItem('x-auth-token');
      await fetch(`${baseUrl}/provider/visit/${uniqueKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          member_number: memberNumber,
          attending_doctor_name: doctorName,
          attending_doctor_specialisation: doctorDescription,
          visit_type: value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.api.responseCode === 2010) {
            navigate(`/visits/${res?.result?.visit_id}`);
            openNotificationWithIcon('success', res.message);
            setStep(0);
            setIsModalOpen(false);
          } else {
            openNotificationWithIcon('error', res.message);
            setError(res.message);
          }
        });
      setLoading(false)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));

      setIsModalOpen(false);
    }
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2 style={{ marginBottom: 0, fontSize: 25 }}>New Patient Visit</h2>
      <p style={{ color: '#262626', fontSize: 14 }}>Patient Verification Form</p>
      <div style={{ width: 375, marginTop: 15, marginBottom: 10 }}>
        <div style={{ marginBottom: 15 }}>
          <p
            style={{
              fontWeight: 500,
              fontSize: 15,
              marginBottom: 3,
            }}
          >
            What type of Visit it is ?
          </p>
          <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
            <div>
              <Radio style={{ color: '#A3A3A3', fontSize: 15, marginRight: 50 }} value="Outpatient">
                Outpatient
              </Radio>
              <Radio style={{ color: '#A3A3A3', fontSize: 15 }} value="Inpatient">
                Inpatient
              </Radio>
            </div>
            <div style={{ marginTop: 5 }}>
              <Radio style={{ color: '#A3A3A3', fontSize: 15, marginRight: 76 }} value="Optical">
                Optical
              </Radio>
              <Radio style={{ color: '#A3A3A3', fontSize: 15 }} value="Dental">
                Dental
              </Radio>
            </div>
          </Radio.Group>
        </div>
        <div>
          <p
            style={{
              fontWeight: 500,
              fontSize: 15,
              marginBottom: 3,
            }}
          >
            {`Doctor's Name`}
          </p>
          <AutoComplete
            style={{ width: '100%' }}
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
        </div>
      </div>
      {error && (
        <div
          style={{ color: 'red', fontSize: 13, textAlign: 'center', marginTop: 20, width: '75%' }}
        >
          {error?.replaceAll('_', ' ')}
        </div>
      )}

      <Button
        size="large"
        loading={loading}
        onClick={() => onFinish()}
        style={{
          width: 250,
          marginTop: 30,
        }}
        type="primary"
        shape="round"
      >
        Create Visit
      </Button>
    </div>
  );
};

export default VisitStepThree;
