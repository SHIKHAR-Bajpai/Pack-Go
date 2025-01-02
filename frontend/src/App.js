import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51QC62aRqJiPOJXJTsWtxXrIY3MVg2ZNAurvlhziuHH15EIjs9xBioEwbcUMoZyr1Xw9rEJ3DSt0GwXomvfANgAid00ivaNLlNI');

function App() {
  return (
    <Elements stripe={stripePromise}>
    <Layout />
  </Elements>
  );
}

export default App;

