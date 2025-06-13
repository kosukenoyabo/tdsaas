import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import KpiCard from '../components/KpiCard';
import { kpiData, forecastChartData, heatmapData, KpiData, HeatmapData } from '../mock';

/**
 * ダッシュボードページコンポーネント
 * KPIタイル、予測vs実績チャート、SKU×店舗ヒートマップを表示します
 */
const Dashboard: React.FC = () => {
  const stores = ['新宿店', '渋谷店', '池袋店', '品川店', '上野店'];

  const getRiskColor = (risk: number): string => {
    if (risk >= 0.3) return 'bg-red-300';
    if (risk >= 0.2) return 'bg-red-200';
    if (risk >= 0.1) return 'bg-red-100';
    return 'bg-red-50';
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800 font-noto mb-2">Dashboard</h1>
        <p className="text-neutral-800 font-noto">リアルタイム需要予測と在庫最適化の概要</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {kpiData.map((kpi: KpiData, index: number) => (
          <KpiCard
            key={index}
            data={kpi}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Predicted vs Actual Chart */}
        <div className="bg-white p-6 rounded-lg shadow-elevation-2 border border-neutral-100">
          <h3 className="text-lg font-medium text-neutral-800 font-noto mb-4">予測 vs 実績（直近30日）</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={forecastChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis 
                dataKey="date" 
                stroke="#424242"
                fontSize={12}
                fontFamily="Noto Sans JP"
              />
              <YAxis 
                stroke="#424242"
                fontSize={12}
                fontFamily="Noto Sans JP"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  fontFamily: 'Noto Sans JP'
                }}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stackId="1"
                stroke="#2F80ED"
                fill="#2F80ED"
                fillOpacity={0.3}
                name="予測"
              />
              <Area
                type="monotone"
                dataKey="actual"
                stackId="2"
                stroke="#27AE60"
                fill="#27AE60"
                fillOpacity={0.3}
                name="実績"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow-elevation-2 border border-neutral-100">
          <h3 className="text-lg font-medium text-neutral-800 font-noto mb-4">売上トレンド</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis 
                dataKey="date" 
                stroke="#424242"
                fontSize={12}
                fontFamily="Noto Sans JP"
              />
              <YAxis 
                stroke="#424242"
                fontSize={12}
                fontFamily="Noto Sans JP"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  fontFamily: 'Noto Sans JP'
                }}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#2F80ED"
                strokeWidth={3}
                dot={{ fill: '#2F80ED', strokeWidth: 2, r: 4 }}
                name="売上"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-white p-6 rounded-lg shadow-elevation-2 border border-neutral-100">
        <h3 className="text-lg font-medium text-neutral-800 font-noto mb-4">SKU×店舗 欠品リスクヒートマップ</h3>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Header */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="p-3 bg-neutral-100 rounded font-medium text-sm text-neutral-800 font-noto">
                商品
              </div>
              {stores.map((store) => (
                <div key={store} className="p-3 bg-neutral-100 rounded font-medium text-sm text-neutral-800 font-noto text-center">
                  {store}
                </div>
              ))}
            </div>
            
            {/* Data Rows */}
            {heatmapData.map((item: HeatmapData) => (
              <div key={item.sku} className="grid grid-cols-6 gap-2 mb-2">
                <div className="p-3 bg-neutral-50 rounded font-medium text-sm text-neutral-800 font-noto">
                  {item.sku}
                </div>
                {stores.map((store) => (
                  <div
                    key={`${item.sku}-${store}`}
                    className={`p-3 rounded text-center text-sm font-medium text-neutral-800 font-noto ${getRiskColor(item.stores[store] || 0)}`}
                  >
                    {Math.round((item.stores[store] || 0) * 100)}%
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-end mt-4 space-x-4">
          <span className="text-sm text-neutral-800 font-noto">欠品リスク:</span>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-50 rounded"></div>
            <span className="text-xs text-neutral-800 font-noto">低</span>
            <div className="w-4 h-4 bg-red-100 rounded"></div>
            <div className="w-4 h-4 bg-red-200 rounded"></div>
            <div className="w-4 h-4 bg-red-300 rounded"></div>
            <span className="text-xs text-neutral-800 font-noto">高</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 