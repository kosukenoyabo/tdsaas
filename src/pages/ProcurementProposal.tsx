import React, { useState } from 'react';
import KpiCard from '../components/KpiCard';
import DataGrid from '../components/DataGrid';

interface ProposalItem {
  id: string;
  productName: string;
  category: string;
  brand: string;
  competitorSales: number;
  competitorPrice: number;
  suggestedPrice: number;
  region: string;
  seasonality: string;
  promotionStatus: string;
  potentialRevenue: number;
  riskLevel: 'low' | 'medium' | 'high';
  priority: number;
}

/**
 * 仕入れ提案ページコンポーネント
 * 他社で売れていて自社未導入の商品を検出・提案します
 */
const ProcurementProposal: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');

  // モックデータ - 実際のAPIから取得
  const proposalData: ProposalItem[] = [
    {
      id: '1',
      productName: '有機トマト（熊本産）',
      category: '青果',
      brand: 'ファーム田中',
      competitorSales: 1250,
      competitorPrice: 298,
      suggestedPrice: 280,
      region: '関東',
      seasonality: '通年',
      promotionStatus: '特売中',
      potentialRevenue: 89000,
      riskLevel: 'low',
      priority: 95
    },
    {
      id: '2',
      productName: '手作り唐揚げ弁当',
      category: '惣菜',
      brand: 'デリカ工房',
      competitorSales: 890,
      competitorPrice: 498,
      suggestedPrice: 480,
      region: '関西',
      seasonality: '通年',
      promotionStatus: '通常',
      potentialRevenue: 156000,
      riskLevel: 'medium',
      priority: 88
    },
    {
      id: '3',
      productName: '北海道牛乳プリン',
      category: '日配',
      brand: '北の味覚',
      competitorSales: 2100,
      competitorPrice: 158,
      suggestedPrice: 148,
      region: '全国',
      seasonality: '通年',
      promotionStatus: '新商品',
      potentialRevenue: 234000,
      riskLevel: 'low',
      priority: 92
    },
    {
      id: '4',
      productName: '季節野菜サラダ',
      category: '青果',
      brand: 'グリーンファーム',
      competitorSales: 670,
      competitorPrice: 380,
      suggestedPrice: 360,
      region: '関東',
      seasonality: '春夏',
      promotionStatus: '通常',
      potentialRevenue: 67000,
      riskLevel: 'high',
      priority: 75
    },
    {
      id: '5',
      productName: 'チーズハンバーグ',
      category: '惣菜',
      brand: 'ミートデリ',
      competitorSales: 1450,
      competitorPrice: 598,
      suggestedPrice: 580,
      region: '関西',
      seasonality: '通年',
      promotionStatus: '特売中',
      potentialRevenue: 198000,
      riskLevel: 'medium',
      priority: 85
    },
    {
      id: '6',
      productName: '国産きゅうり',
      category: '青果',
      brand: '九州農園',
      competitorSales: 980,
      competitorPrice: 180,
      suggestedPrice: 168,
      region: '九州',
      seasonality: '通年',
      promotionStatus: '通常',
      potentialRevenue: 78000,
      riskLevel: 'low',
      priority: 82
    },
    {
      id: '7',
      productName: '手作りコロッケ',
      category: '惣菜',
      brand: 'おふくろの味',
      competitorSales: 1200,
      competitorPrice: 298,
      suggestedPrice: 280,
      region: '関東',
      seasonality: '通年',
      promotionStatus: '新商品',
      potentialRevenue: 145000,
      riskLevel: 'medium',
      priority: 90
    },
    {
      id: '8',
      productName: '信州りんごジュース',
      category: '日配',
      brand: '信州果実',
      competitorSales: 1800,
      competitorPrice: 248,
      suggestedPrice: 230,
      region: '中部',
      seasonality: '通年',
      promotionStatus: '特売中',
      potentialRevenue: 189000,
      riskLevel: 'low',
      priority: 87
    },
    {
      id: '9',
      productName: '冷凍餃子（手作り風）',
      category: '冷凍',
      brand: '中華の鉄人',
      competitorSales: 2200,
      competitorPrice: 398,
      suggestedPrice: 380,
      region: '全国',
      seasonality: '通年',
      promotionStatus: '通常',
      potentialRevenue: 267000,
      riskLevel: 'low',
      priority: 94
    },
    {
      id: '10',
      productName: 'メロンパン（焼きたて風）',
      category: 'パン',
      brand: 'ベーカリー工房',
      competitorSales: 1500,
      competitorPrice: 128,
      suggestedPrice: 118,
      region: '関東',
      seasonality: '通年',
      promotionStatus: '新商品',
      potentialRevenue: 98000,
      riskLevel: 'medium',
      priority: 79
    },
    {
      id: '11',
      productName: '九州産レタス',
      category: '青果',
      brand: '九州野菜組合',
      competitorSales: 750,
      competitorPrice: 198,
      suggestedPrice: 188,
      region: '九州',
      seasonality: '春夏',
      promotionStatus: '通常',
      potentialRevenue: 56000,
      riskLevel: 'high',
      priority: 73
    },
    {
      id: '12',
      productName: '特製親子丼',
      category: '惣菜',
      brand: '和食の匠',
      competitorSales: 1100,
      competitorPrice: 548,
      suggestedPrice: 520,
      region: '関西',
      seasonality: '通年',
      promotionStatus: '特売中',
      potentialRevenue: 178000,
      riskLevel: 'medium',
      priority: 86
    },
    {
      id: '13',
      productName: '北海道チーズケーキ',
      category: '日配',
      brand: '北海道スイーツ',
      competitorSales: 1650,
      competitorPrice: 298,
      suggestedPrice: 280,
      region: '全国',
      seasonality: '通年',
      promotionStatus: '新商品',
      potentialRevenue: 201000,
      riskLevel: 'low',
      priority: 91
    },
    {
      id: '14',
      productName: '冷凍うどん（讃岐風）',
      category: '冷凍',
      brand: '讃岐製麺',
      competitorSales: 1900,
      competitorPrice: 198,
      suggestedPrice: 188,
      region: '全国',
      seasonality: '通年',
      promotionStatus: '通常',
      potentialRevenue: 156000,
      riskLevel: 'low',
      priority: 83
    },
    {
      id: '15',
      productName: 'クロワッサン（バター香る）',
      category: 'パン',
      brand: 'フランス工房',
      competitorSales: 1300,
      competitorPrice: 168,
      suggestedPrice: 158,
      region: '関東',
      seasonality: '通年',
      promotionStatus: '通常',
      potentialRevenue: 89000,
      riskLevel: 'medium',
      priority: 78
    },
    {
      id: '16',
      productName: '有機にんじん',
      category: '青果',
      brand: 'オーガニック農場',
      competitorSales: 850,
      competitorPrice: 248,
      suggestedPrice: 230,
      region: '関東',
      seasonality: '通年',
      promotionStatus: '新商品',
      potentialRevenue: 72000,
      riskLevel: 'medium',
      priority: 80
    },
    {
      id: '17',
      productName: '海老フライ弁当',
      category: '惣菜',
      brand: '海の幸デリ',
      competitorSales: 1350,
      competitorPrice: 648,
      suggestedPrice: 620,
      region: '関西',
      seasonality: '通年',
      promotionStatus: '特売中',
      potentialRevenue: 223000,
      riskLevel: 'medium',
      priority: 89
    },
    {
      id: '18',
      productName: '濃厚ヨーグルト',
      category: '日配',
      brand: '牧場直送',
      competitorSales: 2400,
      competitorPrice: 178,
      suggestedPrice: 168,
      region: '全国',
      seasonality: '通年',
      promotionStatus: '通常',
      potentialRevenue: 189000,
      riskLevel: 'low',
      priority: 84
    },
    {
      id: '19',
      productName: '冷凍チャーハン（五目）',
      category: '冷凍',
      brand: '中華の達人',
      competitorSales: 1750,
      competitorPrice: 298,
      suggestedPrice: 280,
      region: '全国',
      seasonality: '通年',
      promotionStatus: '新商品',
      potentialRevenue: 167000,
      riskLevel: 'low',
      priority: 88
    },
    {
      id: '20',
      productName: '食パン（もちもち食感）',
      category: 'パン',
      brand: 'もちもち工房',
      competitorSales: 2100,
      competitorPrice: 198,
      suggestedPrice: 188,
      region: '関東',
      seasonality: '通年',
      promotionStatus: '通常',
      potentialRevenue: 134000,
      riskLevel: 'low',
      priority: 81
    }
  ];

  const kpiData = [
    {
      title: '提案商品数',
      value: '247',
      change: '+32',
      changeType: 'positive' as const,
      icon: 'chart'
    },
    {
      title: '予想売上増',
      value: '¥4.8M',
      change: '+28%',
      changeType: 'positive' as const,
      icon: 'sales'
    },
    {
      title: '競合優位商品',
      value: '156',
      change: '+15',
      changeType: 'positive' as const,
      icon: 'chart'
    },
    {
      title: '新規カテゴリ',
      value: '23',
      change: '+8',
      changeType: 'positive' as const,
      icon: 'inventory'
    }
  ];

  const categories = ['all', '青果', '惣菜', '日配', '冷凍', 'パン'];
  const regions = ['all', '関東', '関西', '中部', '九州', '全国'];
  const riskLevels = ['all', 'low', 'medium', 'high'];

  const filteredData = proposalData.filter(item => {
    return (selectedCategory === 'all' || item.category === selectedCategory) &&
           (selectedRegion === 'all' || item.region === selectedRegion) &&
           (selectedRisk === 'all' || item.riskLevel === selectedRisk);
  });

  const columns = [
    {
      key: 'priority',
      title: '優先度',
      width: 80,
      render: (value: number) => (
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${
            value >= 90 ? 'bg-red-500' : value >= 80 ? 'bg-yellow-500' : 'bg-green-500'
          }`} />
          {value}
        </div>
      )
    },
    {
      key: 'productName',
      title: '商品名',
      width: 200,
      render: (value: string, item: ProposalItem) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{item.brand}</div>
        </div>
      )
    },
    {
      key: 'category',
      title: 'カテゴリ',
      width: 100
    },
    {
      key: 'competitorSales',
      title: '競合売上',
      width: 100,
      render: (value: number) => `${value.toLocaleString()}個/月`
    },
    {
      key: 'competitorPrice',
      title: '競合価格',
      width: 100,
      render: (value: number) => `¥${value}`
    },
    {
      key: 'suggestedPrice',
      title: '提案価格',
      width: 100,
      render: (value: number) => `¥${value}`
    },
    {
      key: 'region',
      title: '地域',
      width: 80
    },
    {
      key: 'promotionStatus',
      title: '販促状況',
      width: 100,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === '特売中' ? 'bg-red-100 text-red-800' :
          value === '新商品' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'potentialRevenue',
      title: '予想売上',
      width: 120,
      render: (value: number) => `¥${(value / 1000).toFixed(0)}K`
    },
    {
      key: 'riskLevel',
      title: 'リスク',
      width: 80,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'low' ? 'bg-green-100 text-green-800' :
          value === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value === 'low' ? '低' : value === 'medium' ? '中' : '高'}
        </span>
      )
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-noto">仕入れ提案</h1>
          <p className="text-gray-600 mt-1">他社で売れていて自社未導入の商品を検出・提案</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors">
            レポート出力
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            一括導入検討
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KpiCard key={index} data={kpi} />
        ))}
      </div>

      {/* フィルター */}
      <div className="bg-white rounded-lg shadow-elevation-2 p-6">
        <h3 className="text-lg font-semibold mb-4 font-noto">フィルター条件</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">カテゴリ</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'すべて' : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">地域</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === 'all' ? 'すべて' : region}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">リスクレベル</label>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {riskLevels.map(risk => (
                <option key={risk} value={risk}>
                  {risk === 'all' ? 'すべて' : 
                   risk === 'low' ? '低リスク' :
                   risk === 'medium' ? '中リスク' : '高リスク'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* データグリッド */}
      <div className="bg-white rounded-lg shadow-elevation-2">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold font-noto">
              仕入れ提案リスト ({filteredData.length}件)
            </h3>
            <div className="text-sm text-gray-500">
              優先度順で表示
            </div>
          </div>
        </div>
        <DataGrid
          data={filteredData}
          columns={columns}
          height={400}
          rowHeight={48}
        />
      </div>

      {/* 分析サマリー */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-elevation-2 p-6">
          <h3 className="text-lg font-semibold mb-4 font-noto">カテゴリ別分析</h3>
          <div className="space-y-3">
            {['青果', '惣菜', '日配', '冷凍', 'パン'].map(category => {
              const categoryItems = proposalData.filter(item => item.category === category);
              const totalRevenue = categoryItems.reduce((sum, item) => sum + item.potentialRevenue, 0);
              return (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-gray-700">{category}</span>
                  <div className="text-right">
                    <div className="font-semibold">¥{(totalRevenue / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-gray-500">{categoryItems.length}商品</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-elevation-2 p-6">
          <h3 className="text-lg font-semibold mb-4 font-noto">リスク分析</h3>
          <div className="space-y-3">
            {[
              { level: 'low', label: '低リスク', color: 'text-green-600' },
              { level: 'medium', label: '中リスク', color: 'text-yellow-600' },
              { level: 'high', label: '高リスク', color: 'text-red-600' }
            ].map(risk => {
              const riskItems = proposalData.filter(item => item.riskLevel === risk.level);
              const percentage = (riskItems.length / proposalData.length * 100).toFixed(1);
              return (
                <div key={risk.level} className="flex justify-between items-center">
                  <span className={risk.color}>{risk.label}</span>
                  <div className="text-right">
                    <div className="font-semibold">{riskItems.length}商品</div>
                    <div className="text-sm text-gray-500">{percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcurementProposal; 