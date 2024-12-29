import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ProductGrid } from './components/products/ProductGrid';
import { CheckoutForm } from './components/checkout/CheckoutForm';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductGrid />} />
          <Route path="/checkout" element={<CheckoutForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;