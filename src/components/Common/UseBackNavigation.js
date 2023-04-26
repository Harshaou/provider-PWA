import React from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const UseBackNavigation = ({ url }) => {
  const navigate = useNavigate();
  return (
    <HiOutlineArrowLeft style={{ cursor: 'pointer' }} onClick={() => navigate(url)} size={30} />
  );
};

export default UseBackNavigation;
