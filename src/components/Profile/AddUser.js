import { useState } from 'react';
import { Button, Form, Input, notification, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser, changePassword } from '../../store/profileSlice';

import styles from './index.module.css';
const { Option } = Select;

const AddUser = ({ setAddUser }) => {
  const { ref_id } = JSON.parse(localStorage.getItem('providerUser'));
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { loading } = useSelector((state) => state.profile);

  const onFinish = (val) => {
    let data = {
      ...val,
      ref_id,
      ref_access: 'Provider',
    };

    dispatch(
      addNewUser({
        data: JSON.stringify(data),
        notification: openNotificationWithIcon,
        addUserScreen: setAddUser,
      }),
    );
  };

  const openNotificationWithIcon = (type, description, error) => {
    notification[type]({
      message: type === 'success' ? 'Add User Successful' : error ? error : 'Something went wrong',
      description: description ? description : '',
    });
  };

  return (
    <>
      <div>
        <h2
          style={{
            marginBottom: 20,
            marginLeft: 8,
          }}
        >
          Add New User
        </h2>
        <Form
          style={{ width: '70%' }}
          form={form}
          className="wFull"
          name="basic"
          onFinish={onFinish}
        >
          <div className={styles.formDiv}>
            <div className={styles.formItem}>
              <span>
                First Name <span style={{ color: '#f87d4e' }}>*</span>
              </span>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
                name="first_name"
              >
                <Input
                  size="large"
                  style={{ borderRadius: 10 }}
                  placeholders="Provider name"
                  className="ant-custom-input"
                />
              </Form.Item>
            </div>
            <div className={styles.formItem}>
              <span>
                Last Name <span style={{ color: '#f87d4e' }}>*</span>
              </span>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
                name="last_name"
              >
                <Input
                  size="large"
                  style={{ borderRadius: 10 }}
                  placeholders="Provider name"
                  className="ant-custom-input"
                />
              </Form.Item>
            </div>
          </div>

          <div className={styles.formDiv}>
            <div className={styles.formItem}>
              <span>
                Email <span style={{ color: '#f87d4e' }}>*</span>
              </span>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input
                  type="email"
                  size="large"
                  style={{ borderRadius: 10 }}
                  placeholders="Provider name"
                  className="ant-custom-input"
                />
              </Form.Item>
            </div>
            <div className={styles.formItem}>
              <span>
                Role <span style={{ color: '#f87d4e' }}>*</span>
              </span>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
                name="role"
              >
                <Select size="large" onChange={() => console.log()}>
                  <Option value="Super_Admin">Super Admin</Option>
                  <Option value="Admin">Admin</Option>
                  <Option value="Operator">Operator</Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          <div style={{ width: '100%' }}>
            <span>Contact Number</span>
            <Form.Item name="contact_number">
              <Input
                type="number"
                size="large"
                style={{ borderRadius: 10 }}
                placeholders="Provider name"
                className="ant-custom-input"
              />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', gap: 10, float: 'right' }}>
            <Button
              type="dashed"
              style={{ marginTop: 15, width: 100 }}
              shape="round"
              onClick={() => setAddUser(false)}
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
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddUser;
