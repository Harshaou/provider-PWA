import { Pagination } from 'antd';
import React from 'react';

const UsePagination = ({ data, setPage, page }) => {
  // const noPagination = page === 0 && data.content?.length < 5;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: 20,
      }}
    >
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Pagination
            style={{ padding: '20px', position: 'absolute', right: '10px', bottom: '0px' }}
            pageSize={6}
            current={page + 1}
            onChange={(e) => setPage(e - 1)}
            total={data?.property?.total_elements}
          />
        </div>
      </>
    </div>
  );
};

export default UsePagination;
