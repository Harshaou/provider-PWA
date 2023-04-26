import React from 'react';
import styles from './index.module.css';

const TopNav = ({ options, width, marginBottom, setTab, tab }) => {
  return (
    <div
      className={styles.topNav}
      style={{
        width,
        marginBottom: marginBottom ? marginBottom : 30,
      }}
    >
      {options.map((item, index) =>
        item.key === tab.key ? (
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
              style={{ paddingBottom: 6, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
              className="activeTopNavLi"
              key={item.key}
            >
              {item.title}
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
              className="topNav"
              key={item.title}
            >
              {item.title}
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default TopNav;
