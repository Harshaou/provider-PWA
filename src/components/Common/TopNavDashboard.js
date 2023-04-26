import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const TopNav = ({ options, width, marginBottom, notification, setTab, tab }) => {
  return (
    <div
      className={styles.topNav}
      style={{
        width,
        marginBottom: marginBottom ? marginBottom : 30,
      }}
    >
      {options.map((item, index) =>
        item === tab ? (
          <div
            key={index}
            style={{
              position: 'relative',
              height: 50,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            {/* {notification && <div className={styles.notification}>23</div>} */}
            <div
              style={{ paddingBottom: 6, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
              className="activeTopNavLi"
              key={item}
            >
              {item}
            </div>
          </div>
        ) : (
          <div
            key={index}
            style={{
              position: 'relative',
              height: 50,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <div
              onClick={() => setTab(item)}
              style={{
                paddingBottom: 6,
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                opacity: '60%',
              }}
              // style={{ paddingBottom: 10, cursor: 'pointer' }}
              className="topNav"
              key={item}
            >
              {item}
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default TopNav;
