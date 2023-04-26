import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../Common/useDebounce';
import UsePagination from '../Common/UsePagination';
import Main from '../../template';
import TopNav from '../../components/Common/TopTabs';
import AntTable from './AntTable';
import AddBox from '../../components/Common/AddBoxNew';
import { getPreAuthsWithFilter, preAuthSearch } from '../../store/preAuthSlice';
import MainSearch from '../Common/MainSearch';

const options = [
  { title: 'Live Action', key: 'Received' },
  { title: 'Approved', key: 'Approved' },
  { title: 'Processing Pre-Auths', key: 'In_Progress' },
  { title: 'Declined', key: 'Declined' },
];

const Index = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [tab, setTab] = useState({ title: 'Live Action', key: 'Received' });
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data } = useSelector((state) => state.preAuth);

  useEffect(() => {
    dispatch(getPreAuthsWithFilter({ filter: tab.key, page, size: 6, type: 'Inpatient' }));
  }, [tab, page]);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      dispatch(preAuthSearch(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm]);

  const handleOnChange = (e) => {
    if (e.trim() === '') {
      dispatch(getPreAuthsWithFilter({ filter: tab.key, page, size: 6, type: 'Inpatient' }));
    } else {
      setSearchTerm(e.trim());
    }
  };

  return (
    <Main>
      <MainSearch handleOnChange={handleOnChange} />
      <AddBox value="New Inpatient Pre-Auth" to="/inpatients/request" />
      <TopNav tab={tab} setTab={setTab} options={options} width={450} />
      <AntTable data={data?.content} />
      <UsePagination page={page} setPage={setPage} data={data} />
    </Main>
  );
};

export default Index;
