import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, notification, Switch } from 'antd';
import styles from './index.module.css';
import userIcon from '../../img/default-user-icon.png';
import AddUserComponent from './AddUser';
import { ExclamationCircleOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import { changeUserStatus, deleteUserProfile, listAllUsers } from '../../store/profileSlice';

const UsersList = ({ localStorageData }) => {
  let { users } = useSelector((state) => state.profile);
  const [addUser, setAddUser] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listAllUsers());
  }, [dispatch]);

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  const statusChangeConfirmation = (item) => {
    Modal.confirm({
      title: 'Activation Confirmation?',
      icon: <ExclamationCircleOutlined />,
      cancelText: 'Cancel',
      content: `Are you sure you want to Activate ${item?.name}?`,
      okType: 'primary',
      okText: 'Activate',
      okButtonProps: {
        type: 'primary',
      },
      onOk: () => dispatch(changeUserStatus({ userId: item.user_id, openNotificationWithIcon })),
    });
  };

  const deleteConfirm = (item) => {
    Modal.confirm({
      title: 'Deletion Confirmation?',
      icon: <ExclamationCircleOutlined />,
      cancelText: 'Cancel',
      content: `Are you sure you want to delete ${item?.name} ? `,
      okType: 'danger',
      okText: 'Delete',
      okButtonProps: {
        type: 'primary',
      },
      onOk: () => dispatch(deleteUserProfile({ id: item.user_id, openNotificationWithIcon })),
    });
  };

  return addUser ? (
    <AddUserComponent setAddUser={setAddUser} />
  ) : (
    <div style={{ marginBottom: 50 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p style={{ fontWeight: '700' }} className="mbZero">
          Users
        </p>
      </div>
      <Button
        onClick={() => setAddUser(true)}
        icon={<UserAddOutlined />}
        style={{ float: 'right', marginTop: -24 }}
        shape="round"
        size="small"
      >
        Add User
      </Button>
      <hr className={styles.customHr} />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: 30,
          gap: 10,
        }}
      >
        {users?.map(
          (item, index) =>
            localStorageData?.user_id !== item.user_id && (
              <div key={index} className={styles.userBox}>
                <div className={styles.statusSwitch}>
                  <Switch
                    onChange={() => statusChangeConfirmation(item)}
                    disabled={item.status === 'Active' ? true : false}
                    checked={item.status === 'Active' ? true : false}
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                  />
                </div>
                <img src={userIcon} style={{ height: 50 }} alt="" />
                <p className="mbZero">{item.name}</p>
                <p
                  style={{
                    marginBottom: 0,
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  {item.role?.replace('_', ' ')}
                </p>
                <p className="mbZero">{item.email}</p>
                <p>{item.contact_number}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Button
                    onClick={() => deleteConfirm(item)}
                    icon={<DeleteOutlined />}
                    size="small"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default UsersList;
