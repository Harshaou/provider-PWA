import { Button, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import closeIcon from '../../../../../img/close-modal.png';
import { baseUrl } from '../../../../../utils';
import { preventMinus } from '../../../../Common/HelperFunctions';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const PrescriptionModal = ({ isModalOpen, setIsModalOpen }) => {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [prescriptionCode, setPrescriptionCode] = useState('')

  const navigate = useNavigate();

  const onFinish = async (vals) => {
    setLoading(true);
    await fetch(`${baseUrl}/provider/rx/otp/${prescriptionCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('x-auth-token')}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.api.responseCode === 2040) {
          setIsModalOpen(false);
          navigate('/prescriptions/' + res?.result?.prescription?.prescription_id, { state: { prescription: res?.result?.prescription, member_benefit_balance: res?.result?.member_benefit_balance } });
        } else {
          setError(res.message);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  return (
    <Modal width={520} footer={null} visible={isModalOpen}>
      <Button
        type='default'
        onClick={() => {
          setIsModalOpen(false);
        }}
        style={{ position: 'absolute', top: 25, right: 25, borderRadius: '25px', width: '25px', height: '32px', display: 'flex', justifyContent: "center", alignItems: 'center' }}
      >
        <CloseOutlined
          style={{ height: '24px', marginTop: '9px', marginLeft: '1px' }}
        />
      </Button>
      <div style={{ marginBottom: 15 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '15px 25px',
          }}
        >
          <h2 style={{ marginBottom: 0 }}>Fill Prescription</h2>
          <p style={{ marginBottom: 0, fontSize: '14px', fontWeight: '300' }}>Enter Prescription OTP recieved on Patient&apos;s registered phone number or email to proceed.</p>
          <div style={{ width: '80%', marginTop: 25 }}>
            <p
              style={{
                fontWeight: 500,
                marginBottom: 5,
                marginLeft: 5,
              }}
            >
              Prescription OTP
            </p>

            <Input
              onClick={() => setError('')}
              className="dashboardModalInputs"
              onChange={(e) => {
                if (e.target.value.length < 9 && (e.target.value === '' || e.target.value.match(new RegExp(/[0-9]$/g))))
                  setPrescriptionCode(e.target.value)
              }}
              value={prescriptionCode}
              size="large"
              style={{
                borderRadius: 20,
                height: 50,
              }}
              placeholder="Enter Prescription OTP"
              allowClear
            />
          </div>

          {error && (
            <div
              style={{ color: 'red', fontSize: 13, textAlign: 'center', marginTop: 12, width: '75%' }}
            >
              {error?.replaceAll('_', ' ')}
            </div>
          )}

          <Button
            onClick={() => onFinish()}
            disabled={prescriptionCode.length < 8}
            loading={loading}
            style={{
              width: 220,
              marginTop: error ? '40px' : '20px',
            }}
            size="large"
            type="primary"
            shape="round"
          >
            Verify OTP
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default PrescriptionModal;
