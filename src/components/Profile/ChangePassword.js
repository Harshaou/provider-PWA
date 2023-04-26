import { useState } from 'react';
import { Button, Form, Input, notification, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../store/profileSlice';
import PopOverValidityCheck from '../Common/PopOverValidityCheck';
import { checkUppercaseAndNumb } from '../Common/UtilFunctions';
import styles from './index.module.css';

const ChangePassword = ({ setEdit, state }) => {
  const [inputValue, setInputValue] = useState();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { loading } = useSelector((state) => state.profile);

  const onFinish = (val) => {
    let data = {
      current_password: val.current_password,
      new_password: val.password,
    };

    dispatch(
      changePassword({
        data: JSON.stringify(data),
        notification: openNotificationWithIcon,
        navigate: setEdit,
      }),
    );
  };

  const openNotificationWithIcon = (type, description) => {
    notification[type]({
      message: type === 'success' ? 'Password Change Successful' : description,
    });
  };

  return (
    <>
      <div>
        <Form
          style={{ width: '50%' }}
          form={form}
          className="wFull"
          name="basic"
          onFinish={onFinish}
        >
          <p className={styles.fieldLabel}>
            Enter Current Password <span style={{ color: '#f87d4e' }}>*</span>
          </p>
          <Form.Item
            name="current_password"
            rules={[
              {
                required: true,
                message: 'Cannot be empty',
              },
            ]}
          >
            <Input.Password style={{ borderRadius: 7 }} size="large" />
          </Form.Item>

          <Popover
            content={<PopOverValidityCheck value={inputValue} />}
            title="Make sure your new password is secure"
          >
            <p className={styles.fieldLabel}>
              Enter New Password <span style={{ color: '#f87d4e' }}>*</span>
            </p>
            <Form.Item
              name="password"
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
                      return Promise.reject(new Error('Password must between 8 to 22 characters'));
                    }
                  },
                }),
              ]}
            >
              <Input.Password
                style={{ borderRadius: 7 }}
                onChange={(e) => setInputValue(e.target.value)}
                size="large"
              />
            </Form.Item>
          </Popover>

          <p className={styles.fieldLabel}>
            Confirm Password<span style={{ color: '#f87d4e' }}> *</span>
          </p>
          <Form.Item
            className="mbZero"
            name="confirm"
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
            <Input.Password style={{ borderRadius: 7 }} size="large" />
          </Form.Item>
          <div style={{ display: 'flex', gap: 10, float: 'right' }}>
            <Button
              type="dashed"
              style={{ marginTop: 15, width: 100 }}
              shape="round"
              onClick={() => setEdit(false)}
            >
              Cancel
            </Button>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              style={{ marginTop: 15, width: 100 }}
              shape="round"
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ChangePassword;
