import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../utils';

const VisitStepTwo = ({ setStep, memberNumber, setUniqueKey }) => {
  const [delay, setDelay] = useState(180);
  const [error, setError] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  });

  const onFinish = async () => {
    let token = localStorage.getItem('x-auth-token');
    setLoading(true);
    await fetch(`${baseUrl}/provider/visit/validate-otp/${memberNumber}/${otpInput}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.api.responseCode === 2270) {
          console.log('res', res);
          setUniqueKey(res.result?.token);
          setStep(2);
        } else {
          setError(res.message);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  const resendOTP = async () => {
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
          setDelay(180);
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginTop: 15,
          width: '80%',
        }}
      >
        <div style={{ width: '100%' }}>
          <p
            style={{
              fontWeight: 500,
              fontSize: 13,
              marginBottom: 4,
              marginLeft: 10,
            }}
          >
            {`Patient's `}Member number or NIDA number
          </p>
          <Input
            size="large"
            value={memberNumber}
            disabled
            style={{
              borderRadius: 20,
              height: 50,
            }}
            placeholder="Enter member number or NIDA number"
          />
        </div>
        <div style={{ width: '100%', marginTop: 10 }}>
          <p
            style={{
              fontWeight: 500,
              fontSize: 13,
              marginBottom: 4,
              marginLeft: 10,
            }}
          >
            One time passcode (OTP)
          </p>
          <Input
            onChange={(e) => {
              if (e.target.value.length < 9 && (e.target.value === '' || e.target.value.match(new RegExp(/[0-9]$/g))))
                setOtpInput(e.target.value)
            }}
            value={otpInput}
            onClick={() => setError('')}
            size="large"
            style={{
              borderRadius: 20,
              height: 50,
            }}
            placeholder="Enter one time passcode"
          />
        </div>
        <p
          style={{
            textAlign: 'center',
            fontSize: 12,
            color: '#A3A3A3',
            marginTop: 10,
            width: '70%',
          }}
        >
          A One Time Password (OTP) has been sent.
        </p>

        {error && (
          <div style={{ color: 'red', fontSize: 13, textAlign: 'center', marginTop: 12 }}>
            {error?.replaceAll('_', ' ')}
          </div>
        )}

        <Button
          onClick={() => onFinish()}
          loading={loading}
          style={{
            width: 260,
          }}
          type="primary"
          shape="round"
          size="large"
        >
          Verify OTP
        </Button>
        <Button
          disabled={delay > 0}
          onClick={() => resendOTP()}
          style={delay === 0 ? { color: '#3AB44D' } : { color: '#AFAFAF' }}
          type="text"
        >
          <span style={{ textDecoration: 'underline' }}>
            Resend OTP {delay > 0 && `in ${delay} seconds`}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default VisitStepTwo;
