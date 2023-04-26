import { useEffect } from 'react';
import { Tabs } from 'antd';
import ProfileDetails from './ProviderProfile';
import CurrentUserProfile from './CurrentUserProfile';
import Main from '../../template';
import useDocumentTitle from '../Common/UseDocumentTitle';
import { titleUrl } from '../../utils';
import { getUserProfile } from '../../store/profileSlice';
import { useDispatch } from 'react-redux';
import UsersList from './UsersList';
const { TabPane } = Tabs;

const Index = () => {
  const dispatch = useDispatch();
  const state = JSON.parse(localStorage.getItem('providerUser'));
  useDocumentTitle(`Profile - ${titleUrl}`);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <Main>
      <Tabs tabPosition="left" style={{ marginTop: 40 }} centered defaultActiveKey="1">
        <TabPane tab="Provider Profile" key="1">
          <ProfileDetails role={state?.role} />
        </TabPane>
        <TabPane tab="My Profile" key="2">
          <CurrentUserProfile state={state} />
        </TabPane>
        {state?.role !== 'Operator' && (
          <TabPane tab="User Access & Management" key="3">
            <UsersList localStorageData={state} />
          </TabPane>
        )}
      </Tabs>
    </Main>
  );
};

export default Index;
