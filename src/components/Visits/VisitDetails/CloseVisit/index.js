import { Button, Form, Input, Modal, notification } from 'antd';
import styles from './index.module.css';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { baseUrl } from '../../../../utils';
import { useDispatch } from 'react-redux';
import { getVisitDashboard } from '../../../../store/dashboardSlice';
import { getVisits } from '../../../../store/visitSlice';

const CloseVisitModal = ({ status, visitNumber, isModalOpen, setIsModalOpen, page }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    let token = localStorage.getItem('x-auth-token');
    await fetch(`${baseUrl}/provider/visit/update-status/${visitNumber}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.api.responseCode === 2030) {
          console.log(res);
          openNotificationWithIcon('success', res.message);
          setIsModalOpen(false);
          navigate('/visits');
        } else {
          openNotificationWithIcon('error', res.message);
          setError(res.message);
        }
      });
    setLoading(false)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  const [closeForm] = Form.useForm();

  return (
    <Modal visible={isModalOpen} bodyStyle={{ padding: '0px' }} footer={null}>
      <div className={styles.modalContainer}>
        <Button className={styles.closeBtn} onClick={() => { closeForm.resetFields(); setIsModalOpen(false) }}>
          <CloseOutlined />
        </Button>
        <h3 className={styles.modalTitle}>Close Patient Visit</h3>
        <h4 className={styles.modalSubTitle}>Form to close a Patient Visit</h4>

        <Form
          form={closeForm}
          onFinish={onFinish}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h4 className={styles.formLabel}>Enter the total cost of treatment</h4>
          <Form.Item
            name="total_cost_of_treatment"
            style={{ width: '100%' }}
            rules={[
              { required: true, message: 'Please enter total cost' },
              { min: 0, message: 'Please enter valid cost' },
            ]}
          >
            <Input
              className={styles.input}
              type="number"
              placeholder="Enter the total cost of treatment"
            />
          </Form.Item>
          <h4 className={styles.formLabel}>Any Comment?</h4>
          <Form.Item name="comments" style={{ width: '100%' }} rules={[{ required: false }]}>
            <Input.TextArea
              allowClear
              rows={5}
              className={styles.input}
              placeholder="Enter any comment or description, if required"
            />
          </Form.Item>
          <Button
            loading={loading}
            className={styles.closeVisitBtn}
            type="primary"
            htmlType="submit"
            disabled={status === 'Closed'}
          >
            {status === 'Closed' ? 'Visit Already Closed' : 'Close Visit'}
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default CloseVisitModal;
