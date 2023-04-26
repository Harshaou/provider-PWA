import { configureStore } from '@reduxjs/toolkit';

import dashboard from './dashboardSlice';
import claims from './claimSlice';
import preAuth from './preAuthSlice';
import payment from './paymentSlice';
import reports from './reportSlice';
import profile from './profileSlice';
import prescription from './prescriptionSlice';
import pharmacy from './pharmacySlice';
import visit from './visitSlice';

export const store = configureStore({
  reducer: {
    profile,
    dashboard,
    visit,
    prescription,
    pharmacy,
    claims,
    preAuth,
    payment,
    reports,
  },
});
