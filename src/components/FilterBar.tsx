import React from 'react';

/**
 * フィルターバーコンポーネント
 * 検索とフィルタリング機能を提供します
 */
const FilterBar: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <select className="h-9 border rounded px-2">
        <option>全物流センター</option>
        <option>東京センター</option>
        <option>大阪センター</option>
        <option>名古屋センター</option>
      </select>
      <input 
        className="h-9 border rounded px-2" 
        placeholder="倉庫コード検索"
        type="text"
      />
      <select className="h-9 border rounded px-2">
        <option>商品カテゴリ大</option>
        <option>食品</option>
        <option>衣料品</option>
        <option>家電</option>
        <option>日用品</option>
      </select>
      <input 
        className="h-9 border rounded px-2" 
        placeholder="商品コード検索"
        type="text"
      />
    </div>
  );
};

export default FilterBar; 