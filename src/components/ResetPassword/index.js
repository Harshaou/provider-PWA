import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Alert, Button, Form, Input, Popover } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import loginPic from '../../img/loginPic.png';
import Logo from '../../img/logo.png';
import axios from 'axios';
import { baseUrl } from '../../utils';
import PopOverValidityCheck from '../Common/PopOverValidityCheck';
import { checkUppercaseAndNumb } from '../Common/UtilFunctions';
import DisplayInvalidToken from './DisplayInvalidToken';

const ResetPassword = () => {
  const [inputValue, setInputValue] = useState();
  const [isTokenValid, setIsTokenValid] = useState();
  const [alert, setMessage] = useState({
    status: 'initial',
    message: false,
  });
  const [form] = Form.useForm();
  const navigate = useNavigate();
  let { token } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${baseUrl}/user/account/reset-password/check/${token}`);
        setIsTokenValid(data?.result?.email);
      } catch (e) {
        setIsTokenValid(false);
        console.error(e);
      }
    }
    if (token) {
      fetchData();
    }
  }, [token]);

  const onFinish = async ({ password }) => {
    let values = { new_password: password, token };
    try {
      const { data } = await axios({
        method: 'POST',
        data: JSON.stringify(values),
        url: `${baseUrl}/user/account/reset-password`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      form.resetFields();
      setMessage({ status: 'success', message: data.message, error: false });
    } catch (error) {
      setMessage({
        status: 'error',
        message:
          'This link is either broken or the token has expired. Please try resetting your password again',
        error: true,
      });
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <img src={loginPic} alt="" className={styles.loginPic} />
      <div className={styles.box}>
        <img src={Logo} alt="" className={styles.logo} />
        {isTokenValid ? (
          <>
            {alert.status !== 'success' && (
              <Form form={form} className="wFull" name="resetPassword" onFinish={onFinish}>
                <Popover
                  content={<PopOverValidityCheck value={inputValue} />}
                  title="Make sure your new password is secure"
                >
                  <p className={styles.fieldLabel}>Password</p>
                  <Form.Item
                    name="password"
                    validateTrigger="onSubmit"
                    hasFeedback={false}
                    rules={[
                      {
                        required: true,
                      },
                      () => ({
                        validator(_, value) {
                          if (value.length > 7 && value.length < 24) {
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
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter your Password"
                      className="customAntInput"
                      size="large"
                    />
                  </Form.Item>
                </Popover>

                <p className={styles.fieldLabel}>Confirm Password</p>
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
                    placeholder="Repeat Password"
                    className="customAntInput"
                    size="large"
                  />
                </Form.Item>
              </Form>
            )}

            {alert.status !== 'initial' && <Alert message={alert.message} type={alert.status} />}
            {alert.status === 'success' ? (
              <Button
                onClick={() => navigate('/login')}
                shape="round"
                style={{
                  width: '85%',
                  backgroundColor: '#3ab44d',
                  color: 'white',
                }}
                size="large"
                type="text"
                htmlType="submit"
              >
                Redirect to login page
              </Button>
            ) : (
              <div className={styles.submitBtn}>
                <Button
                  onClick={() => form.submit()}
                  shape="round"
                  style={{
                    width: '85%',
                    backgroundColor: '#3ab44d',
                    color: 'white',
                  }}
                  size="large"
                  type="text"
                  htmlType="submit"
                >
                  Reset Password
                </Button>
              </div>
            )}
          </>
        ) : (
          <DisplayInvalidToken />
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
