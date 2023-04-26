import React from 'react';
import styles from './index.module.css';
const index = () => (
  <div className={styles.container}>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <a href="/">
      <h3 style={{ color: '#f87d4e' }}>Go to Dashboard</h3>
    </a>
  </div>
);

export default index;
