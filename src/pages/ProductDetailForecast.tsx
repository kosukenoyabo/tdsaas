import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 商品マスターデータ
const productMaster = {
  'VEG-001': { name: 'トマト（中玉）', emoji: '🍅', category: '野菜' },
  'VEG-002': { name: 'きゅうり', emoji: '🥒', category: '野菜' },
  'VEG-003': { name: 'レタス', emoji: '🥬', category: '野菜' },
  'VEG-004': { name: 'ニンジン', emoji: '🥕', category: '野菜' },
  'VEG-005': { name: '玉ねぎ', emoji: '🧅', category: '野菜' }
};

/**
 * 商品詳細予測ページコンポーネント
 * 特定商品（例：トマト）の詳細な予測設定とシミュレーションを行います
 */
const ProductDetailForecast: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  
  // 商品情報の取得
  const currentProduct = productId && productMaster[productId as keyof typeof productMaster] 
    ? productMaster[productId as keyof typeof productMaster]
    : productMaster['VEG-001']; // デフォルトはトマト

  // 設定状態
  const [settings, setSettings] = useState({
    product: currentProduct.name,
    productId: productId || 'VEG-001',
    price: 298,
    startDate: '2024-02-01',
    endDate: '2024-02-14',
    discountCondition: '賞味期限3日前',
    discountRate: 30,
    spaceType: '注力スペース',
    spaceSize: 2.5,
    crossSelling: true,
    crossSellingProduct: 'レタス'
  });

  // 商品変更時の設定更新
  useEffect(() => {
    if (productId && productMaster[productId as keyof typeof productMaster]) {
      const product = productMaster[productId as keyof typeof productMaster];
      setSettings(prev => ({
        ...prev,
        product: product.name,
        productId: productId
      }));
    }
  }, [productId]);

  // シミュレーション結果（モックデータ）
  const dailyForecast = [
    { date: '2/1', sales: 45, waste: 3, weather: '晴れ', temperature: 12 },
    { date: '2/2', sales: 52, waste: 2, weather: '曇り', temperature: 10 },
    { date: '2/3', sales: 38, waste: 5, weather: '雨', temperature: 8 },
    { date: '2/4', sales: 41, waste: 4, weather: '晴れ', temperature: 14 },
    { date: '2/5', sales: 48, waste: 3, weather: '晴れ', temperature: 16 },
    { date: '2/6', sales: 55, waste: 2, weather: '曇り', temperature: 13 },
    { date: '2/7', sales: 62, waste: 1, weather: '晴れ', temperature: 18 },
    { date: '2/8', sales: 58, waste: 2, weather: '晴れ', temperature: 19 },
    { date: '2/9', sales: 44, waste: 4, weather: '雨', temperature: 11 },
    { date: '2/10', sales: 49, waste: 3, weather: '曇り', temperature: 15 },
    { date: '2/11', sales: 53, waste: 2, weather: '晴れ', temperature: 17 },
    { date: '2/12', sales: 47, waste: 3, weather: '曇り', temperature: 14 },
    { date: '2/13', sales: 51, waste: 2, weather: '晴れ', temperature: 16 },
    { date: '2/14', sales: 46, waste: 4, weather: '雨', temperature: 9 }
  ];

  const kpiData = [
    { name: '粗利率', value: 42.5, target: 40, color: '#27AE60' },
    { name: '収益率', value: 18.3, target: 15, color: '#2F80ED' },
    { name: 'ロス率', value: 5.2, target: 8, color: '#FFC107' }
  ];

  const logicFactors = [
    { name: '過去売上トレンド', weight: 40, impact: '+15%' },
    { name: '他社売上傾向', weight: 25, impact: '+8%' },
    { name: '天気予報', weight: 20, impact: '-5%' },
    { name: '併売効果', weight: 15, impact: '+12%' }
  ];

  const totalSales = dailyForecast.reduce((sum, day) => sum + day.sales, 0);
  const totalWaste = dailyForecast.reduce((sum, day) => sum + day.waste, 0);
  const recommendedPurchasePrice = Math.round(settings.price * 0.6);

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">商品詳細予測</h1>
            <p className="text-gray-600 mt-1">特定商品の詳細な予測設定とシミュレーション</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={settings.productId}
              onChange={(e) => {
                const selectedProduct = productMaster[e.target.value as keyof typeof productMaster];
                setSettings({
                  ...settings, 
                  product: selectedProduct.name,
                  productId: e.target.value
                });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {Object.entries(productMaster).map(([id, product]) => (
                <option key={id} value={id}>
                  {product.emoji} {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 設定パネル */}
        <div className="lg:col-span-1 space-y-6">
          {/* 基本設定 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">基本設定</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">販売価格</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={settings.price}
                    onChange={(e) => setSettings({...settings, price: Number(e.target.value)})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <span className="text-gray-500">円</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">開始日</label>
                  <input
                    type="date"
                    value={settings.startDate}
                    onChange={(e) => setSettings({...settings, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">終了日</label>
                  <input
                    type="date"
                    value={settings.endDate}
                    onChange={(e) => setSettings({...settings, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 割引設定 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">割引設定</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">割引条件</label>
                <select
                  value={settings.discountCondition}
                  onChange={(e) => setSettings({...settings, discountCondition: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="賞味期限3日前">賞味期限3日前</option>
                  <option value="賞味期限2日前">賞味期限2日前</option>
                  <option value="賞味期限1日前">賞味期限1日前</option>
                  <option value="在庫過多時">在庫過多時</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">割引率</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={settings.discountRate}
                    onChange={(e) => setSettings({...settings, discountRate: Number(e.target.value)})}
                    className="flex-1"
                  />
                  <span className="text-gray-700 font-medium w-12">{settings.discountRate}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 棚割り設定 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">棚割り設定</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">スペースタイプ</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="注力スペース"
                      checked={settings.spaceType === '注力スペース'}
                      onChange={(e) => setSettings({...settings, spaceType: e.target.value})}
                      className="mr-2"
                    />
                    注力スペース
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="非注力"
                      checked={settings.spaceType === '非注力'}
                      onChange={(e) => setSettings({...settings, spaceType: e.target.value})}
                      className="mr-2"
                    />
                    非注力
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">スペースサイズ</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="0.1"
                    value={settings.spaceSize}
                    onChange={(e) => setSettings({...settings, spaceSize: Number(e.target.value)})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <span className="text-gray-500">m²</span>
                </div>
              </div>
            </div>
          </div>

          {/* 併売設定 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">併売設定</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.crossSelling}
                  onChange={(e) => setSettings({...settings, crossSelling: e.target.checked})}
                  className="mr-3"
                />
                <label className="text-sm font-medium text-gray-700">併売を行う</label>
              </div>
              {settings.crossSelling && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">併売商品</label>
                  <select
                    value={settings.crossSellingProduct}
                    onChange={(e) => setSettings({...settings, crossSellingProduct: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="レタス">🥬 レタス</option>
                    <option value="キュウリ">🥒 キュウリ</option>
                    <option value="ドレッシング">🥗 ドレッシング</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* シミュレーション結果 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 予測ロジック */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">予測ロジック（前提条件）</h2>
            <div className="grid grid-cols-2 gap-4">
              {logicFactors.map((factor, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{factor.name}</span>
                    <span className="text-sm text-primary font-semibold">{factor.impact}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${factor.weight}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">重み: {factor.weight}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* 日別予測 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">日別売上予測</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyForecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value}個`, 
                      name === 'sales' ? '売上' : '廃棄'
                    ]}
                    labelFormatter={(label) => `日付: ${label}`}
                  />
                  <Bar dataKey="sales" fill="#2F80ED" name="sales" />
                  <Bar dataKey="waste" fill="#FF6B6B" name="waste" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">{totalSales}</div>
                <div className="text-sm text-gray-600">総売上個数</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-red-600">{totalWaste}</div>
                <div className="text-sm text-gray-600">総廃棄個数</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">{((totalSales / (totalSales + totalWaste)) * 100).toFixed(1)}%</div>
                <div className="text-sm text-gray-600">販売効率</div>
              </div>
            </div>
          </div>

          {/* 仕入れ価格推奨とKPI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">仕入れ価格推奨</h2>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{recommendedPurchasePrice}円</div>
                <div className="text-sm text-gray-600 mb-4">以上での仕入れを推奨</div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-700">
                    <div className="flex justify-between mb-1">
                      <span>販売価格:</span>
                      <span>{settings.price}円</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>推奨仕入価格:</span>
                      <span>{recommendedPurchasePrice}円</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>粗利:</span>
                      <span>{settings.price - recommendedPurchasePrice}円</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">KPI予想</h2>
              <div className="space-y-4">
                {kpiData.map((kpi, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{kpi.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${(kpi.value / Math.max(kpi.value, kpi.target)) * 100}%`,
                            backgroundColor: kpi.color
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: kpi.color }}>
                        {kpi.value}%
                      </span>
                      <span className="text-xs text-gray-500">
                        (目標: {kpi.target}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailForecast; 