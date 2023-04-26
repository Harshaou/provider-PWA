import React, { useState } from 'react';
import styles from './index.module.css';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import loginPic from '../../img/loginPic.png';

import { baseUrl } from '../../utils';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [passwordLength, setPasswordLength] = useState(false);

  var refresh = window.localStorage.getItem('refresh');
  if (refresh === null) {
    localStorage.removeItem('x-auth-token');
    localStorage.clear('providerUser');
    window.location.reload();
    window.localStorage.setItem('refresh', '1');
  }

  const onFinish = async (value) => {
    let email = value.email.trim();
    let password = value.password.trim();
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
        const { data } = response;
        setLoading(false);
        if (data?.api.responseCode === 2250) {
          localStorage.setItem('x-auth-token', response.headers.token);
          localStorage.setItem('providerUser', JSON.stringify(data.result));
          navigate('/');
          if (data?.result?.type === 'Pharmacy') {
            window.location.reload();
          }
        }
        setError(data.message);
      } catch (error) {
        setLoading(false);
        setError('Oops! Invalid credentials');
      }
    } else {
      setPasswordLength(true);
    }
  };

  return (
    <div className={styles.container}>
      <img src={loginPic} alt="" className={styles.loginPic} />
      <div className={styles.box}>
        <img src="icons/logo.png" className={styles.logo} />
        <Form
          form={form}
          className="wFull"
          style={{ padding: '0px 30px' }}
          name="basic"
          onFinish={onFinish}
        >
          <p className={styles.fieldLabel}>Username</p>
          <Form.Item
            name="email"
            validateTrigger="onSubmit"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
                type: 'email',
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
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your Password"
              className="customAntInput"
              size="large"
            />
          </Form.Item>

          <Link to="/reset-password-request" className={styles.forgottPassword}>
            Forgot Password
          </Link>
        </Form>
        {passwordLength && <span className={styles.errorText}>Minimum 6 characters required</span>}
        {error && <span className={styles.errorText}>{error}</span>}
        <div className={styles.submitBtn}>
          <Button
            loading={loading}
            onClick={() => form.submit()}
            shape="round"
            style={{ width: '85%', backgroundColor: '#3ab44d', color: 'white' }}
            size="large"
            type="text"
            htmlType="submit"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
