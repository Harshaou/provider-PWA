import React, { useState } from 'react';
import styles from './index.module.css';
import loginPic from '../../img/loginPic.png';
import { Button, Divider, Form, Input } from 'antd';

import { baseUrl } from '../../utils';
import axios from 'axios';
import ResetPasswordScreen from './ResetPasswordScreen';

const Welcome = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [screen, setScreen] = useState(1);
  const [passwordLength, setPasswordLength] = useState(false);

  const onFinish = async (value) => {
    let email = value.email.trim();
    let password = value.password.trim();
    setCurrentPassword(password);
    let values = { ref_access: 'Provider', email, password };
    if (value.password.trim().length > 5) {
      setPasswordLength(false);
      try {
        setLoading(true);
        const response = await axios({
          method: 'POST',
          data: JSON.stringify(values),
          url: `${baseUrl}/user/login`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        setLoading(false);
        const { data } = response;
        if (data?.api.responseCode === 2250) {
          localStorage.setItem('x-auth-token', response.headers.token);
          localStorage.setItem('providerUser', JSON.stringify(data.result));
          setScreen(2);
          return data;
        }
        if (data?.api.responseCode === 3050) {
          setError(data.message);
        }
      } catch (error) {
        setLoading(false);
        setError('Oops! Invalid credentials');
      }
    } else {
      setPasswordLength(true);
    }
  };

  return screen === 1 ? (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3 className={styles.welcomeTitle}>Welcome to Eden Care Medical</h3>
            <p className={styles.welcomeText}>
              Please log in to your account using the credentials that you received via email.
            </p>
          </div>
          <img src={loginPic} alt="" className={styles.loginPic} />
        </div>
        <Divider style={{ margin: 0 }} />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={styles.loginBox}>
            <Form
              form={form}
              className="wFull"
              style={{ padding: '0px 30px' }}
              name="basic"
              onFinish={onFinish}
            >
              <p className={styles.fieldLabel}>Email</p>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'A valid email is required',
                  },
                ]}
              >
                <Input placeholder="Enter your Email" className="customAntInput" size="large" />
              </Form.Item>

              <p className={styles.fieldLabel}>Password</p>
              <Form.Item
                className="mbZero"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Password required for authentication',
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter your Password"
                  className="customAntInput"
                  size="large"
                />
              </Form.Item>
            </Form>

            {passwordLength && (
              <span style={{ color: 'red', marginTop: -20, marginBottom: -10 }}>
                Minimum 6 characters required
              </span>
            )}

            {error && (
              <span
                style={{
                  color: 'red',
                  marginTop: -20,
                  marginBottom: -10,
                  width: '70%',
                }}
              >
                {error}
              </span>
            )}
            <div className={styles.submitBtn}>
              <Button
                loading={loading}
                onClick={() => form.submit()}
                shape="round"
                style={{
                  width: '65%',
                  backgroundColor: '#3ab44d',
                  color: 'white',
                }}
                size="large"
                type="text"
                htmlType="submit"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <ResetPasswordScreen currentPassword={currentPassword} />
  );
};

export default Welcome;
