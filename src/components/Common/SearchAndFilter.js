import { Input, Button, Select } from 'antd';
import { SearchOutlined, FunnelPlotOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;

const SearchAndFilter = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [selectDefault, setSelectDefault] = useState('');

  const { preAuthPrevSearch, claimsPrevSearch, inpatientPrevSearch } = useSelector((state) => {
    return {
      preAuthPrevSearch: state.preAuth.search,
      claimsPrevSearch: state.claims.search,
      inpatientPrevSearch: state.claims.inpatients.search,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    switch (props.page) {
      case 'preauth':
        setSearchBy('preauthID');
        preAuthPrevSearch !== '' ? setSearchQuery(preAuthPrevSearch) : null;
        break;
      case 'claims':
        setSearchBy('claimID');
        claimsPrevSearch !== '' ? setSearchQuery(claimsPrevSearch) : null;
        break;
      case 'inpatients':
        setSearchBy('preauthID');
        inpatientPrevSearch !== '' ? setSearchQuery(inpatientPrevSearch) : null;
        break;
      default:
        console.log('invalid page');
        break;
    }
  }, [props.page]);

  const submitSearch = () => {
    if (searchQuery !== '') {
      props.setTab('');
      switch (props.page) {
        default:
          console.log('invalid search');
          break;
      }
    }
  };

  const onSearchChange = (e) => {
    if (e.target.value === '') {
      setSearchQuery('');
      switch (props.page) {
        case 'preauth':
          break;
        case 'inpatients':
          // dispatch(clearInpatientsSearch())
          break;
        case 'claims':
          break;
        default:
          console.log('invalid search');
          break;
      }
      props.onClear();
    } else {
      setSearchQuery(e.target.value);
    }
  };

  const renderOptions = () => {
    switch (props.page) {
      case 'preauth':
        return [
          { label: 'Pre-Auth ID', value: 'preauthID' },
          { label: 'Member No.', value: 'memberNO' },
        ];
      case 'inpatients':
      case 'claims':
        return [
          { label: 'Claim ID', value: 'claimID' },
          { label: 'Member No.', value: 'memberNO' },
        ];
    }
  };

  const searchFilter = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className={styles.searchContainer}>
      <Input
        size="large"
        className={styles.searchInput}
        value={searchQuery}
        onChange={onSearchChange}
        onPressEnter={submitSearch}
        placeholder={'Search'}
        allowClear
      />
      {searchStatus}
      <Button onClick={submitSearch} size="large" type="primary" shape="round">
        <SearchOutlined className={styles.searchIcon} />
      </Button>
    </div>
  );
};

export default SearchAndFilter;
