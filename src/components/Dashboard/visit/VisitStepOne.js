import { Button, Input } from 'antd';
import { useState } from 'react';
import { preventMinus } from '../../../components/Common/HelperFunctions';
import { baseUrl } from '../../../utils';

const VisitStepOne = ({ memberNumber, setMemberNumber, setStep }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onFinish = async () => {
    let token = localStorage.getItem('x-auth-token');
    setLoading(true);
    await fetch(`${baseUrl}/provider/visit/initiate-otp/${memberNumber}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.api.responseCode === 2230) {
          setMemberNumber(res?.result?.member_number);
          setStep(1);
        } else {
          setError(res.message);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
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
      <h2 style={{ marginBottom: 0 }}>New Patient Visit</h2>
      <p style={{ color: '#262626', fontSize: 13 }}>Patient Verification Form</p>
      <div style={{ width: '80%', marginTop: 25 }}>
        <p
          style={{
            fontWeight: 500,
            marginBottom: 5,
            marginLeft: 5,
          }}
        >
          {`Patient's `}Member number or NIDA number
        </p>

        <Input
          onClick={() => setError('')}
          className="dashboardModalInputs"
          onChange={(e) => {
            if (e.target.value.length < 17 && (e.target.value === '' || e.target.value.match(new RegExp(/[0-9]$/g))))
              setMemberNumber(e.target.value)
          }}
          size="large"
          value={memberNumber}
          style={{
            borderRadius: 20,
            height: 50,
          }}
          placeholder="Enter member number or NIDA number"
        />
      </div>

      {error && (
        <div
          style={{ color: 'red', fontSize: 13, textAlign: 'center', marginTop: 12, width: '75%' }}
        >
          {error?.replaceAll('_', ' ')}
        </div>
      )}

      <Button
        onClick={() => onFinish()}
        disabled={memberNumber.length < 11}
        loading={loading}
        style={{
          width: 220,
          marginTop: 40,
        }}
        size="large"
        type="primary"
        shape="round"
      >
        Send OTP
      </Button>
    </div>
  );
};

export default VisitStepOne;
