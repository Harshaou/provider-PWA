import Main from '../../template';
import styles from './index.module.css';
import { Button, Form, Input, Select, notification } from 'antd';
import CollapseComponent from './Collapse';
import axios from 'axios';
import { baseUrl } from '../../utils';
import { useEffect, useState } from 'react';
const { Option } = Select;

const Index = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    let token = localStorage.getItem('x-auth-token');
    setLoading(true);
    try {
      const response = await axios({
        method: 'POST',
        url: `${baseUrl}/support/ticket`,
        data: values,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      form.resetFields();
      openNotification('success', response.data.message);
      setLoading(false);
    } catch (error) {
      openNotification('error');
      setLoading(false);
    }
  };

  const openNotification = (type, msg) => {
    notification[type]({
      message: type === 'success' ? 'Form Submitted Successfully' : 'Form Submission Failed ',
      description: msg,
    });
  };

  return (
    <Main pageName="Support">
      <div className={styles.container}>
        <section className={styles.section1}>
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 32, fontWeight: 400, marginBottom: 15 }}>
              We are here to help you!
            </p>
            <p style={{ color: '#a3a3a3', fontSize: 14 }}>
              Please fill in the form below as much details as possible, our technical support team
              will be in contact to assist with your request.
            </p>
          </div>
          <Form form={form} className="wFull" name="basic" onFinish={onFinish}>
            <label className="fieldLabel" htmlFor="username">
              Area or Section
            </label>
            <Form.Item
              name="support_area"
              rules={[
                {
                  required: true,
                  message: 'Please select a value',
                },
              ]}
            >
              <Select
                style={{ width: '70%' }}
                className="support"
                placeholder="Select section"
                size="large"
              >
                <Option value="Visit_Creation"> Visit Creation</Option>
                <Option value="Pre_Authorisation">Pre-Authorisation</Option>
                <Option value="Claims">Claims</Option>
                <Option value="Prescription_Creation">Prescription Creation</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>

            <label className="fieldLabel" htmlFor="username">
              Problem
            </label>
            <Form.Item
              className="mbZero"
              name="query"
              rules={[
                {
                  required: true,
                  message: 'Please input text!',
                },
              ]}
            >
              <Input.TextArea
                style={{ fontSize: 14, padding: 15 }}
                rows={5}
                placeholder="Type here"
                className="support"
                size="large"
              />
            </Form.Item>
            <div style={{ marginTop: 25 }}>
              <Button
                loading={loading}
                onClick={() => form.submit()}
                size="large"
                shape="round"
                type="primary"
              >
                Send Message
              </Button>
            </div>
          </Form>
        </section>
        <section className={styles.section2}>
          <div>
            <p style={{ fontSize: 32, fontWeight: 400, marginBottom: 15 }}>
              Frequently asked Questions {'(FAQs)'}
            </p>
            <div
              style={{
                padding: 20,
                borderRadius: 30,
                maxHeight: '70vh',
                overflowY: 'scroll',
              }}
            >
              <CollapseComponent />
            </div>
          </div>
        </section>
      </div>
    </Main>
  );
};

export default Index;
