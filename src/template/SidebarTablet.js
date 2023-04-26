/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './index.module.css';
import Logo from '../img/newLogo.png';
import dashboard from '../img/sidebarIcons/dashboard.png';
import dashboardActive from '../img/sidebarIcons/dashboardActive.png';
import fingerprint from '../img/sidebarIcons/fingerprint.png';
import fingerprintActive from '../img/sidebarIcons/fingerprintActive.png';
import patient from '../img/sidebarIcons/patient.png';
import patientActive from '../img/sidebarIcons/patientActive.png';
import claims from '../img/sidebarIcons/claim.png';
import claimsActive from '../img/sidebarIcons/claimsActive.png';
import payment from '../img/sidebarIcons/payment.png';
import paymentActive from '../img/sidebarIcons/paymentActive.png';
import reports from '../img/sidebarIcons/reports.png';
import reportsActive from '../img/sidebarIcons/reportsActive.png';
import support from '../img/sidebarIcons/support.png';
import supportActive from '../img/sidebarIcons/supportActive.png';
import { RiDashboardLine } from 'react-icons/ri';
import visitIcon from '../img/sidebarIcons/visit.png';
import visit from '../img/sidebarIcons/user-group.png';
import StickerComponent from './Sticker';

const pharmacyLinks = [
  {
    name: 'Claim',
    path: '/',
    icon: dashboard,
    reactIcon: <RiDashboardLine size={24} />,
    activeIcon: dashboardActive,
  },
  {
    name: 'Support',
    path: '/support',
    icon: support,
    reactIcon: <RiDashboardLine size={24} />,
    activeIcon: supportActive,
  },
];

const links = [
  {
    name: 'Dashboard',
    path: '/',
    icon: dashboard,
    activeIcon: dashboardActive,
  },
  {
    name: 'Visits',
    path: '/visits',
    icon: visitIcon,
    activeIcon: visitIcon,
  },
  {
    name: 'Prescription',
    path: '/prescription',
    icon: reports,
    activeIcon: reportsActive,
  },
  {
    name: 'Pre‑Auths',
    path: '/pre-auths',
    icon: fingerprint,
    activeIcon: fingerprintActive,
  },
  {
    name: 'Claims',
    path: '/claims',
    icon: claims,
    activeIcon: claimsActive,
  },
  {
    name: 'Support',
    path: '/support',
    icon: support,
    activeIcon: supportActive,
  },
];

const providerUser =
  localStorage.getItem('providerUser') && JSON.parse(localStorage.getItem('providerUser'));
let dynamicLink = providerUser?.type === 'Pharmacy' ? pharmacyLinks : links;
const SideBarTablet = () => {
  return (
    <div className={styles.sideBarOpenTablet}>
      <Link to={'/'}>
        <img src={Logo} className={styles.logo} />
      </Link>
      <div className={styles.linksOpen}>
        {dynamicLink.map((item) => (
          <NavLink
            key={item.name}
            className={({ isActive }) => (isActive ? styles.linkItemActive : styles.linkItem)}
            to={item.path}
          >
            {open ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                }}
              >
                <img className={styles.sidebarIcon} src={item.icon} alt="" />
                <img className={styles.sidebarIconActiveOpen} src={item.activeIcon} alt="" />
                <p className="mbZero" style={{ wordBreak: 'keep-all', whiteSpace: 'initial' }}>
                  {item.name}
                </p>
              </div>
            ) : (
              <>
                <img className={styles.sidebarIcon} src={item.icon} alt="" />
                <img className={styles.sidebarIconActive} src={item.activeIcon} alt="" />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBarTablet;
