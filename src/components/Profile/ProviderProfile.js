import { notification, Dropdown, Menu, Divider } from 'antd';
import styles from './index.module.css';
import { DeleteOutlined, UploadOutlined, LoadingOutlined, EditOutlined } from '@ant-design/icons';
import LoaderComponenet from '../Common/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { changeLogo, removeLogo } from '../../store/profileSlice';
import defaultUploadIcon from '../../img/default-upload-icon.png';

const ProfileDetails = ({ role }) => {
  let { data, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handlePicture = async (e) => {
    let formData = new FormData();
    formData.append('logo', e.target.files[0]);
    dispatch(changeLogo({ formData, openNotificationWithIcon }));
    e.target.value = '';
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  const handleRemoveLogo = () => {
    dispatch(removeLogo({ openNotificationWithIcon }));
  };

  const menu = (
    <Menu>
      {data?.documents?.logo?.url && (
        <>
          <Menu.Item>
            <div
              onClick={() => handleRemoveLogo()}
              style={{ display: 'flex', gap: 5, alignItems: 'center' }}
            >
              <DeleteOutlined style={{ color: 'red' }} />
              <span style={{ fontWeight: 600, fontSize: 12, color: 'red' }}> Delete Logo</span>
            </div>
          </Menu.Item>
          <Divider />
        </>
      )}
      <Menu.Item>
        <label>
          <input
            onChange={(e) => handlePicture(e)}
            style={{ display: 'none' }}
            type="file"
            id="img"
            name="img"
            accept="image/*"
          />
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <UploadOutlined style={{ color: 'green' }} />
            <span style={{ fontWeight: 600, fontSize: 12, color: 'green' }}>
              {data?.documents?.logo?.url ? 'Change Logo' : 'Upload Logo'}
            </span>
          </div>
        </label>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div
        style={{
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          gap: 25,
        }}
      >
        {data ? (
          <>
            <div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  width: '55%',
                }}
              >
                <h1 className="mbZero">{data.name}, Rwanda</h1>
                <div className={styles.tagStyle}>{data.type}</div>
                <p>
                  Update your Provider profile and settings from this page. <br /> Changes to the
                  page will be immediately applied.
                </p>
              </div>

              <div className={styles.logoDiv}>
                <img
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: data?.documents?.logo?.url ? '50%' : '35%',
                  }}
                  src={data.documents?.logo?.url ? data?.documents?.logo?.url : defaultUploadIcon}
                  alt=""
                />
                {role !== 'Operator' && (
                  <Dropdown trigger="click" className={styles.cameraIcon} overlay={menu}>
                    {loading ? (
                      <LoadingOutlined style={{ color: 'white' }} />
                    ) : (
                      <EditOutlined style={{ color: 'white' }} />
                    )}
                  </Dropdown>
                )}
              </div>
              <p className="mbZero" style={{ fontSize: 12, color: 'gray' }}>
                {` Note: Your organization's picture (logo) should not be
                  irrelevant, abusive or vulgar.`}
              </p>
            </div>

            <div>
              <p style={{ fontWeight: '700' }} className="mbZero">
                Address
              </p>
              <hr className={styles.customHr} />
              <div className={styles.infoItem}>
                <span style={{ fontWeight: '600' }}>Country:</span>
                <span>{data.address?.country}</span>
              </div>
              <div className={styles.infoItem}>
                <span style={{ fontWeight: '600' }}>State:</span>
                <span>{data.address?.state}</span>
              </div>
              <div className={styles.infoItem}>
                <span style={{ fontWeight: '600' }}>City:</span>
                <span>{data.address?.city}</span>
              </div>
              <div className={styles.infoItem}>
                <span style={{ fontWeight: '600' }}>Zip Code:</span>
                <span>{data.address?.zip}</span>
              </div>
              <div className={styles.infoItem}>
                <span style={{ fontWeight: '600' }}>Street:</span>
                <span>{data.address?.street}</span>
              </div>
            </div>

            <div style={{ marginBottom: 50 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <p style={{ fontWeight: '700' }} className="mbZero">
                  Primary Contact
                </p>
              </div>
              <hr className={styles.customHr} />
              <>
                <div className={styles.infoItem}>
                  <span style={{ fontWeight: '600' }}>Name:</span>
                  <span>{data.contact_information?.name}</span>
                </div>
                <div className={styles.infoItem}>
                  <span style={{ fontWeight: '600' }}>Email:</span>
                  <span>{data.contact_information?.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <span style={{ fontWeight: '600' }}>Contact Number:</span>
                  <span> {data.contact_information?.number}</span>
                </div>
              </>
            </div>
          </>
        ) : (
          <LoaderComponenet />
        )}
      </div>
    </>
  );
};

export default ProfileDetails;
