import Header from './Header';
// import SideBar from './SideBar.js';
import SideBar from './SideBar';
import styles from './index.module.css';
import { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import SideBarTablet from './SidebarTablet';

function Main({ children, pageName }) {
  const [isDrawerOpen, setToggleDrawer] = useState(false);

  return (
    <div className={styles.pageContainer}>
      <SideBar />
      <Drawer open={isDrawerOpen} onClose={() => setToggleDrawer(false)} direction="left">
        <SideBarTablet />
      </Drawer>

      <div className={styles.contentContainer}>
        <Header pageName={pageName} setToggleDrawer={setToggleDrawer} />
        {children}
      </div>
    </div>
  );
}

export default Main;
