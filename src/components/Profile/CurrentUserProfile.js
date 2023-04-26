import { Button } from 'antd';
import React, { useState } from 'react';
import styles from './index.module.css';
import ChangePassword from './ChangePassword';

const AdminProfile = ({ state }) => {
  const [isEdit, setEdit] = useState(false);

  return (
    <div
      style={{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      {isEdit ? (
        <ChangePassword state={state} setEdit={setEdit} />
      ) : (
        state && (
          <>
            <div>
              <h1 style={{ marginBottom: 5 }}>{state.name}</h1>
              <div className={styles.tagStyle}>{state?.role?.replace('_', ' ')}</div>
              <p style={{ marginTop: 10 }}>
                Update your account settings from this page. Changes to <br /> this page will be
                immediately applied
              </p>
            </div>

            <div>
              <p style={{ fontWeight: '700' }} className="mbZero">
                Profile Information
              </p>
              <hr className={styles.customHr} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontWeight: '600' }}>Name:</span>
                <span>{state.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontWeight: '600' }}>Email:</span>
                <span>{state?.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontWeight: '600' }}>Role:</span>
                <span>{state?.role?.replace('_', ' ')}</span>
              </div>
            </div>

            <div>
              <p style={{ fontWeight: '700' }} className="mbZero">
                Account Security
              </p>
              <hr className={styles.customHr} />
              <Button onClick={() => setEdit(true)} style={{ marginTop: 10 }} type="dashed">
                Change Account password
              </Button>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default AdminProfile;
