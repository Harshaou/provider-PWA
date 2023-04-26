import React, { useState } from 'react';
import styles from './index.module.css';
import loginPic from '../../img/loginPic.png';
import { Button, Divider, Form, Input, notification, Popover } from 'antd';
import PopOverValidityCheck from '../Common/PopOverValidityCheck';
import { checkUppercaseAndNumb } from '../Common/UtilFunctions';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../utils';
import axios from 'axios';

const ResetPasswordScreen = ({ currentPassword }) => {
  const [inputValue, setInputValue] = useState();
  const [loading, setLoading] = useState();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (val) => {
    setLoading(true);
    let data = {
      current_password: currentPassword,
      new_password: val.password,
    };
    try {
      let token = localStorage.getItem('x-auth-token');
      const response = await axios({
        method: 'PATCH',
        url: `${baseUrl}/user/account/password`,
        data: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      navigate('/');
      return response.data;
    } catch (error) {
      setLoading(false);
      openNotificationWithIcon('error', error.response.data.message);
    }
  };

  const openNotificationWithIcon = (type, description) => {
    notification[type]({
      message: type === 'success' ? 'Password Change Successful' : description,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentBoxResetPassword}>
        <div>
          <h2>Change password</h2>
          <p className={styles.welcomeText}>
            This page assists you in creating a personalized password for your account. It is highly
            recommended to choose a robust password to ensure the security of your account.
          </p>
        </div>

        <Divider />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={styles.loginBox}>
            <img src={loginPic} alt="" style={{ height: 100 }} />
            <Form
              style={{ width: '70%' }}
              form={form}
              className="wFull"
              name="basic"
              onFinish={onFinish}
            >
              <Popover
                content={<PopOverValidityCheck value={inputValue} />}
                title="Make sure your new password is secure"
              >
                <p className={styles.fieldLabel}>
                  Enter New Password <span style={{ color: '#f87d4e' }}>*</span>
                </p>
                <Form.Item
                  name="password"
                  validateTrigger="onSubmit"
                  hasFeedback={false}
                  rules={[
                    () => ({
                      validator(_, value) {
                        if (value?.length > 7 && value.length < 23) {
                          if (checkUppercaseAndNumb(value)) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(
                              new Error(
                                'Password should contain an uppercase, lowercase, numerics & special characters.',
                              ),
                            );
                          }
                        } else {
                          return Promise.reject(
                            new Error('Password must between 8 to 22 characters'),
                          );
                        }
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    style={{ borderRadius: 10 }}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your Password"
                    size="large"
                  />
                </Form.Item>
              </Popover>

              <p className={styles.fieldLabel}>
                Confirm new Password<span style={{ color: '#f87d4e' }}> *</span>
              </p>
              <Form.Item
                className="mbZero"
                name="confirm"
                validateTrigger="onSubmit"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },

                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error('The two passwords that you entered do not match!'),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  style={{ borderRadius: 10 }}
                  placeholder="Confirm Password"
                  size="large"
                />
              </Form.Item>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 20,
                }}
              >
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  style={{ marginTop: 15, width: 200 }}
                  shape="round"
                >
                  Continue
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
