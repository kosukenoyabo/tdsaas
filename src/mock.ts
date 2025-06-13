// Mock data interfaces and sample data for the Retail AI Forecast & Order SaaS

export interface KpiData {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export interface ForecastData {
  date: string;
  predicted: number;
  actual: number;
}

export interface HeatmapData {
  sku: string;
  stores: { [key: string]: number };
}

export interface OrderRecommendation {
  id: string;
  sku: string;
  productName: string;
  category: string;
  onHand: number;
  forecast7d: number;
  suggestedQty: number;
  safetyStock: number;
  unitCost: number;
  supplier: string;
  leadTime: number;
  shelfLife: number; // 青果特有の賞味期限（日数）
  seasonality: 'high' | 'medium' | 'low'; // 季節性
}

export interface ScenarioData {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export interface AlertData {
  id: string;
  sku: string;
  productName: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  impact: string;
  recommendation: string;
}

// KPI Sample Data
export const kpiData: KpiData[] = [
  {
    title: '予測精度',
    value: '94.2%',
    change: '+2.1pp',
    changeType: 'positive',
    icon: 'accuracy'
  },
  {
    title: '欠品リスク',
    value: '12件',
    change: '-3件',
    changeType: 'positive',
    icon: 'stockout'
  },
  {
    title: '過剰在庫',
    value: '¥2.1M',
    change: '-¥0.3M',
    changeType: 'positive',
    icon: 'excess'
  },
  {
    title: '7日売上予測',
    value: '¥8.7M',
    change: '+¥0.5M',
    changeType: 'positive',
    icon: 'sales'
  }
];

// Forecast Chart Data
export const forecastChartData: ForecastData[] = [
  { date: '3/1', predicted: 850, actual: 820 },
  { date: '3/2', predicted: 920, actual: 950 },
  { date: '3/3', predicted: 780, actual: 760 },
  { date: '3/4', predicted: 1100, actual: 1080 },
  { date: '3/5', predicted: 1200, actual: 1250 },
  { date: '3/6', predicted: 980, actual: 970 },
  { date: '3/7', predicted: 890, actual: 910 },
  { date: '3/8', predicted: 1050, actual: 1020 },
  { date: '3/9', predicted: 1180, actual: 1200 },
  { date: '3/10', predicted: 950, actual: 930 },
  { date: '3/11', predicted: 870, actual: 890 },
  { date: '3/12', predicted: 1020, actual: 1000 },
  { date: '3/13', predicted: 1150, actual: 1180 },
  { date: '3/14', predicted: 990, actual: 980 },
];

// Heatmap Data
export const heatmapData: HeatmapData[] = [
  { sku: 'トマト', stores: { '新宿店': 0.1, '渋谷店': 0.3, '池袋店': 0.2, '品川店': 0.4, '上野店': 0.1 } },
  { sku: 'きゅうり', stores: { '新宿店': 0.2, '渋谷店': 0.1, '池袋店': 0.3, '品川店': 0.2, '上野店': 0.4 } },
  { sku: 'レタス', stores: { '新宿店': 0.4, '渋谷店': 0.2, '池袋店': 0.1, '品川店': 0.3, '上野店': 0.2 } },
  { sku: 'キャベツ', stores: { '新宿店': 0.1, '渋谷店': 0.4, '池袋店': 0.2, '品川店': 0.1, '上野店': 0.3 } },
  { sku: 'にんじん', stores: { '新宿店': 0.3, '渋谷店': 0.1, '池袋店': 0.4, '品川店': 0.2, '上野店': 0.1 } },
];

// Order Recommendation Data (青果商品)
export const orderRecommendations: OrderRecommendation[] = [
  {
    id: 'ORD-001',
    sku: 'VEG-001',
    productName: 'トマト（中玉）',
    category: '果菜類',
    onHand: 45,
    forecast7d: 180,
    suggestedQty: 150,
    safetyStock: 20,
    unitCost: 280,
    supplier: '関東青果',
    leadTime: 1,
    shelfLife: 7,
    seasonality: 'medium'
  },
  {
    id: 'ORD-002',
    sku: 'VEG-002',
    productName: 'きゅうり',
    category: '果菜類',
    onHand: 32,
    forecast7d: 120,
    suggestedQty: 100,
    safetyStock: 15,
    unitCost: 180,
    supplier: '関東青果',
    leadTime: 1,
    shelfLife: 5,
    seasonality: 'low'
  },
  {
    id: 'ORD-003',
    sku: 'VEG-003',
    productName: 'レタス',
    category: '葉菜類',
    onHand: 28,
    forecast7d: 95,
    suggestedQty: 80,
    safetyStock: 12,
    unitCost: 220,
    supplier: '長野野菜組合',
    leadTime: 2,
    shelfLife: 4,
    seasonality: 'medium'
  },
  {
    id: 'ORD-004',
    sku: 'VEG-004',
    productName: 'キャベツ',
    category: '葉菜類',
    onHand: 55,
    forecast7d: 140,
    suggestedQty: 100,
    safetyStock: 18,
    unitCost: 150,
    supplier: '群馬農協',
    leadTime: 1,
    shelfLife: 10,
    seasonality: 'low'
  },
  {
    id: 'ORD-005',
    sku: 'VEG-005',
    productName: 'にんじん',
    category: '根菜類',
    onHand: 78,
    forecast7d: 160,
    suggestedQty: 120,
    safetyStock: 25,
    unitCost: 120,
    supplier: '千葉農協',
    leadTime: 1,
    shelfLife: 14,
    seasonality: 'low'
  },
  {
    id: 'ORD-006',
    sku: 'VEG-006',
    productName: 'じゃがいも',
    category: '根菜類',
    onHand: 92,
    forecast7d: 200,
    suggestedQty: 150,
    safetyStock: 30,
    unitCost: 100,
    supplier: '北海道農協',
    leadTime: 3,
    shelfLife: 21,
    seasonality: 'low'
  },
  {
    id: 'ORD-007',
    sku: 'VEG-007',
    productName: 'たまねぎ',
    category: '根菜類',
    onHand: 110,
    forecast7d: 180,
    suggestedQty: 120,
    safetyStock: 35,
    unitCost: 90,
    supplier: '北海道農協',
    leadTime: 3,
    shelfLife: 30,
    seasonality: 'low'
  },
  {
    id: 'ORD-008',
    sku: 'VEG-008',
    productName: 'ほうれん草',
    category: '葉菜類',
    onHand: 25,
    forecast7d: 85,
    suggestedQty: 70,
    safetyStock: 10,
    unitCost: 250,
    supplier: '茨城野菜組合',
    leadTime: 1,
    shelfLife: 3,
    seasonality: 'medium'
  },
  {
    id: 'ORD-009',
    sku: 'VEG-009',
    productName: 'ピーマン',
    category: '果菜類',
    onHand: 38,
    forecast7d: 110,
    suggestedQty: 90,
    safetyStock: 15,
    unitCost: 200,
    supplier: '宮崎農協',
    leadTime: 2,
    shelfLife: 7,
    seasonality: 'medium'
  },
  {
    id: 'ORD-010',
    sku: 'VEG-010',
    productName: 'なす',
    category: '果菜類',
    onHand: 42,
    forecast7d: 95,
    suggestedQty: 70,
    safetyStock: 12,
    unitCost: 180,
    supplier: '高知農協',
    leadTime: 2,
    shelfLife: 6,
    seasonality: 'high'
  },
  {
    id: 'ORD-011',
    sku: 'FRUIT-001',
    productName: 'りんご（ふじ）',
    category: '果実類',
    onHand: 65,
    forecast7d: 150,
    suggestedQty: 120,
    safetyStock: 20,
    unitCost: 350,
    supplier: '青森りんご組合',
    leadTime: 2,
    shelfLife: 14,
    seasonality: 'high'
  },
  {
    id: 'ORD-012',
    sku: 'FRUIT-002',
    productName: 'バナナ',
    category: '果実類',
    onHand: 88,
    forecast7d: 220,
    suggestedQty: 180,
    safetyStock: 30,
    unitCost: 180,
    supplier: 'ドール',
    leadTime: 5,
    shelfLife: 7,
    seasonality: 'low'
  },
  {
    id: 'ORD-013',
    sku: 'FRUIT-003',
    productName: 'いちご',
    category: '果実類',
    onHand: 22,
    forecast7d: 80,
    suggestedQty: 60,
    safetyStock: 8,
    unitCost: 580,
    supplier: '栃木いちご組合',
    leadTime: 1,
    shelfLife: 3,
    seasonality: 'high'
  },
  {
    id: 'ORD-014',
    sku: 'FRUIT-004',
    productName: 'みかん',
    category: '果実類',
    onHand: 75,
    forecast7d: 130,
    suggestedQty: 100,
    safetyStock: 18,
    unitCost: 220,
    supplier: '愛媛柑橘組合',
    leadTime: 2,
    shelfLife: 10,
    seasonality: 'high'
  },
  {
    id: 'ORD-015',
    sku: 'VEG-011',
    productName: 'ブロッコリー',
    category: '花菜類',
    onHand: 35,
    forecast7d: 90,
    suggestedQty: 70,
    safetyStock: 12,
    unitCost: 280,
    supplier: '埼玉野菜組合',
    leadTime: 1,
    shelfLife: 5,
    seasonality: 'medium'
  }
];

// Scenario Data
export const scenarios: ScenarioData[] = [
  { id: 'baseline', name: 'ベースライン', description: '通常の需要予測', active: true },
  { id: 'promo', name: 'プロモーション', description: '特売・セール時の予測', active: false },
  { id: 'weather', name: '天候影響', description: '天候変動を考慮した予測', active: false },
  { id: 'event', name: 'イベント', description: '季節イベント時の予測', active: false }
];

// Alert Data
export const alerts: AlertData[] = [
  {
    id: 'ALT-001',
    sku: 'VEG-008',
    productName: 'ほうれん草',
    priority: 'high',
    reason: '急激な需要増加',
    impact: '欠品リスク 85%',
    recommendation: '緊急発注 +50個'
  },
  {
    id: 'ALT-002',
    sku: 'FRUIT-003',
    productName: 'いちご',
    priority: 'high',
    reason: '賞味期限切れ近',
    impact: '廃棄リスク ¥12,000',
    recommendation: '値引き販売推奨'
  },
  {
    id: 'ALT-003',
    sku: 'VEG-003',
    productName: 'レタス',
    priority: 'medium',
    reason: '予測精度低下',
    impact: 'MAPE 15% 悪化',
    recommendation: 'モデル再学習'
  },
  {
    id: 'ALT-004',
    sku: 'VEG-001',
    productName: 'トマト（中玉）',
    priority: 'medium',
    reason: '仕入れ価格上昇',
    impact: '利益率 -3%',
    recommendation: '販売価格見直し'
  }
]; 