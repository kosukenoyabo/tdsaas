import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DemandForecast from './pages/DemandForecast';
import OrderRecommendation from './pages/OrderRecommendation';
import ProcurementProposal from './pages/ProcurementProposal';
import PlaceholderPage from './pages/PlaceholderPage';

/**
 * メインアプリケーションコンポーネント
 */
const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/demand-forecast" element={<DemandForecast />} />
          <Route path="/order-recommendation" element={<OrderRecommendation />} />
          <Route path="/procurement-proposal" element={<ProcurementProposal />} />
          <Route path="/inventory" element={<PlaceholderPage title="在庫最適化" />} />
          <Route path="/analytics" element={<PlaceholderPage title="契約最適化" />} />
          <Route path="/settings" element={<PlaceholderPage title="設定" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App; 