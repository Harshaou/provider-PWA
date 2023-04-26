import { Alert, Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const InavalidToken = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'grid', placeItems: 'center', gap: 40 }}>
      <Alert
        message="This link is either broken or the token has expired. Please try resetting your password again"
        type="error"
      />
      <Button
        onClick={() => navigate('login')}
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
        Redirect to New Password Request
      </Button>
    </div>
  );
};

export default InavalidToken;
