import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoaderComponenet from '../components/Common/Loader';

import { PrivateRoute } from './PrivateRoute';

const Dashboard = lazy(() => import('../components/Dashboard'));
const Prescription = lazy(() => import('../components/Prescription'));
const NewPrescription = lazy(() => import('../components/Prescription/NewPrescription'));
const PreAuths = lazy(() => import('../components/PreAuths'));
const PreAuthDetails = lazy(() => import('../components/PreAuths/PreAuthDetails'));
const CreatePreAuth = lazy(() => import('../components/PreAuths/CreatePreAuth'));

const Claims = lazy(() => import('../components/Claims'));
const ClaimDetail = lazy(() => import('../components/Claims/ClaimDetail'));
const CreateNewClaim = lazy(() => import('../components/Claims/CreateClaim'));
const Reports = lazy(() => import('../components/Reports'));
const Support = lazy(() => import('../components/Support'));
const Payments = lazy(() => import('../components/Payments'));
const PaymentDetails = lazy(() => import('../components/PaymentDetails'));
const Login = lazy(() => import('../components/Login'));
const RestPassword = lazy(() => import('../components/ResetPassword'));
const NotFound = lazy(() => import('../components/404'));
const Profile = lazy(() => import('../components/Profile'));
const PrescriptionDetail = lazy(() => import('../components/Prescription/PrescriptionDetail'));
const Welcome = lazy(() => import('../components/Welcome'));
const RestPasswordReq = lazy(() => import('../components/ResetPasswordReq'));
const Visits = lazy(() => import('../components/Visits'));
const CreateVisit = lazy(() => import('../components/Visits/CreateVisit'));
const VisitDetails = lazy(() => import('../components/Visits/VisitDetails'));

// const Pharmacy = lazy(() => import('../components/Pharmacy'));
const PharmacyDashboard = lazy(() => import('../components/Pharmacy/Dashboard'));
const PharmacyFillPrescription = lazy(() => import('../components/Pharmacy/FillPrescription'));
const PharmacyClaims = lazy(() => import('../components/Pharmacy/Claims'));
const PharmacyClaimDetails = lazy(() => import('../components/Pharmacy/Claims/ClaimDetails'));
const PharmacyFileClaim = lazy(() => import('../components/Pharmacy/FileClaim'));
// const InitiatePharmacyClaim = lazy(() => import('../components/Pharmacy/InitiateClaim'));
// const ManualClaim = lazy(() => import('../components/Pharmacy/ManualClaim'));

const RouteSetup = () => {
  let providerUser = JSON.parse(localStorage.getItem('providerUser'));

  const pharmacy = (
    <>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PharmacyDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/prescriptions"
        element={
          <PrivateRoute>
            <Navigate to={'/'} />
          </PrivateRoute>
        }
      />
      <Route
        path="/prescriptions/:prescription_id"
        element={
          <PrivateRoute>
            <PharmacyFillPrescription />
          </PrivateRoute>
        }
      />
      <Route
        path="/file-claim"
        element={
          <PrivateRoute>
            <PharmacyFileClaim />
          </PrivateRoute>
        }
      />
      <Route
        path="/claims"
        element={
          <PrivateRoute>
            <PharmacyClaims />
          </PrivateRoute>
        }
      />
      <Route
        path="/claims/:claim_id"
        element={
          <PrivateRoute>
            <PharmacyClaimDetails />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/pharmacy/add"
        element={
          <PrivateRoute>
            <InitiatePharmacyClaim />
          </PrivateRoute>
        }
      />
      <Route
        path="/pharmacy/manual-claim"
        element={
          <PrivateRoute>
            <ManualClaim />
          </PrivateRoute>
        }
      /> */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/support"
        element={
          <PrivateRoute>
            <Support />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <PrivateRoute>
            <NotFound />
          </PrivateRoute>
        }
      />
    </>
  );

  const hospitals = (
    <>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/prescription"
        element={
          <PrivateRoute>
            <Prescription />
          </PrivateRoute>
        }
      />
      <Route
        path="/prescription/:prescriptionNumber"
        element={
          <PrivateRoute>
            <PrescriptionDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/prescriptions/add"
        element={
          <PrivateRoute>
            <NewPrescription />
          </PrivateRoute>
        }
      />
      <Route
        path="/pre-auths"
        element={
          <PrivateRoute>
            <PreAuths />
          </PrivateRoute>
        }
      />
      <Route
        path="/pre-auths/:preauth_id"
        element={
          <PrivateRoute>
            <PreAuthDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/pre-auths/request"
        element={
          <PrivateRoute>
            <CreatePreAuth />
          </PrivateRoute>
        }
      />
      <Route
        path="/claims"
        element={
          <PrivateRoute>
            <Claims />
          </PrivateRoute>
        }
      />
      <Route
        path="/claims/request"
        element={
          <PrivateRoute>
            <CreateNewClaim />
          </PrivateRoute>
        }
      />
      <Route
        path="/claims/:claim_id"
        element={
          <PrivateRoute>
            <ClaimDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />
      <Route
        path="/payments"
        element={
          <PrivateRoute>
            <Payments />
          </PrivateRoute>
        }
      />
      <Route
        path="/payments/:detail"
        element={
          <PrivateRoute>
            <PaymentDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/visits/"
        element={
          <PrivateRoute>
            <Visits />
          </PrivateRoute>
        }
      />
      <Route
        path="/visits/:visitID"
        element={
          <PrivateRoute>
            <VisitDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/visits/request/:memberNo"
        element={
          <PrivateRoute>
            <CreateVisit />
          </PrivateRoute>
        }
      />
      <Route
        path="/support"
        element={
          <PrivateRoute>
            <Support />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<RestPassword />} />
      <Route
        path="*"
        element={
          <PrivateRoute>
            <NotFound />
          </PrivateRoute>
        }
      />
    </>
  );
  return (
    <Suspense fallback={<LoaderComponenet />}>
      <Routes>
        {providerUser && providerUser?.type === 'Pharmacy' ? pharmacy : hospitals}
        <Route path="/login" element={<Login />} />
        <Route path="/support" element={<Support />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/reset-password/:token" element={<RestPassword />} />
        <Route path="/reset-password-request" element={<RestPasswordReq />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouteSetup;
