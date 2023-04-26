import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../../../template';
import MemberSearch from './MemberSearch';
import PreAuthForm from './PreAuthForm';
import { resetMember } from '../../../store/preAuthSlice';
import UseBackNavigation from '../../Common/UseBackNavigation';
import avatar from '../../../img/avatar.png';

const RequestPreAuth = () => {
  const dispatch = useDispatch();

  const { member } = useSelector((state) => state.preAuth);
  const [cardNumber, setCardNumber] = useState();

  useEffect(() => {
    dispatch(resetMember());
  }, []);

  return (
    <Main>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: -30 }}>
        <UseBackNavigation url={'/inpatients'} />
        <div>
          <h2 className="mbZero">New Inpatient Pre-Auth</h2>
          <h5 className="mbZero">Fill in the below form to initiate the Pre-auth for inpatient</h5>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          marginTop: 35,
          marginLeft: 50,
        }}
      >
        <MemberSearch member={member} setCardNumber={setCardNumber} cardNumber={cardNumber} />
        {member.isSearchLoaded && member.error ? (
          <p style={{ color: 'red', marginLeft: 10, marginBottom: 0, marginTop: 15 }}>
            {member.error}
          </p>
        ) : (
          member.data && (
            <div className="requestScreen">
              <div style={{ display: 'flex', gap: 15, padding: 20 }}>
                <img
                  style={{ width: 50, height: 50, borderRadius: '50%' }}
                  src={
                    member.data?.files?.profile_pic ? member.data.files.profile_pic?.url : avatar
                  }
                  alt=""
                />

                <div>
                  <h5 style={{ fontWeight: 700 }} className="mbZero">
                    {member.data.name}
                  </h5>
                  <p style={{ color: '#f87d4e', fontSize: 10 }}>{member.data.card_number}</p>
                </div>
              </div>
              <PreAuthForm member={member} cardNumber={cardNumber} />
            </div>
          )
        )}
      </div>
    </Main>
  );
};

export default RequestPreAuth;
