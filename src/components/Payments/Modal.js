import { useState } from 'react';
import { Button, Upload, Modal, Radio } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import UploadImg from '../../img/upload.png';
import CloseModalImg from '../../img/close-modal.png';
import styles from './index.module.css';

const RequestPreAuth = ({ setIsModalVisible, isModalVisible }) => {
  const { Dragger } = Upload;
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <Modal
        className="fileClaim"
        bodyStyle={{ padding: 50 }}
        footer={null}
        visible={isModalVisible}
      >
        <div
          onClick={() => setIsModalVisible(false)}
          style={{ cursor: 'pointer' }}
          className="modalCloseIcon"
        >
          <img src={CloseModalImg} style={{ width: 28 }} alt="" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 35 }}>
          <div>
            <h1 className="mbZero">New Claim</h1>
            <h5 className="mbZero">Fill in the form below to make a New Claim</h5>
          </div>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Outpatient</Radio>
            <Radio value={2}>Inpatient</Radio>
          </Radio.Group>
          <div>
            <p style={{ fontWeight: 700, marginBottom: 6 }}>Upload Documents</p>
            <Dragger>
              <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginLeft: 30 }}>
                <img style={{ height: 50 }} src={UploadImg} alt="UploadImg" />
                <div>
                  <h5 className="mbZero" style={{ fontWeight: 700 }}>
                    Browse to upload
                  </h5>
                  <p style={{ color: '#f87d4e', fontSize: 10, textAlign: 'start' }}>
                    Or Drag to Drop
                  </p>
                </div>
              </div>
            </Dragger>
          </div>
          {value === 1 ? (
            <div style={{ width: '70%' }}>
              <p style={{ fontWeight: 700, color: '#f87d4e' }}>Required documents</p>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckOutlined style={{ color: '#f87d4e', marginRight: 6, paddingBottom: 7 }} />
                <div className={styles.borderBottom}>claim form</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckOutlined style={{ color: 'white', marginRight: 6, paddingBottom: 7 }} />
                <div className={styles.borderBottom}>Invoice</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckOutlined style={{ color: '#f87d4e', marginRight: 6, paddingBottom: 7 }} />
                <div className={styles.borderBottom}>Medical Report</div>
              </div>
            </div>
          ) : (
            <div style={{ width: '70%' }}>
              <p style={{ fontWeight: 700, color: '#f87d4e' }}>Required documents</p>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckOutlined style={{ color: '#f87d4e', marginRight: 6, paddingBottom: 7 }} />
                <div className={styles.borderBottom}>claim form</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckOutlined style={{ color: 'white', marginRight: 6, paddingBottom: 7 }} />
                <div className={styles.borderBottom}>Invoice</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckOutlined style={{ color: '#f87d4e', marginRight: 6, paddingBottom: 7 }} />
                <div className={styles.borderBottom}>Medical Report</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CheckOutlined style={{ color: 'white', marginRight: 6, paddingBottom: 7 }} />
                <div className={styles.borderBottom}>Discharge Form</div>
              </div>
            </div>
          )}

          <Button
            onClick={() => setIsModalVisible(false)}
            size="large"
            style={{ width: '55%' }}
            type="primary"
            shape="round"
          >
            File claim
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default RequestPreAuth;
