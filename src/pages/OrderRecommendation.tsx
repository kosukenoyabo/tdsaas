import React, { useState, useMemo } from 'react';
import { orderRecommendations, OrderRecommendation } from '../mock';

/**
 * 発注推奨ページコンポーネント
 * 商品の発注推奨データを表示し、詳細検討機能を提供します
 */
const OrderRecommendationPage: React.FC = () => {
  const [serviceLevel, setServiceLevel] = useState<number>(95);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<OrderRecommendation | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'forecast' | 'risk' | 'cost'>('forecast');

  // フィルタリングとソート
  const filteredAndSortedData = useMemo(() => {
    let filtered = orderRecommendations.filter(item => {
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.sku.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // ソート
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'forecast':
          return b.forecast7d - a.forecast7d;
        case 'risk':
          const riskA = (a.onHand / a.forecast7d) * 100;
          const riskB = (b.onHand / b.forecast7d) * 100;
          return riskA - riskB; // リスクが高い順（在庫日数が少ない順）
        case 'cost':
          return (b.suggestedQty * b.unitCost) - (a.suggestedQty * a.unitCost);
        default:
          return 0;
      }
    });

    return filtered;
  }, [categoryFilter, searchTerm, sortBy]);

  const categories = ['all', '果菜類', '葉菜類', '根菜類', '果実類', '花菜類'];

  const handleSelectItem = (id: string): void => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = (): void => {
    if (selectedItems.size === filteredAndSortedData.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredAndSortedData.map(item => item.id)));
    }
  };

  const handleProductClick = (product: OrderRecommendation): void => {
    setSelectedProduct(product);
  };

  const getRiskLevel = (onHand: number, forecast: number): { level: string; color: string; days: number } => {
    const days = Math.round((onHand / forecast) * 7);
    if (days <= 1) return { level: '高リスク', color: 'text-red-600 bg-red-50', days };
    if (days <= 3) return { level: '中リスク', color: 'text-yellow-600 bg-yellow-50', days };
    return { level: '低リスク', color: 'text-green-600 bg-green-50', days };
  };

  const getSeasonalityBadge = (seasonality: string): string => {
    switch (seasonality) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* ページヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">発注推奨</h1>
          <p className="text-gray-600 mt-1">AI による自動発注推奨システム</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">サービスレベル:</span>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="90"
              max="99.9"
              step="0.1"
              value={serviceLevel}
              onChange={(e) => setServiceLevel(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-sm font-medium text-primary w-12">{serviceLevel}%</span>
          </div>
        </div>
      </div>

      {/* フィルターバー */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* カテゴリフィルター */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? '全カテゴリ' : category}
                </option>
              ))}
            </select>
          </div>

          {/* 検索 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">商品検索</label>
            <input
              type="text"
              placeholder="商品名またはSKU"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* ソート */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">並び順</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'forecast' | 'risk' | 'cost')}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="forecast">予測数量順</option>
              <option value="risk">リスク順</option>
              <option value="cost">発注金額順</option>
            </select>
          </div>

          {/* 結果表示 */}
          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              {filteredAndSortedData.length}件 / {orderRecommendations.length}件
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* メインテーブル */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* テーブルヘッダー */}
            <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  {selectedItems.size === filteredAndSortedData.length ? '全選択解除' : '全選択'}
                </button>
                <span className="text-sm text-gray-600">
                  {selectedItems.size}件選択中
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary/80">
                  一括承認
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300">
                  一括差戻
                </button>
              </div>
            </div>

            {/* テーブル本体 */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-4 py-3">選択</th>
                    <th className="px-4 py-3">商品</th>
                    <th className="px-4 py-3">在庫</th>
                    <th className="px-4 py-3">7日予測</th>
                    <th className="px-4 py-3">推奨発注</th>
                    <th className="px-4 py-3">リスク</th>
                    <th className="px-4 py-3">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAndSortedData.map((item) => {
                    const risk = getRiskLevel(item.onHand, item.forecast7d);
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <button
                              onClick={() => handleProductClick(item)}
                              className="text-left hover:text-primary"
                            >
                              <div className="font-medium text-gray-900">{item.productName}</div>
                              <div className="text-sm text-gray-500">{item.sku}</div>
                            </button>
                            <div className="flex space-x-1 mt-1">
                              <span className={`px-2 py-0.5 text-xs rounded-full ${getSeasonalityBadge(item.seasonality)}`}>
                                季節性{item.seasonality === 'high' ? '高' : item.seasonality === 'medium' ? '中' : '低'}
                              </span>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                                {item.shelfLife}日
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium">{item.onHand}</div>
                          <div className="text-xs text-gray-500">{risk.days}日分</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium">{item.forecast7d}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-primary">{item.suggestedQty}</div>
                          <div className="text-xs text-gray-500">¥{(item.suggestedQty * item.unitCost).toLocaleString()}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${risk.color}`}>
                            {risk.level}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-1">
                            <button className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200">
                              承認
                            </button>
                            <button className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200">
                              差戻
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 商品詳細パネル */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-6">
            {selectedProduct ? (
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedProduct.productName}</h3>
                  <p className="text-sm text-gray-600">{selectedProduct.sku} | {selectedProduct.category}</p>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500">現在在庫</div>
                      <div className="text-lg font-semibold">{selectedProduct.onHand}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">7日予測</div>
                      <div className="text-lg font-semibold">{selectedProduct.forecast7d}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500">推奨発注</div>
                      <div className="text-lg font-semibold text-primary">{selectedProduct.suggestedQty}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">発注金額</div>
                      <div className="text-lg font-semibold">¥{(selectedProduct.suggestedQty * selectedProduct.unitCost).toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">仕入先:</span>
                        <span className="font-medium">{selectedProduct.supplier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">リードタイム:</span>
                        <span className="font-medium">{selectedProduct.leadTime}日</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">賞味期限:</span>
                        <span className="font-medium">{selectedProduct.shelfLife}日</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">単価:</span>
                        <span className="font-medium">¥{selectedProduct.unitCost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">安全在庫:</span>
                        <span className="font-medium">{selectedProduct.safetyStock}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="text-xs text-gray-500 mb-2">在庫推移予測</div>
                    <div className="h-20 bg-gray-50 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-400">チャート表示エリア</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button className="flex-1 px-3 py-2 bg-primary text-white text-sm rounded hover:bg-primary/80">
                      承認
                    </button>
                    <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300">
                      編集
                    </button>
                  </div>

                  {/* AIと相談するウィジェット */}
                  <div className="border-t pt-3 mt-4">
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="font-medium">🤖 AIと相談する</span>
                    </button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      発注量や在庫戦略についてAIアシスタントに相談できます
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2h-4M9 11V9a2 2 0 114 0v2M9 11h6"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-500">商品を選択して詳細を表示</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderRecommendationPage; 