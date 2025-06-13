import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import DemandForecast from './pages/DemandForecast';
import OrderRecommendation from './pages/OrderRecommendation';

/**
 * メインアプリケーションコンポーネント
 * ルーティングとレイアウトを管理します
 */
const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50 font-noto">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          <Topbar />
          
          <main className="flex-1 overflow-auto p-6">
            <Routes>
              {/* デフォルトルート */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* メインページ */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/forecast" element={<DemandForecast />} />
              <Route path="/order" element={<OrderRecommendation />} />
              
              {/* 未実装ページ用のプレースホルダー */}
              <Route path="/exception" element={<PlaceholderPage title="Exception Inbox" description="アラート処理画面（開発中）" />} />
              <Route path="/inventory" element={<PlaceholderPage title="Inventory Simulator" description="在庫最適化画面（開発中）" />} />
              <Route path="/supplier" element={<PlaceholderPage title="Supplier Negotiation" description="契約最適化画面（開発中）" />} />
              <Route path="/settings" element={<PlaceholderPage title="Settings" description="設定画面（開発中）" />} />
              
              {/* 404ページ */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

/**
 * プレースホルダーページコンポーネント
 * 未実装ページ用の仮画面を表示します
 */
interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">
            この画面は現在開発中です。<br />
            近日中に実装予定です。
          </p>
        </div>
      </div>
    </div>
  );
};

export default App; 