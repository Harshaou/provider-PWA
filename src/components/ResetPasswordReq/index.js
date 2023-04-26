import React, { useState } from 'react';
import styles from './index.module.css';
import { Alert, Button, Form, Input } from 'antd';
import loginPic from '../../img/loginPic.png';
import Logo from '../../img/logo.png';
import importantIcon from '../../img/important.png';
import axios from 'axios';
import { baseUrl } from '../../utils';

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState();
  const [alert, setMessage] = useState({
    status: 'initial',
    emailSent: false,
    emailExist: false,
    message: false,
  });

  const onFinish = async ({ email }) => {
    try {
      setLoading(true);
      const { data } = await axios({
        method: 'POST',
        url: `${baseUrl}/user/account/reset-password/init-token/${email}/Provider`,
        headers: { Accept: '*/*' },
      });

      if (data.api.responseCode === 2130) {
        setMessage({
          status: 'success',
          emailSent: true,
          emailExist: false,
          message: data.message,
        });
      } else if (data.api.responseCode === 3050) {
        setMessage({
          status: 'error',
          emailSent: false,
          emailExist: true,
          message: data.message,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage({
        status: 'error',
        emailSent: false,
        emailExist: false,
        message: error.response.data.message,
      });
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <img src={loginPic} alt="" className={styles.loginPic} />
      <div className={styles.box}>
        <img src={Logo} alt="iimg" className={styles.logo} />
        <div className={styles.sectionTwo}>
          <img src={importantIcon} alt="" className="importantIcon" />
          <p>Kindly enter your email address below to enable us reset your password</p>
        </div>
        <Form form={form} className="wFull" name="basic" onFinish={onFinish}>
          <p className={styles.fieldLabel} htmlFor="username">
            Enter Email Address
          </p>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your email!',
              },
            ]}
          >
            <Input placeholder="Enter your Email address" className="customAntInput" size="large" />
          </Form.Item>
          {alert.status !== 'initial' && <Alert message={alert.message} type={alert.status} />}
        </Form>
        {!alert.emailSent && (
          <div className={styles.submitBtn}>
            <Button
              loading={loading}
              className="custom-ant-button"
              onClick={() => form.submit()}
              shape="round"
              style={{ width: '85%' }}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Reset Password
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
