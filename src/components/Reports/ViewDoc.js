import React from 'react';
import { HiOutlineDocumentText } from 'react-icons/hi';

const ViewDoc = () => {
  return (
    <div
      id="documentCell"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        cursor: 'pointer',
      }}
    >
      <HiOutlineDocumentText size={20} color="#f87d4e" />
      <a
        href="https://www.africau.edu/images/default/sample.pdf"
        target="_blank"
        rel="noreferrer"
        style={{ color: 'gray', fontSize: 12 }}
      >
        View
      </a>
    </div>
  );
};

export default ViewDoc;
