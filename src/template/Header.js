import { Dropdown, Layout, Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import userPic from '../img/user.png';

const HeaderComponenet = ({ setToggleDrawer, pageName }) => {
  const { Header: AntHeader } = Layout;
  const navigate = useNavigate();
  const handleMenuClick = async (e) => {
    if (e.key === '1') {
      navigate('/profile');
    }
    if (e.key === '2') {
      localStorage.removeItem('x-auth-token');
      localStorage.clear('providerUser');
      navigate('/login');
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'Profile',
          key: '1',
          icon: <UserOutlined />,
        },
        {
          label: 'Logout',
          key: '2',
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  const providerUser =
    localStorage.getItem('providerUser') && JSON.parse(localStorage.getItem('providerUser'));

  return (
    <div style={{ backgroundColor: 'inherit', marginBottom: 35, marginTop: 20 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 15,
        }}
      >
        <div>
          <MenuOutlined
            className={styles.menuIcon}
            onClick={setToggleDrawer}
            style={{ fontSize: 19, color: '#3ab44d', marginLeft: -40 }}
          />
          <h4
            className={styles.pageName}
            style={{ marginBottom: 0, fontWeight: 600, fontSize: 18 }}
          >
            {pageName}
          </h4>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 15,
          }}
        >
          <Dropdown overlay={menu}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              <img src={userPic} style={{ width: 30 }} alt="" />
            </div>
          </Dropdown>
          <p style={{ marginBottom: 0 }}>{providerUser?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponenet;
