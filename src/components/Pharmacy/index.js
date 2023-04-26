import { useEffect, useState } from 'react';
import Main from '../../template';
import AntTable from './AntTable';
import ManualClaimTable from './ManualClaimTable';
import AddBox from '../../components/Common/AddBoxNew';
import { useDispatch, useSelector } from 'react-redux';
import UsePagination from '../Common/UsePagination';
import TopNav from '../../components/Common/TopTabs';
import { getPharmacyClaimList, getPharmacyManualClaimList } from '../../store/pharmacySlice';

const Index = () => {
  const { data } = useSelector((state) => state.pharmacy);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [tab, setTab] = useState({ title: 'Claim', key: 'Claim' });

  useEffect(() => {
    if (tab.title === 'Claim') {
      dispatch(getPharmacyClaimList({ page }));
    }
    if (tab.title === 'Manual Claim') {
      dispatch(getPharmacyManualClaimList({ page }));
    }
  }, [page, tab.title]);

  const options = [
    { title: 'Claim', key: 'Claim' },
    { title: 'Manual Claim', key: 'Manual Claim' },
  ];

  return (
    <Main>
      <div style={{ marginTop: 50 }}>
        {tab.title === 'Claim' && <AddBox width={100} value="Initiate claim" to="/pharmacy/add" />}
        {tab.title === 'Manual Claim' && (
          <AddBox width={100} value="Manual claim" to="/pharmacy/manual-claim" />
        )}
        <TopNav tab={tab} setTab={setTab} options={options} width={170} />
        <div>
          {tab.title === 'Claim' && (
            <AntTable className="prescription" page={page} setPage={setPage} data={data?.content} />
          )}
          {tab.title === 'Manual Claim' && (
            <ManualClaimTable
              className="prescription"
              page={page}
              setPage={setPage}
              data={data?.content}
            />
          )}
        </div>
        <UsePagination page={page} setPage={setPage} data={data} />
      </div>
    </Main>
  );
};

export default Index;
