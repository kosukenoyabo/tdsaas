import React from 'react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

/**
 * プレースホルダーページコンポーネント
 * 未実装ページ用の仮画面を表示します
 */
const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="bg-white rounded-lg shadow-elevation-2 p-8 max-w-md">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2 font-noto">{title}</h1>
        {description && (
          <p className="text-gray-600 mb-6">{description}</p>
        )}
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

export default PlaceholderPage; 