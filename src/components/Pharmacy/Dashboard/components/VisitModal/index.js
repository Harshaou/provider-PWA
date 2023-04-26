import { Button, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../../../../utils';
import { preventMinus } from '../../../../Common/HelperFunctions';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const VisitModal = ({ isModalOpen, setIsModalOpen }) => {

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [visitId, setVisitId] = useState('')
  const [visit, setVisit] = useState()

  const onFinish = async () => {
    setLoading(true);
    await fetch(`${baseUrl}/pharmacy/lookup/visit/${visitId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('x-auth-token')}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.api.responseCode === 2040) {
          setVisit(res?.result, navigate('/file-claim', { state: { data: res?.result } }));
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

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '15px 25px',
          marginBottom: '15px'
        }}
      >
        <h2 style={{ marginBottom: 0 }}>File Claim</h2>
        <p style={{ marginBottom: 0, fontSize: '14px', fontWeight: '300' }}>Enter Patient&apos;s Visit ID to proceed.</p>
        <div style={{ width: '80%', marginTop: 25 }}>
          <p
            style={{
              fontWeight: 500,
              marginBottom: 5,
              marginLeft: 5,
            }}
          >
            Visit ID
          </p>

          <Input
            onClick={() => setError('')}
            className="dashboardModalInputs"
            onChange={(e) => {
              if (e.target.value.length < 9 && (e.target.value === '' || e.target.value.match(new RegExp(/[0-9]$/g))))
                setVisitId(e.target.value)
            }}
            value={visitId}
            size="large"
            style={{
              borderRadius: 20,
              height: 50,
            }}
            placeholder="Enter Patient&apos;s Visit ID"
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
          // disabled={visitId.length < 1}
          loading={loading}
          style={{
            width: 220,
            marginTop: error ? '40px' : '20px',
          }}
          size="large"
          type="primary"
          shape="round"
        >
          Verify Visit ID
        </Button>
      </div>



    </Modal>
  );
};
export default VisitModal;
