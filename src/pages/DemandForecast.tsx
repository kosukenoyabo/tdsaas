import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { scenarios, ScenarioData } from '../mock';

interface ForecastRow {
  sku: string;
  skuName: string;
  forecast: number[];
  stdDev: number[];
  weatherLift: number[];
}

/**
 * 需要予測ページコンポーネント
 * シナリオ比較、14日先予測バーチャート、編集可能グリッドを表示します
 */
const DemandForecast: React.FC = () => {
  const navigate = useNavigate();
  const [activeScenario, setActiveScenario] = useState<string>('baseline');
  const [forecastData, setForecastData] = useState<ForecastRow[]>([
    {
      sku: 'VEG-001',
      skuName: 'トマト（中玉）',
      forecast: [45, 52, 48, 55, 62, 58, 51, 49, 53, 57, 54, 50, 46, 48],
      stdDev: [5, 6, 5, 6, 7, 6, 5, 5, 6, 6, 6, 5, 5, 5],
      weatherLift: [0, 5, 3, 8, 12, 10, 6, 4, 7, 9, 8, 5, 2, 3]
    },
    {
      sku: 'VEG-002',
      skuName: 'きゅうり',
      forecast: [32, 35, 38, 42, 45, 41, 37, 34, 36, 39, 41, 38, 35, 33],
      stdDev: [3, 4, 4, 5, 5, 4, 4, 3, 4, 4, 4, 4, 3, 3],
      weatherLift: [0, 2, 4, 6, 8, 7, 5, 3, 4, 6, 7, 5, 3, 2]
    },
    {
      sku: 'VEG-003',
      skuName: 'レタス',
      forecast: [28, 31, 29, 33, 36, 34, 30, 28, 31, 33, 32, 29, 27, 28],
      stdDev: [3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      weatherLift: [0, 3, 2, 5, 7, 6, 4, 2, 3, 5, 5, 3, 1, 2]
    }
  ]);

  const handleScenarioChange = (scenarioId: string): void => {
    setActiveScenario(scenarioId);
    // TODO: シナリオ変更時の予測データ更新
  };

  const handleCellEdit = (rowIndex: number, colIndex: number, value: number): void => {
    const newData = [...forecastData];
    newData[rowIndex].forecast[colIndex] = value;
    setForecastData(newData);
  };

  // Chart data for 14-day forecast
  const chartData = Array.from({ length: 14 }, (_, i) => ({
    day: `${i + 1}日後`,
    baseline: forecastData.reduce((sum, item) => sum + item.forecast[i], 0),
    promo: forecastData.reduce((sum, item) => sum + item.forecast[i] * 1.2, 0),
    weather: forecastData.reduce((sum, item) => sum + item.forecast[i] + item.weatherLift[i], 0)
  }));

  const ScenarioChips: React.FC = () => (
    <div className="flex space-x-2 mb-6">
      {scenarios.map((scenario: ScenarioData) => (
        <button
          key={scenario.id}
          onClick={() => handleScenarioChange(scenario.id)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 font-noto
            ${activeScenario === scenario.id
              ? 'bg-primary text-white shadow-md'
              : 'bg-white text-primary border border-primary hover:bg-primary/10'
            }
          `}
        >
          {scenario.name}
        </button>
      ))}
    </div>
  );

  const mape = 8.5; // Mock MAPE
  const wape = 6.2; // Mock WAPE
  const lift = 12.3; // Mock Lift

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 font-noto mb-2">需要予測詳細</h1>
        <p className="text-neutral-800 font-noto">SKU/店舗/期間粒度での予測可視化とシナリオ比較</p>
      </div>

      {/* Scenario Selection */}
      <ScenarioChips />

      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-elevation-2 border border-neutral-100">
          <h3 className="text-sm font-medium text-neutral-800 font-noto mb-1">MAPE</h3>
          <div className="text-2xl font-bold text-neutral-800 font-noto">{mape}%</div>
          <div className="text-sm text-secondary font-noto">+0.3pp</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-elevation-2 border border-neutral-100">
          <h3 className="text-sm font-medium text-neutral-800 font-noto mb-1">WAPE</h3>
          <div className="text-2xl font-bold text-neutral-800 font-noto">{wape}%</div>
          <div className="text-sm text-secondary font-noto">-0.1pp</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-elevation-2 border border-neutral-100">
          <h3 className="text-sm font-medium text-neutral-800 font-noto mb-1">Lift %</h3>
          <div className="text-2xl font-bold text-neutral-800 font-noto">{lift}%</div>
          <div className="text-sm text-secondary font-noto">+2.1pp</div>
        </div>
      </div>

      {/* 14-day Forecast Chart */}
      <div className="bg-white p-6 rounded-lg shadow-elevation-2 border border-neutral-100 mb-8">
        <h3 className="text-lg font-medium text-neutral-800 font-noto mb-4">
          14日先予測 - {scenarios.find((s: ScenarioData) => s.id === activeScenario)?.name}
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
            <XAxis 
              dataKey="day" 
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
            <Bar dataKey="baseline" fill="#2F80ED" name="ベースライン" />
            <Bar dataKey="promo" fill="#27AE60" name="プロモーション" />
            <Bar dataKey="weather" fill="#FFC107" name="天候影響" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Editable Forecast Grid */}
      <div className="bg-white rounded-lg shadow-elevation-2 border border-neutral-100">
        <div className="p-6 border-b border-neutral-100">
          <h3 className="text-lg font-medium text-neutral-800 font-noto">予測データグリッド（編集可能）</h3>
          <p className="text-sm text-neutral-800 font-noto mt-1">セルをクリックして数値を編集できます</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="sticky left-0 z-10 bg-neutral-50 px-4 py-3 text-left text-xs font-medium text-neutral-800 uppercase tracking-wider font-noto">
                  SKU
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-800 uppercase tracking-wider font-noto">
                  商品名
                </th>
                {Array.from({ length: 14 }, (_, i) => (
                  <th key={i} className="px-3 py-3 text-center text-xs font-medium text-neutral-800 uppercase tracking-wider font-noto">
                    {i + 1}日後
                  </th>
                ))}
                <th className="px-4 py-3 text-center text-xs font-medium text-neutral-800 uppercase tracking-wider font-noto">
                  合計
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-100">
              {forecastData.map((row, rowIndex) => (
                <tr key={row.sku} className="hover:bg-neutral-50">
                  <td className="sticky left-0 z-10 bg-white px-4 py-3 text-sm font-medium text-neutral-800 font-noto">
                    {row.sku}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-800 font-noto">
                    <div className="flex items-center justify-between">
                      <span>{row.skuName}</span>
                      <button
                        onClick={() => navigate(`/demand-forecast/product/${row.sku}`)}
                        className="ml-2 px-2 py-1 text-xs bg-primary text-white rounded hover:bg-primary/80 transition-colors"
                        title="詳細予測を見る"
                      >
                        詳細
                      </button>
                    </div>
                  </td>
                  {row.forecast.map((value, colIndex) => (
                    <td key={colIndex} className="px-3 py-3 text-center">
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleCellEdit(rowIndex, colIndex, parseInt(e.target.value) || 0)}
                        className="w-16 text-center text-sm border border-neutral-200 rounded px-2 py-1 font-noto focus:border-primary focus:outline-none"
                      />
                    </td>
                  ))}
                  <td className="px-4 py-3 text-center text-sm font-medium text-neutral-800 font-noto">
                    {row.forecast.reduce((sum, val) => sum + val, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DemandForecast; 