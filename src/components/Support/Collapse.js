import { Collapse, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { data } from './provider';
import { useState } from 'react';
const { Panel } = Collapse;

const CollapseComponent = () => {
  const [providerFaq, setProviderFaq] = useState(data);

  const navigate = useNavigate();

  const handleOpenInPreAuth = () => {
    navigate('inpatients/request');
  };
  const handleOpenOutPreAuth = () => {
    navigate('/pre-auths/request');
  };
  const handleNewClaim = () => {
    navigate('/claims/request');
  };

  const renderItem = (item) => {
    if (item.type === '<a>') {
      return (
        <li style={{ display: 'flex', gap: 3 }}>
          {item.answer}
          <a href="/ServiceProviderUserManual.pdf" target="_blank">
            User Manual
          </a>
        </li>
      );
    }
    if (item.type === 'Link') {
      return <Link to={item.url}>{item.answer}</Link>;
    }
    if (item.type === 'button') {
      if (item?.answer?.includes('submit New Claim')) {
        return (
          <Button type="text" className={styles.button} shape="round" onClick={handleNewClaim}>
            Click here to submit New Claim
          </Button>
        );
      }
      if (item?.answer?.includes('submit Outpatient Pre-Auth')) {
        return (
          <Button
            type="text"
            className={styles.button}
            shape="round"
            onClick={handleOpenOutPreAuth}
          >
            Click here to submit New Claim
          </Button>
        );
      }
      if (item?.answer?.includes('submit Inpatient Pre-Auth')) {
        return (
          <Button type="text" className={styles.button} shape="round" onClick={handleOpenInPreAuth}>
            Click here to submit New Claim
          </Button>
        );
      }
    }
    return <li>{item.answer}</li>;
  };

  return (
    <Collapse
      expandIcon={({ isActive }) =>
        !isActive ? (
          <PlusOutlined style={{ fontSize: 20, color: '#5ac068' }} />
        ) : (
          <MinusOutlined style={{ fontSize: 20, color: '#5ac068' }} />
        )
      }
      accordion
      ghost
      style={{ overflowY: 'scroll' }}
    >
      {providerFaq.length > 1 &&
        providerFaq.map((listItem) => (
          <Panel key={listItem.id} header={listItem.sectionTitle}>
            <Collapse
              ghost
              accordion
              expandIcon={({ isActive }) =>
                !isActive ? (
                  <PlusOutlined style={{ fontSize: 20, color: '#5ac068' }} />
                ) : (
                  <MinusOutlined style={{ fontSize: 20, color: '#5ac068' }} />
                )
              }
              style={{ borderLeft: '1px solid #5ac068' }}
            >
              {listItem.questions.map((item) => (
                <Panel header={item.question} key={item.question}>
                  <ul>
                    {item.answers.map((item) => (
                      <p key={item.answer} style={{ marginLeft: '0px', color: 'gray' }}>
                        {renderItem(item)}
                      </p>
                    ))}
                  </ul>
                </Panel>
              ))}
            </Collapse>
          </Panel>
        ))}
    </Collapse>
  );
};

export default CollapseComponent;
