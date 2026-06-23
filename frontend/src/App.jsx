import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import FundList from './components/FundList';
import AllocationForm from './components/AllocationForm';
import TransferForm from './components/TransferForm';
export default function App() {
  return (<BrowserRouter><Routes>
    <Route path="/" element={<Navigate to="/funds/dashboard" />} />
    <Route path="/funds/dashboard" element={<Dashboard />} />
    <Route path="/funds/list" element={<FundList />} />
    <Route path="/funds/allocations/new" element={<AllocationForm />} />
    <Route path="/funds/transfers/new" element={<TransferForm />} />
  </Routes></BrowserRouter>);
}
