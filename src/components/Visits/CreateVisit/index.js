import Main from '../../../template';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import VisitForm from './VisitForm';
import { getMemberByCardNumber } from '../../../store/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';

const Index = () => {
  const { memberNo } = useParams()
  const dispatch = useDispatch()
  const { member } = useSelector((state) => state.dashboard);
  useEffect(() => {
    if (memberNo)
      dispatch(getMemberByCardNumber(memberNo))
  }, [memberNo])

  return (
    <Main>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: -30 }}>
        <HiOutlineArrowLeft size={30} />
        <div>
          <h2 className="mbZero">New Visit</h2>
          <h5 className="mbZero">Fill in the below form to initiate new visit for patient</h5>
        </div>
      </Link>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginLeft: '50px',
          marginTop: 20,
        }}
      >
        <VisitForm member={member.data} />
      </div>
    </Main>
  );
};

export default Index;
