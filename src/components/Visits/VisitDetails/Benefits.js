import styles from './index.module.css';
import { Button, Collapse, Input } from 'antd';
import { SearchOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ExclusionModal from './ExclusionModal';
import { useState } from 'react';

const { Panel } = Collapse;

const Benefits = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exclusionItem, setExclusionItem] = useState({});
  const [searchResult, setSearchResult] = useState([]);

  const searchSublimit = (e) => {
    if (e.target.value === '' || e.target.value.length < 2) {
      setSearchResult([]);
    } else {
      const searchValue = e.target.value;
      const searchResult = data?.benefit_category?.reduce((acc, benefitItem) => {
        const matchingSubitems = benefitItem?.sublimit?.filter((subItem) => {
          const sublimitDescMatch = subItem?.description
            ?.toLowerCase()
            .includes(searchValue.toLowerCase());
          return sublimitDescMatch;
        });

        if (matchingSubitems.length > 0) {
          const existingBenefitItemIndex = acc.findIndex((item) => item.id === benefitItem.id);

          if (existingBenefitItemIndex > -1) {
            acc[existingBenefitItemIndex].sublimit.push(...matchingSubitems);
          } else {
            acc.push({
              ...benefitItem,
              sublimit: matchingSubitems,
            });
          }
        }
        return acc;
      }, []);
      setSearchResult(searchResult);
    }
  };

  let newData = searchResult?.length > 0 ? { benefit_category: searchResult } : data;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 className={styles.memberDetailHeader} style={{ marginTop: '0px' }}>
          Policy Benefits
        </h3>
        <Input
          onChange={searchSublimit}
          className={styles.tableSearchBox}
          placeholder="Search Benefits"
          prefix={<SearchOutlined style={{ fontSize: '24px', marginRight: '10px' }} />}
        />
      </div>

      <Collapse
        accordion
        bordered={false}
        style={{ marginTop: '15px' }}
        expandIcon={({ isActive }) =>
          isActive ? (
            <MinusOutlined className={styles.panelIcon} />
          ) : (
            <PlusOutlined className={styles.panelIcon} />
          )
        }
      >
        {newData?.benefit_category?.map((benefitIem, index) => (
          <Panel
            key={index}
            header={
              <p className={styles.panelHeader} id="panelHeader">
                {benefitIem?.category}
              </p>
            }
            style={{ backgroundColor: 'white', borderBottom: 'none' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 40,
                marginLeft: 15,
                marginBottom: 40,
                marginTop: 0,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ marginBottom: 10 }} className={styles.benefitsTableLabel}>
                  Overall Allocation
                </p>
                <p className={styles.benefitsTableText}>Rwf {benefitIem?.allocation.toLocaleString()}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ marginBottom: 10 }} className={styles.benefitsTableLabel}>
                  Balance Left
                </p>
                <p className={styles.benefitsTableText}>Rwf {benefitIem?.balance_left.toLocaleString()}</p>
              </div>

              {benefitIem?.exclusions?.length > 1 && (
                <Button
                  onClick={() => {
                    setExclusionItem(benefitIem);
                    setIsModalOpen(true);
                  }}
                  style={{ color: '#3ab44d', fontWeight: 600 }}
                  type="text"
                >
                  Show Exclusion
                </Button>
              )}
            </div>

            {benefitIem?.sublimit?.map((subItem, index) => (
              <div key={index} style={{ marginLeft: '12px', marginTop: '0px' }}>
                <p className={styles.benefitsText}>{subItem?.description}</p>
                <div style={{ marginTop: '30px' }}>
                  <div className={styles.divider} style={{ marginBottom: '-22px' }}></div>
                  <div style={{ display: 'flex', gap: '50px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p className={styles.benefitsTableLabel}>Allocation</p>
                      <p className={styles.benefitsTableText}>Rwf {Number(subItem?.allocation).toLocaleString()}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p className={styles.benefitsTableLabel}>Cover Type</p>
                      <p className={styles.benefitsTableText}>{subItem?.cover_types}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p className={styles.benefitsTableLabel}>Pre-auth required?</p>
                      <p className={styles.benefitsTableText}>
                        {subItem?.pre_auth_required ? 'Yes' : 'No'}
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p className={styles.benefitsTableLabel}>Co-pay %</p>
                      <p className={styles.benefitsTableText}>{subItem?.copay}%</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p className={styles.benefitsTableLabel}>Waiting Period</p>
                      <p className={styles.benefitsTableText}>
                        {' '}
                        {subItem?.waiting_period
                          ? subItem?.waiting_period
                          : 'Immediately Available'}{' '}
                      </p>
                    </div>
                  </div>
                </div>
                <Collapse bordered={false} style={{ marginTop: '10px' }} expandIconPosition="start">
                  <Panel
                    key="1"
                    header={
                      <p style={{ marginBottom: 0 }} className={styles.exclusionsCollapse}>
                        Exclusions
                      </p>
                    }
                    style={{ backgroundColor: 'white', borderBottom: 'none' }}
                  >
                    <div style={{ marginTop: -10, marginBottom: 20, marginLeft: 30 }}>
                      {subItem?.exclusions?.length > 0 ? (
                        <div>
                          {subItem?.exclusions?.map((exclusionItem, index) => (
                            <div key={index}>
                              <p className={styles.exclusionsData}>{exclusionItem}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className={styles.exclusionsData}>No exclusions</p>
                      )}
                    </div>
                  </Panel>
                </Collapse>
              </div>
            ))}
          </Panel>
        ))}
        <ExclusionModal
          exclusions={exclusionItem?.exclusions}
          title={exclusionItem?.category}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Collapse>
    </div>
  );
};

export default Benefits;
